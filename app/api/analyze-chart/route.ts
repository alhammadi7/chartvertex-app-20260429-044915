import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are ChartVertex AI, an expert professional trading chart analyst with deep knowledge of technical analysis, Smart Money Concepts, price action, market structure, liquidity, and risk management.

Analyze the provided chart image and return ONLY a valid JSON object — no markdown, no explanation, no code fences. The JSON must match this exact structure:

{
  "provider": "anthropic",
  "bias": "Bullish | Bearish | Neutral",
  "confidence": <integer 0-100>,
  "probabilityLabel": "High | Medium | Low",
  "support": "<price level as string>",
  "resistance": "<price level as string>",
  "entry": "<entry zone as string>",
  "stopLoss": "<stop loss price as string>",
  "takeProfit": "<TP1 / TP2 / TP3 as string>",
  "riskReward": "<e.g. 1:2.5>",
  "marketStructure": "<brief description of market structure>",
  "liquidity": "<liquidity zones description>",
  "riskPlan": "<risk management plan>",
  "aiRecommendation": "<clear actionable recommendation>",
  "disclaimer": "Trading involves risk. This is not financial advice."
}

Rules:
- Be precise with price levels based on what you see on the chart
- marketStructure: describe HH/HL/LH/LL structure, trends, patterns visible
- liquidity: identify buy/sell side liquidity pools, equal highs/lows, sweep zones
- riskPlan: reference the account settings if provided, otherwise give general guidance
- aiRecommendation: be direct — Enter Long, Enter Short, Wait for confirmation, Avoid
- confidence: reflect actual chart quality and setup clarity
- probabilityLabel: High = confidence >= 70, Medium = 45-69, Low < 45
- Return ONLY the JSON. No other text.`;

function buildUserMessage(body: {
  symbol: string;
  timeframe: string;
  analysisMode: string;
  marketCategory: string;
}) {
  return `Analyze this trading chart.

Symbol: ${body.symbol || 'Unknown'}
Timeframe: ${body.timeframe || 'Unknown'}
Strategy / Analysis Mode: ${body.analysisMode || 'Smart Money Concepts'}
Market Category: ${body.marketCategory || 'Forex'}

Please provide your complete ChartVertex AI analysis as JSON.`;
}

async function callAnthropic(imageBase64: string, imageMime: string, userMsg: string): Promise<object> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: imageMime, data: imageBase64 },
            },
            { type: 'text', text: userMsg },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
  return { ...parsed, provider: 'anthropic' };
}

async function callOpenAI(imageBase64: string, imageMime: string, userMsg: string): Promise<object> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${imageMime};base64,${imageBase64}` },
            },
            { type: 'text', text: userMsg },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || '';
  const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
  return { ...parsed, provider: 'openai' };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, symbol, timeframe, analysisMode, marketCategory } = body;

    if (!image) {
      return NextResponse.json({ error: 'Please upload or capture a chart first.' }, { status: 400 });
    }

    // Strip data URL prefix if present
    const base64 = image.includes(',') ? image.split(',')[1] : image;
    const mimeMatch = image.match(/^data:([^;]+);base64,/);
    const mime = (mimeMatch?.[1] || 'image/jpeg') as string;

    const userMsg = buildUserMessage({ symbol, timeframe, analysisMode, marketCategory });

    // Try Anthropic first, fallback to OpenAI
    let result: object;
    try {
      result = await callAnthropic(base64, mime, userMsg);
    } catch (anthropicErr) {
      console.error('Anthropic failed, trying OpenAI:', anthropicErr);
      try {
        result = await callOpenAI(base64, mime, userMsg);
      } catch (openaiErr) {
        console.error('OpenAI also failed:', openaiErr);
        return NextResponse.json(
          { error: 'Analysis unavailable. Both AI providers failed. Please try again later.' },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error('analyze-chart route error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

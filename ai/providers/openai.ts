import {
  AnalysisInput,
  AnalysisOutput,
  SYSTEM_PROMPT,
  USER_PROMPT,
  trimStrings,
  validateOutput,
} from '../types';

declare const process: { env: Record<string, string | undefined> };

const OPENAI_API = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';
const TIMEOUT_MS = 14000;

export async function analyzeWithOpenAI(input: AnalysisInput): Promise<AnalysisOutput> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 512,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${input.imageBase64}`,
                  detail: 'low',
                },
              },
              {
                type: 'text',
                text: USER_PROMPT(
                  input.symbol,
                  input.timeframe,
                  input.analysisMode,
                  input.marketCategory,
                ),
              },
            ],
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `OpenAI ${response.status}: ${(error as any)?.error?.message ?? 'request failed'}`,
      );
    }

    const data = await response.json();
    const text: string = data?.choices?.[0]?.message?.content ?? '';
    const parsed = JSON.parse(text.trim());
    const valid = validateOutput(parsed);

    if (!valid) throw new Error('OpenAI: invalid JSON structure');

    return trimStrings({ ...valid, provider: 'openai' });
  } finally {
    clearTimeout(timer);
  }
}

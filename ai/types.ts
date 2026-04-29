export type AnalysisInput = {
  imageBase64: string;
  symbol: string;
  timeframe: string;
  analysisMode: string;
  marketCategory: string;
};

export type AnalysisOutput = {
  provider: 'anthropic' | 'openai';
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number;
  probabilityLabel: 'High' | 'Medium' | 'Low';
  support: string;
  resistance: string;
  entry: string;
  stopLoss: string;
  takeProfit: string;
  riskReward: string;
  marketStructure: string;
  liquidity: string;
  riskPlan: string;
  aiRecommendation: string;
};

export const SYSTEM_PROMPT = `You are a professional trading analyst. Analyze the chart image and return ONLY a JSON object, with no markdown, no explanation, and no extra text.

Required JSON format:
{
  "bias": "Bullish|Bearish|Neutral",
  "confidence": 0-100,
  "probabilityLabel": "High|Medium|Low",
  "support": "price level",
  "resistance": "price level",
  "entry": "price level",
  "stopLoss": "price level",
  "takeProfit": "price level",
  "riskReward": "1:X.X",
  "marketStructure": "one sentence max",
  "liquidity": "one sentence max",
  "riskPlan": "one sentence max",
  "aiRecommendation": "one sentence max"
}`;

export const USER_PROMPT = (
  symbol: string,
  timeframe: string,
  mode: string,
  category: string,
) =>
  `Analyze this ${category} chart. Symbol: ${symbol}. Timeframe: ${timeframe}. Mode: ${mode}. Return JSON only.`;

export function validateOutput(raw: unknown): AnalysisOutput | null {
  if (!raw || typeof raw !== 'object') return null;

  const output = raw as Record<string, unknown>;
  const required = [
    'bias',
    'confidence',
    'probabilityLabel',
    'support',
    'resistance',
    'entry',
    'stopLoss',
    'takeProfit',
    'riskReward',
    'marketStructure',
    'liquidity',
    'riskPlan',
    'aiRecommendation',
  ];

  for (const key of required) {
    if (!(key in output)) return null;
  }

  if (!['Bullish', 'Bearish', 'Neutral'].includes(output.bias as string)) return null;
  if (!['High', 'Medium', 'Low'].includes(output.probabilityLabel as string)) return null;

  const confidence = Number(output.confidence);
  if (Number.isNaN(confidence) || confidence < 0 || confidence > 100) return null;

  return { ...(output as unknown as AnalysisOutput), confidence };
}

export function trimStrings(output: AnalysisOutput): AnalysisOutput {
  const trim = (value: string, max = 120) =>
    value?.length > max ? `${value.slice(0, max)}...` : value;

  return {
    ...output,
    support: trim(output.support, 30),
    resistance: trim(output.resistance, 30),
    entry: trim(output.entry, 30),
    stopLoss: trim(output.stopLoss, 30),
    takeProfit: trim(output.takeProfit, 30),
    riskReward: trim(output.riskReward, 20),
    marketStructure: trim(output.marketStructure),
    liquidity: trim(output.liquidity),
    riskPlan: trim(output.riskPlan),
    aiRecommendation: trim(output.aiRecommendation),
  };
}

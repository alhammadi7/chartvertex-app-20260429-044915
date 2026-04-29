import { analyzeChart } from '../ai/analyzeChart';
import { AnalysisInput } from '../ai/types';

type JsonResponse = {
  status: (code: number) => JsonResponse;
  json: (body: unknown) => void;
};

export default async function handler(
  request: { method?: string; body?: Partial<AnalysisInput> },
  response: JsonResponse,
) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = request.body ?? {};
    const { imageBase64, symbol, timeframe, analysisMode, marketCategory } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      response.status(400).json({ error: 'imageBase64 is required' });
      return;
    }

    if (!symbol || !timeframe || !analysisMode || !marketCategory) {
      response
        .status(400)
        .json({ error: 'symbol, timeframe, analysisMode, marketCategory are required' });
      return;
    }

    const result = await analyzeChart({
      imageBase64,
      symbol,
      timeframe,
      analysisMode,
      marketCategory,
    });

    response.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    response.status(500).json({ error: message });
  }
}

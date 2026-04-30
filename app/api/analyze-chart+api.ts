import { analyzeChart } from '../../ai/analyzeChart';
import { AnalysisInput } from '../../ai/types';

export async function POST(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<AnalysisInput>;
    const { imageBase64, symbol, timeframe, analysisMode, marketCategory } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return Response.json({ error: 'imageBase64 is required' }, { status: 400 });
    }

    if (!symbol || !timeframe || !analysisMode || !marketCategory) {
      return Response.json(
        { error: 'symbol, timeframe, analysisMode, marketCategory are required' },
        { status: 400 },
      );
    }

    const result = await analyzeChart({
      imageBase64,
      symbol,
      timeframe,
      analysisMode,
      marketCategory,
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

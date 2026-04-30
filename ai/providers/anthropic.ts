import {
  AnalysisInput,
  AnalysisOutput,
  SYSTEM_PROMPT,
  USER_PROMPT,
  trimStrings,
  validateOutput,
} from '../types';

declare const process: { env: Record<string, string | undefined> };

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-3-haiku-20240307';
const TIMEOUT_MS = 14000;

export async function analyzeWithAnthropic(input: AnalysisInput): Promise<AnalysisOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: input.imageBase64,
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
        `Anthropic ${response.status}: ${(error as any)?.error?.message ?? 'request failed'}`,
      );
    }

    const data = await response.json();
    const text: string = data?.content?.[0]?.text ?? '';
    const parsed = JSON.parse(text.trim());
    const valid = validateOutput(parsed);

    if (!valid) throw new Error('Anthropic: invalid JSON structure');

    return trimStrings({ ...valid, provider: 'anthropic' });
  } finally {
    clearTimeout(timer);
  }
}

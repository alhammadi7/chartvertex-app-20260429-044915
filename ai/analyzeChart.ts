import { AnalysisInput, AnalysisOutput } from './types';
import { analyzeWithAnthropic } from './providers/anthropic';
import { analyzeWithOpenAI } from './providers/openai';

const RETRYABLE_ERRORS = [
  'insufficient_quota',
  'rate_limit',
  '429',
  'overloaded',
  'quota',
  'invalid json',
  'aborterror',
  'fetch failed',
  '400',
  '500',
  '529',
];

function isRetryableError(error: unknown): boolean {
  const message = String(error).toLowerCase();
  return RETRYABLE_ERRORS.some((token) => message.includes(token));
}

export async function analyzeChart(input: AnalysisInput): Promise<AnalysisOutput> {
  try {
    return await analyzeWithAnthropic(input);
  } catch (primaryError) {
    console.warn('[analyzeChart] Anthropic failed:', String(primaryError));

    if (!isRetryableError(primaryError)) {
      throw primaryError;
    }
  }

  try {
    return await analyzeWithOpenAI(input);
  } catch (fallbackError) {
    console.warn('[analyzeChart] OpenAI fallback failed:', String(fallbackError));
    throw new Error('Both AI providers failed. Please try again later.');
  }
}

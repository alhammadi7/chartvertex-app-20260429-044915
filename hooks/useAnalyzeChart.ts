import { useCallback, useState } from 'react';
import * as FileSystem from 'expo-file-system';

import { AnalysisOutput } from '@/ai/types';

type State = {
  loading: boolean;
  result: AnalysisOutput | null;
  error: string | null;
  provider: AnalysisOutput['provider'] | null;
};

type Input = {
  imageUri: string;
  symbol: string;
  timeframe: string;
  analysisMode: string;
  marketCategory: string;
};

const initialState: State = {
  loading: false,
  result: null,
  error: null,
  provider: null,
};

async function imageUriToBase64(imageUri: string): Promise<string> {
  if (imageUri.startsWith('data:image')) {
    return imageUri.split(',')[1] ?? '';
  }

  if (imageUri.startsWith('blob:')) {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Unable to read selected image'));
      reader.onloadend = () => {
        const result = typeof reader.result === 'string' ? reader.result : '';
        resolve(result.split(',')[1] ?? '');
      };
      reader.readAsDataURL(blob);
    });
  }

  return FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });
}

export function useAnalyzeChart() {
  const [state, setState] = useState<State>(initialState);

  const analyze = useCallback(async (input: Input) => {
    setState({ loading: true, result: null, error: null, provider: null });

    try {
      const imageBase64 = await imageUriToBase64(input.imageUri);

      if (!imageBase64) {
        throw new Error('Unable to read selected image');
      }

      const response = await fetch('/api/analyze-chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          symbol: input.symbol,
          timeframe: input.timeframe,
          analysisMode: input.analysisMode,
          marketCategory: input.marketCategory,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error ?? 'Analysis failed');
      }

      const result = data as AnalysisOutput;
      setState({
        loading: false,
        result,
        error: null,
        provider: result.provider ?? null,
      });
    } catch (error) {
      setState({
        loading: false,
        result: null,
        error: error instanceof Error ? error.message : 'Analysis failed',
        provider: null,
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return { ...state, analyze, reset };
}

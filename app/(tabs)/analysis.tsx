import React from 'react';
import { Dimensions, ScrollView, StatusBar, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Gradients } from '@/constants/theme';
import { AnalysisResult, Timeframe } from '@/constants/types';

import AIInsightCard from '@/components/AIInsightCard';
import AnalysisResultGrid from '@/components/AnalysisResultGrid';
import AnalysisTopBar from '@/components/AnalysisTopBar';
import ChartWithOverlay from '@/components/ChartWithOverlay';
import ConfidenceBadge from '@/components/ConfidenceBadge';
import DualCTARow from '@/components/DualCTARow';

const { height: SCREEN_H } = Dimensions.get('window');
const CHART_HEIGHT = SCREEN_H * 0.55;

const MOCK_ANALYSIS: AnalysisResult = {
  trend: 'bullish',
  confidence: 87,
  structure: 'BOS + OB',
  timeframe: '4H',
  pair: 'BTC/USDT',
  entry: 66200,
  sl: 65100,
  tp1: 67500,
  tp2: 68800,
  tp3: 69420,
  insight:
    'Price broke structure above previous high, retesting order block zone near 66,200. Expecting continuation to premium liquidity pools at 68,800-69,420. Volume profile confirms demand accumulation at entry zone. Smart money footprint detected with displacement + FVG alignment.',
  levels: [
    { label: 'TP3', price: 69420, type: 'tp' },
    { label: 'TP2', price: 68800, type: 'tp' },
    { label: 'TP1', price: 67500, type: 'tp' },
    { label: 'Entry', price: 66200, type: 'entry' },
    { label: 'SL', price: 65100, type: 'sl' },
  ],
};

export default function AnalysisScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    imageUri?: string;
    pair?: string;
    timeframe?: string;
    bias?: string;
  }>();

  const imageUri = params.imageUri ?? null;
  const analysis: AnalysisResult = {
    ...MOCK_ANALYSIS,
    pair: params.pair ?? MOCK_ANALYSIS.pair,
    timeframe: (params.timeframe as Timeframe | undefined) ?? MOCK_ANALYSIS.timeframe,
    trend: params.bias === 'short' ? 'bearish' : MOCK_ANALYSIS.trend,
  };

  const handleCalculateRisk = () => {
    router.push({
      pathname: '/(tabs)/risk',
      params: {
        entry: String(analysis.entry),
        sl: String(analysis.sl),
        tp1: String(analysis.tp1),
        tp2: String(analysis.tp2),
        tp3: String(analysis.tp3),
        pair: analysis.pair,
      },
    });
  };

  const handleSave = () => {
    router.push('/(tabs)/journal');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#06080F' }}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={Gradients.cosmos}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <AnalysisTopBar onBack={() => router.back()} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={{ height: CHART_HEIGHT, marginHorizontal: 16, marginTop: 8 }}>
            <ChartWithOverlay
              imageUri={imageUri}
              levels={analysis.levels}
              bias={analysis.trend}
              pair={analysis.pair}
              timeframe={analysis.timeframe}
            >
              <ConfidenceBadge value={analysis.confidence} />
            </ChartWithOverlay>
          </View>

          <View style={{ marginHorizontal: 16, marginTop: 16 }}>
            <AnalysisResultGrid
              trend={analysis.trend}
              confidence={analysis.confidence}
              structure={analysis.structure}
              timeframe={analysis.timeframe}
            />
          </View>

          <View style={{ marginHorizontal: 16, marginTop: 12 }}>
            <AIInsightCard text={analysis.insight} />
          </View>
        </ScrollView>

        <DualCTARow
          onCalculateRisk={handleCalculateRisk}
          onSave={handleSave}
        />
      </SafeAreaView>
    </View>
  );
}

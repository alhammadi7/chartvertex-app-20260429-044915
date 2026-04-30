import React from 'react';
import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';
import { Timeframe } from '@/constants/types';

type Props = {
  trend: 'bullish' | 'bearish';
  confidence: number;
  structure: string;
  timeframe: Timeframe;
};

export default function AnalysisResultGrid({
  trend,
  confidence,
  structure,
  timeframe,
}: Props) {
  const trendColor =
    trend === 'bullish' ? Colors.signals.bullish : Colors.signals.bearish;
  const confColor =
    confidence >= 80
      ? Colors.signals.bullish
      : confidence >= 60
        ? Colors.accent.primary
        : '#F59E0B';

  return (
    <View>
      <Text
        style={{
          color: Colors.text.muted,
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        Analysis Result
      </Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1, gap: 10 }}>
          <GridCard
            label="Trend"
            value={trend === 'bullish' ? '^ Bullish' : 'v Bearish'}
            valueColor={trendColor}
            accentBg={`${trendColor}12`}
          />
          <GridCard
            label="Structure"
            value={structure}
            valueColor={Colors.text.primary}
          />
        </View>
        <View style={{ flex: 1, gap: 10 }}>
          <GridCard
            label="Confidence"
            value={`${confidence}%`}
            valueColor={confColor}
            accentBg={`${confColor}12`}
          />
          <GridCard
            label="Timeframe"
            value={timeframe}
            valueColor={Colors.accent.primary}
          />
        </View>
      </View>
    </View>
  );
}

function GridCard({
  label,
  value,
  valueColor,
  accentBg,
}: {
  label: string;
  value: string;
  valueColor: string;
  accentBg?: string;
}) {
  return (
    <View
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.glass.border,
      }}
    >
      <BlurView intensity={20} tint="dark">
        <View
          style={{
            padding: 14,
            backgroundColor: accentBg ?? Colors.glass.surface,
          }}
        >
          <Text
            style={{
              color: Colors.text.muted,
              fontSize: 10,
              fontWeight: '600',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {label}
          </Text>
          <Text
            style={{
              color: valueColor,
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {value}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}

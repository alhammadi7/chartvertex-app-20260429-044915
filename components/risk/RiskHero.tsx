import React from 'react';
import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';

type Props = {
  lotSize: number;
  riskAmt: number;
  rrRatio: number;
  riskPct: number;
};

export default function RiskHero({ lotSize, riskAmt, rrRatio, riskPct }: Props) {
  return (
    <View
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.glass.border,
      }}
    >
      <BlurView intensity={25} tint="dark">
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 24,
            paddingHorizontal: 20,
            backgroundColor: Colors.glass.surface,
          }}
        >
          <Text
            style={{
              color: Colors.text.primary,
              fontSize: 48,
              fontWeight: '800',
              fontFamily: 'monospace',
            }}
          >
            {lotSize.toFixed(2)}
          </Text>
          <Text
            style={{
              color: Colors.text.muted,
              fontSize: 12,
              fontWeight: '600',
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginTop: 4,
            }}
          >
            LOT SIZE
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 20, gap: 24 }}>
            <StatPill
              label="Risk"
              value={`$${riskAmt.toFixed(2)}`}
              color={Colors.signals.bearish}
            />
            <Divider />
            <StatPill
              label="R:R (TP1)"
              value={`1:${rrRatio.toFixed(1)}`}
              color={Colors.signals.bullish}
            />
            <Divider />
            <StatPill
              label="Risk %"
              value={`${riskPct}%`}
              color={Colors.accent.primary}
            />
          </View>
        </View>
      </BlurView>
    </View>
  );
}

function Divider() {
  return <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.1)' }} />;
}

function StatPill({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          color: Colors.text.muted,
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color,
          fontSize: 16,
          fontWeight: '700',
          fontFamily: 'monospace',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';

type Props = {
  totalPnl: number;
  range: string;
  winRate: number;
  totalTrades: number;
  wins: number;
  avgRR: number;
};

export default function WeeklySummaryCard({
  totalPnl,
  range,
  winRate,
  totalTrades,
  wins,
  avgRR,
}: Props) {
  const isProfit = totalPnl >= 0;
  const pnlColor = isProfit ? Colors.signals.bullish : Colors.signals.bearish;

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
          {/* Hero P/L */}
          <Text
            style={{
              color: pnlColor,
              fontSize: 40,
              fontWeight: '800',
              fontFamily: 'monospace',
              letterSpacing: -1,
            }}
          >
            {isProfit ? '+' : ''}${Math.abs(totalPnl).toFixed(2)}
          </Text>
          <Text
            style={{
              color: Colors.text.muted,
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {range}
          </Text>

          {/* Stat trio */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 24,
              gap: 0,
              width: '100%',
            }}
          >
            <StatCell
              label="Win Rate"
              value={`${winRate.toFixed(0)}%`}
              color={winRate >= 50 ? Colors.signals.bullish : Colors.signals.bearish}
            />
            <Divider />
            <StatCell
              label="Trades"
              value={`${wins}/${totalTrades}`}
              color={Colors.text.primary}
            />
            <Divider />
            <StatCell
              label="Avg RR"
              value={`1:${avgRR.toFixed(1)}`}
              color={Colors.accent.primary}
            />
          </View>
        </View>
      </BlurView>
    </View>
  );
}

function StatCell({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
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
          color,
          fontSize: 20,
          fontWeight: '700',
          fontFamily: 'monospace',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return (
    <View
      style={{
        width: 1,
        height: '70%',
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
      }}
    />
  );
}

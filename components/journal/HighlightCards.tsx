import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';
import { TradeRecord } from '@/constants/mockTrades';

type Props = {
  best: TradeRecord | null;
  worst: TradeRecord | null;
};

export default function HighlightCards({ best, worst }: Props) {
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
        Highlights
      </Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <HighlightCard
          icon="🏆"
          title="Best"
          trade={best}
          accentColor={Colors.signals.bullish}
        />
        <HighlightCard
          icon="⚠️"
          title="Worst"
          trade={worst}
          accentColor={Colors.signals.bearish}
        />
      </View>
    </View>
  );
}

function HighlightCard({
  icon,
  title,
  trade,
  accentColor,
}: {
  icon: string;
  title: string;
  trade: TradeRecord | null;
  accentColor: string;
}) {
  if (!trade) return null;

  const isPositive = trade.pnl >= 0;

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: `${accentColor}33`,
      }}
    >
      <BlurView intensity={20} tint="dark">
        <View
          style={{
            padding: 14,
            backgroundColor: `${accentColor}08`,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Text style={{ fontSize: 14 }}>{icon}</Text>
            <Text
              style={{
                color: accentColor,
                fontSize: 11,
                fontWeight: '700',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Text>
          </View>

          <Text
            style={{
              color: Colors.text.primary,
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            {trade.pair}
          </Text>

          <Text
            style={{
              color: accentColor,
              fontSize: 18,
              fontWeight: '800',
              fontFamily: 'monospace',
              marginBottom: 4,
            }}
          >
            {isPositive ? '+' : ''}${Math.abs(trade.pnl).toFixed(2)}
          </Text>

          <Text
            style={{
              color: Colors.text.muted,
              fontSize: 11,
            }}
          >
            RR 1:{trade.rr.toFixed(1)}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}

import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';
import { TradeRecord } from '@/constants/mockTrades';

type Props = {
  trades: TradeRecord[];
};

export default function TradeList({ trades }: Props) {
  const sorted = [...trades].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
        Recent Trades
      </Text>

      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.glass.border,
        }}
      >
        <BlurView intensity={20} tint="dark">
          <View style={{ backgroundColor: Colors.glass.surface }}>
            {sorted.map((trade, index) => (
              <TradeRow
                key={trade.id}
                trade={trade}
                isLast={index === sorted.length - 1}
              />
            ))}
          </View>
        </BlurView>
      </View>
    </View>
  );
}

function TradeRow({ trade, isLast }: { trade: TradeRecord; isLast: boolean }) {
  const isWin = trade.pnl > 0;
  const dotColor = isWin ? Colors.signals.bullish : Colors.signals.bearish;
  const pnlColor = isWin ? Colors.signals.bullish : Colors.signals.bearish;
  const outcomeLabel =
    trade.outcome === 'sl' ? 'SL' : trade.outcome.toUpperCase();

  const dateStr = new Date(trade.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: dotColor,
          marginRight: 12,
        }}
      />

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              color: Colors.text.primary,
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            {trade.pair}
          </Text>
          <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <Text
              style={{
                color: Colors.text.muted,
                fontSize: 10,
                fontWeight: '600',
              }}
            >
              {trade.timeframe}
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: Colors.text.muted,
            fontSize: 11,
            marginTop: 3,
          }}
        >
          Entry {trade.entry.toLocaleString()} - {outcomeLabel} - {dateStr}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={{
            color: pnlColor,
            fontSize: 15,
            fontWeight: '700',
            fontFamily: 'monospace',
          }}
        >
          {isWin ? '+' : ''}${trade.pnl.toFixed(0)}
        </Text>
        <Text
          style={{
            color: Colors.text.dim,
            fontSize: 10,
            marginTop: 2,
          }}
        >
          1:{trade.rr.toFixed(1)}
        </Text>
      </View>
    </Pressable>
  );
}

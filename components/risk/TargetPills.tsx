import React from 'react';
import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';

type Props = {
  tp1: number;
  tp2: number;
  tp3: number;
};

const TP_OPACITY = [1, 0.7, 0.5];

export default function TargetPills({ tp1, tp2, tp3 }: Props) {
  const targets = [
    { label: 'TP1', value: tp1 },
    { label: 'TP2', value: tp2 },
    { label: 'TP3', value: tp3 },
  ];

  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {targets.map((target, index) => (
        <View
          key={target.label}
          style={{
            flex: 1,
            borderRadius: 14,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: `${Colors.signals.bullish}${
              index === 0 ? '44' : index === 1 ? '30' : '20'
            }`,
          }}
        >
          <BlurView intensity={15} tint="dark">
            <View
              style={{
                padding: 12,
                alignItems: 'center',
                backgroundColor: `${Colors.signals.bullish}08`,
              }}
            >
              <Text
                style={{
                  color: Colors.signals.bullish,
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: 1,
                  opacity: TP_OPACITY[index],
                  marginBottom: 4,
                }}
              >
                {target.label}
              </Text>
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: 'monospace',
                  opacity: TP_OPACITY[index],
                }}
              >
                {target.value.toLocaleString()}
              </Text>
            </View>
          </BlurView>
        </View>
      ))}
    </View>
  );
}

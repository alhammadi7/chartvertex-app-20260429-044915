import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const PRESETS = [1, 2, 3, 5, 10];

export default function RiskSlider({ value, onChange }: Props) {
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
            paddingHorizontal: 16,
            paddingVertical: 14,
            backgroundColor: Colors.glass.surface,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: Colors.text.muted,
                fontSize: 11,
                fontWeight: '600',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Risk Level
            </Text>
            <Text
              style={{
                color: Colors.accent.primary,
                fontSize: 14,
                fontWeight: '700',
                fontFamily: 'monospace',
              }}
            >
              {value}%
            </Text>
          </View>

          <View
            style={{
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.06)',
              marginBottom: 14,
            }}
          >
            <View
              style={{
                height: 4,
                borderRadius: 2,
                width: `${Math.min(value * 10, 100)}%`,
                backgroundColor:
                  value <= 2
                    ? Colors.signals.bullish
                    : value <= 5
                      ? Colors.accent.primary
                      : Colors.signals.bearish,
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            {PRESETS.map((preset) => {
              const active = value === preset;
              return (
                <Pressable
                  key={preset}
                  onPress={() => onChange(preset)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingVertical: 8,
                    borderRadius: 10,
                    backgroundColor: active
                      ? `${Colors.accent.primary}22`
                      : 'rgba(255,255,255,0.04)',
                    borderWidth: 1,
                    borderColor: active
                      ? `${Colors.accent.primary}66`
                      : 'rgba(255,255,255,0.08)',
                  }}
                >
                  <Text
                    style={{
                      color: active ? Colors.accent.primary : Colors.text.muted,
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    {preset}%
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </BlurView>
    </View>
  );
}

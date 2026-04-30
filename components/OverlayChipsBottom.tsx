import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';
import { Bias } from '@/constants/types';

type Props = {
  bias: Bias;
  onChange: (b: Bias) => void;
};

const OPTIONS: {
  key: Exclude<Bias, null>;
  label: string;
  color: string;
}[] = [
  { key: 'long', label: 'Long', color: Colors.signals.bullish },
  { key: 'short', label: 'Short', color: Colors.signals.bearish },
  { key: 'neutral', label: 'Neutral', color: Colors.signals.neutral },
];

export default function OverlayChipsBottom({ bias, onChange }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        right: 12,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          borderRadius: 999,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.glass.borderStrong,
        }}
      >
        <BlurView intensity={30} tint="dark">
          <View
            style={{
              flexDirection: 'row',
              padding: 4,
              backgroundColor: Colors.glass.surface,
            }}
          >
            {OPTIONS.map((opt) => {
              const active = bias === opt.key;
              return (
                <Pressable
                  key={opt.key}
                  onPress={() => onChange(active ? null : opt.key)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 999,
                    backgroundColor: active ? `${opt.color}26` : 'transparent',
                    borderWidth: active ? 1 : 0,
                    borderColor: active ? `${opt.color}66` : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: active ? opt.color : Colors.text.muted,
                    }}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </BlurView>
      </View>
    </View>
  );
}

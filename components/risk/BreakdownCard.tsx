import React from 'react';
import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';

type Row = {
  label: string;
  value: string;
  color?: string;
};

type Props = {
  rows: Row[];
};

export default function BreakdownCard({ rows }: Props) {
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
        <View style={{ backgroundColor: Colors.glass.surface }}>
          {rows.map((row, index) => (
            <View
              key={row.label}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderBottomWidth: index < rows.length - 1 ? 1 : 0,
                borderBottomColor: 'rgba(255,255,255,0.06)',
              }}
            >
              <Text
                style={{
                  color: Colors.text.muted,
                  fontSize: 13,
                  fontWeight: '500',
                }}
              >
                {row.label}
              </Text>
              <Text
                style={{
                  color: row.color ?? Colors.text.primary,
                  fontSize: 14,
                  fontWeight: '700',
                  fontFamily: 'monospace',
                }}
              >
                {row.value}
              </Text>
            </View>
          ))}
        </View>
      </BlurView>
    </View>
  );
}

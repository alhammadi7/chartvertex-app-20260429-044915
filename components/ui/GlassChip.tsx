import React from 'react';
import { View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
};

export default function GlassChip({
  children,
  style,
  intensity = 30,
}: Props) {
  return (
    <View
      style={[
        {
          borderRadius: 999,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.glass.border,
        },
        style,
      ]}
    >
      <BlurView intensity={intensity} tint="dark">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: Colors.glass.surface,
          }}
        >
          {children}
        </View>
      </BlurView>
    </View>
  );
}

import React from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors, Gradients } from '@/constants/theme';

type Props = {
  uri: string;
  children?: React.ReactNode;
};

export default function ChartCanvas({ uri, children }: Props) {
  return (
    <View className="flex-1 mb-32 mt-2">
      {/* Gradient border wrapper (1px gradient via padding trick) */}
      <LinearGradient
        colors={Gradients.border}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          flex: 1,
          borderRadius: 24,
          padding: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 23,
            overflow: 'hidden',
            backgroundColor: Colors.bg.base,
          }}
        >
          <Image
            source={{ uri }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}

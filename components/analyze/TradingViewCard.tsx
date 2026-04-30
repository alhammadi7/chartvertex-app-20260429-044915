import React from 'react';
import { Image, View } from 'react-native';
import { BlurView } from 'expo-blur';

type Props = {
  symbol: string;
  timeframe: string;
  imageUri: string | null;
};

const chartReference = require('../../assets/images/chart-reference.png');

export default function TradingViewCard({ imageUri }: Props) {
  return (
    <View className="rounded-3xl overflow-hidden border border-white/[0.14]">
      <BlurView intensity={20} tint="dark">
        <View className="bg-white/[0.04] p-4">
          <View
            className="rounded-2xl overflow-hidden bg-[#080C14] border border-white/[0.06]"
            style={{ aspectRatio: 2048 / 1047 }}
          >
            <Image
              source={imageUri ? { uri: imageUri } : chartReference}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        </View>
      </BlurView>
    </View>
  );
}

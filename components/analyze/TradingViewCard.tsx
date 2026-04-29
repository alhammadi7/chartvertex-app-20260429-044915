import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Svg, Path, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';

type Props = {
  symbol: string;
  timeframe: string;
  imageUri: string | null;
};

// Deterministic mock candle path for visual effect
const MOCK_PATH = 'M10 80 L30 60 L50 70 L70 40 L90 55 L110 30 L130 45 L150 25 L170 35 L190 20 L210 30 L230 15 L250 25 L270 10 L290 20';
const MOCK_AREA = `${MOCK_PATH} L290 100 L10 100 Z`;

export default function TradingViewCard({ imageUri }: Props) {
  return (
    <View className="rounded-3xl overflow-hidden border border-white/[0.14]">
      <BlurView intensity={20} tint="dark">
        <View className="bg-white/[0.04] p-4">
          <View className="rounded-2xl overflow-hidden bg-[#080C14] border border-white/[0.06]" style={{ height: 160 }}>
            {imageUri ? (
              // Will show actual image when uploaded
              <View className="flex-1 items-center justify-center">
                <Text className="text-[#4F8EF7] text-xs font-semibold">Chart Loaded</Text>
              </View>
            ) : (
              // Mock chart
              <View className="flex-1">
                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((p) => (
                  <View
                    key={p}
                    className="absolute left-0 right-0 border-t border-white/[0.04]"
                    style={{ top: `${p * 100}%` }}
                  />
                ))}

                {/* Mock SVG line chart */}
                <Svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <Defs>
                    <SvgGrad id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <Stop offset="0" stopColor="#4F8EF7" stopOpacity="0.25" />
                      <Stop offset="1" stopColor="#4F8EF7" stopOpacity="0.02" />
                    </SvgGrad>
                  </Defs>
                  <Path d={MOCK_AREA} fill="url(#chartFill)" />
                  <Path d={MOCK_PATH} fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>

                {/* Price badge */}
                <View className="absolute right-3 top-2">
                  <Text className="text-[#34D399] text-xs font-bold font-mono">+1.24%</Text>
                </View>

                {/* Watermark */}
                <View className="absolute bottom-2 left-3">
                  <Text className="text-white/10 text-[10px] font-semibold tracking-widest uppercase">ChartVertex</Text>
                </View>
              </View>
            )}
          </View>

        </View>
      </BlurView>
    </View>
  );
}

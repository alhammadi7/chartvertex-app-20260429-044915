import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Path, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';

type Props = {
  symbol: string;
  timeframe: string;
  imageUri: string | null;
};

// Deterministic mock candle path for visual effect
const MOCK_PATH = 'M10 80 L30 60 L50 70 L70 40 L90 55 L110 30 L130 45 L150 25 L170 35 L190 20 L210 30 L230 15 L250 25 L270 10 L290 20';
const MOCK_AREA = `${MOCK_PATH} L290 100 L10 100 Z`;

export default function TradingViewCard({ symbol, timeframe, imageUri }: Props) {
  return (
    <View className="rounded-3xl overflow-hidden border border-white/[0.14]">
      <BlurView intensity={20} tint="dark">
        <View className="bg-white/[0.04]">

          {/* Header row */}
          <View className="flex-row items-center justify-between px-4 pt-4 pb-3">
            <View className="flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-[#4F8EF7]" style={{ shadowColor: '#4F8EF7', shadowOpacity: 0.8, shadowRadius: 4, shadowOffset: { width: 0, height: 0 } }} />
              <Text className="text-[#F0F4FF] text-base font-bold tracking-wide">{symbol}</Text>
              <View className="px-2 py-0.5 rounded bg-white/[0.08] border border-white/10">
                <Text className="text-[#4F8EF7] text-xs font-semibold">{timeframe}</Text>
              </View>
            </View>

            {/* Open in TradingView */}
            <Pressable className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4F8EF7]/20 border border-[#4F8EF7]/40 active:opacity-70">
              <Ionicons name="trending-up" size={12} color="#4F8EF7" />
              <Text className="text-[#4F8EF7] text-xs font-semibold">TradingView</Text>
            </Pressable>
          </View>

          {/* Chart area */}
          <View className="mx-4 mb-4 rounded-2xl overflow-hidden bg-[#080C14] border border-white/[0.06]" style={{ height: 160 }}>
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

          {/* Stats row */}
          <View className="flex-row px-4 pb-4 gap-4">
            {[
              { label: 'O', value: '66,180', color: '#F0F4FF' },
              { label: 'H', value: '66,820', color: '#34D399' },
              { label: 'L', value: '65,940', color: '#F87171' },
              { label: 'C', value: '66,420', color: '#4F8EF7' },
            ].map((s) => (
              <View key={s.label} className="flex-row items-center gap-1">
                <Text className="text-[#8B95A8] text-[10px] font-semibold">{s.label}</Text>
                <Text className="font-mono text-[10px] font-semibold" style={{ color: s.color }}>{s.value}</Text>
              </View>
            ))}
          </View>

        </View>
      </BlurView>
    </View>
  );
}

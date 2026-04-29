import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Svg, Line, Rect } from 'react-native-svg';

type Props = {
  symbol: string;
  timeframe: string;
  imageUri: string | null;
};

const CANDLES = [
  { x: 18, open: 76, high: 66, low: 84, close: 70 },
  { x: 38, open: 69, high: 55, low: 74, close: 58 },
  { x: 58, open: 57, high: 48, low: 66, close: 62 },
  { x: 78, open: 61, high: 41, low: 65, close: 46 },
  { x: 98, open: 45, high: 34, low: 53, close: 38 },
  { x: 118, open: 39, high: 31, low: 49, close: 47 },
  { x: 138, open: 48, high: 36, low: 55, close: 40 },
  { x: 158, open: 41, high: 29, low: 47, close: 33 },
  { x: 178, open: 34, high: 24, low: 42, close: 28 },
  { x: 198, open: 27, high: 22, low: 36, close: 32 },
  { x: 218, open: 33, high: 25, low: 39, close: 29 },
  { x: 238, open: 28, high: 18, low: 35, close: 21 },
  { x: 258, open: 22, high: 15, low: 31, close: 26 },
  { x: 278, open: 25, high: 17, low: 32, close: 20 },
];

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

                {/* Mock candlestick chart */}
                <Svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {CANDLES.map((candle) => {
                    const bullish = candle.close < candle.open;
                    const color = bullish ? '#34D399' : '#F87171';
                    const top = Math.min(candle.open, candle.close);
                    const height = Math.max(Math.abs(candle.close - candle.open), 3);

                    return (
                      <React.Fragment key={candle.x}>
                        <Line
                          x1={candle.x}
                          y1={candle.high}
                          x2={candle.x}
                          y2={candle.low}
                          stroke={color}
                          strokeWidth={1.4}
                          strokeLinecap="round"
                        />
                        <Rect
                          x={candle.x - 4}
                          y={top}
                          width={8}
                          height={height}
                          rx={1.2}
                          fill={bullish ? color : 'transparent'}
                          stroke={color}
                          strokeWidth={1.2}
                        />
                      </React.Fragment>
                    );
                  })}
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

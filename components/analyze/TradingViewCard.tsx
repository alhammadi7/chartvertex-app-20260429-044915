import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Rect, Line } from 'react-native-svg';

type Props = {
  symbol: string;
  timeframe: string;
  imageUri: string | null;
};

const CANDLES = [
  [72, 55, 50, 80], [55, 60, 48, 65], [60, 45, 42, 68],
  [45, 52, 40, 58], [52, 35, 30, 55], [35, 42, 28, 45],
  [42, 30, 25, 48], [30, 38, 22, 42], [38, 25, 20, 40],
  [25, 32, 18, 35], [32, 20, 15, 38], [20, 28, 12, 30],
  [28, 18, 10, 32], [18, 25, 8, 28], [25, 15, 6, 30],
  [15, 22, 5, 22], [22, 12, 4, 25], [12, 18, 3, 20],
  [18, 10, 2, 22], [10, 16, 1, 18],
];

const CHART_W = 300;
const CHART_H = 100;
const PAD_X = 6;
const PAD_Y = 8;
const usableW = CHART_W - PAD_X * 2;
const usableH = CHART_H - PAD_Y * 2;
const candleW = (usableW / CANDLES.length) * 0.55;
const step = usableW / CANDLES.length;

export default function TradingViewCard({ imageUri }: Props) {
  return (
    <View className="rounded-3xl overflow-hidden border border-white/[0.14]">
      <BlurView intensity={20} tint="dark">
        <View className="bg-white/[0.04] p-4">
          <View className="rounded-2xl overflow-hidden bg-[#080C14] border border-white/[0.06]" style={{ height: 160 }}>
            {imageUri ? (
              // Will show actual image when uploaded
              <View className="flex-1 items-center justify-center">
                <Ionicons name="checkmark-circle" size={20} color="#34D399" />
                <Text className="text-[#34D399] text-xs font-semibold mt-1">Chart Ready</Text>
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
                <Svg width="100%" height="100%" viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none">
                  {CANDLES.map(([open, close, high, low], index) => {
                    const isBull = close <= open;
                    const color = isBull ? '#34D399' : '#F87171';
                    const cx = PAD_X + index * step + step / 2;
                    const bodyTop = PAD_Y + (Math.min(open, close) / 100) * usableH;
                    const bodyBottom = PAD_Y + (Math.max(open, close) / 100) * usableH;
                    const bodyH = Math.max(bodyBottom - bodyTop, 1);
                    const wickTop = PAD_Y + (high / 100) * usableH;
                    const wickBottom = PAD_Y + (low / 100) * usableH;

                    return (
                      <React.Fragment key={index}>
                        <Line
                          x1={cx}
                          y1={wickTop}
                          x2={cx}
                          y2={wickBottom}
                          stroke={color}
                          strokeWidth={0.8}
                          opacity={0.7}
                        />
                        <Rect
                          x={cx - candleW / 2}
                          y={bodyTop}
                          width={candleW}
                          height={bodyH}
                          fill={isBull ? color : 'transparent'}
                          stroke={color}
                          strokeWidth={0.8}
                          opacity={0.9}
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

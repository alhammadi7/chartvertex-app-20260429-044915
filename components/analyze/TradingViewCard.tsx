import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Rect, Line, Path, Text as SvgText } from 'react-native-svg';

type Props = {
  symbol: string;
  timeframe: string;
  imageUri: string | null;
};

const CANDLES = [
  [22, 38, 18, 45], [38, 56, 34, 62], [56, 49, 43, 60], [49, 66, 44, 70],
  [66, 78, 60, 85], [78, 69, 64, 82], [69, 73, 62, 79], [73, 64, 58, 76],
  [64, 86, 58, 93], [86, 91, 76, 95], [91, 84, 80, 96], [84, 88, 79, 94],
  [88, 80, 74, 92], [80, 70, 65, 84], [70, 74, 64, 81], [74, 67, 61, 78],
  [67, 58, 54, 73], [58, 61, 52, 66], [61, 54, 48, 65], [54, 47, 42, 59],
  [47, 39, 35, 51], [39, 45, 33, 48], [45, 34, 29, 50], [34, 28, 24, 39],
  [28, 35, 23, 41], [35, 31, 26, 40], [31, 25, 19, 35], [25, 21, 16, 30],
  [21, 28, 17, 32], [28, 24, 20, 33], [24, 18, 13, 28], [18, 14, 10, 22],
  [14, 19, 9, 24], [19, 16, 12, 25], [16, 23, 11, 27], [23, 31, 18, 35],
  [31, 36, 25, 42], [36, 29, 24, 39], [29, 34, 25, 40], [34, 42, 29, 47],
  [42, 39, 34, 49], [39, 46, 35, 52], [46, 51, 40, 56], [51, 44, 39, 55],
  [44, 48, 39, 54], [48, 57, 43, 61], [57, 63, 50, 68], [63, 59, 52, 69],
  [59, 66, 54, 72], [66, 72, 61, 77], [72, 69, 64, 76], [69, 63, 58, 73],
  [63, 58, 54, 69], [58, 52, 48, 62], [52, 47, 43, 56], [47, 42, 39, 51],
  [42, 45, 37, 50], [45, 39, 35, 49], [39, 36, 31, 43], [36, 41, 33, 46],
  [41, 48, 36, 51], [48, 44, 39, 53], [44, 40, 36, 48], [40, 34, 30, 45],
  [34, 38, 30, 43], [38, 33, 29, 42], [33, 29, 25, 37], [29, 35, 26, 39],
];

const MA_POINTS = [
  49, 48, 47, 47, 48, 49, 51, 53, 55, 57, 59, 60, 60, 59, 58, 57, 56,
  55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 44, 43, 42, 41, 40,
  39, 38, 38, 38, 39, 40, 41, 42, 43, 44, 44, 44, 43, 42, 41, 40, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 48, 49, 50, 50, 49, 49, 48, 48, 47,
];

const PRICE_LABELS = [
  { y: 18, label: '158.000' },
  { y: 38, label: '154.000' },
  { y: 58, label: '150.000' },
  { y: 78, label: '146.000' },
];

const CHART_W = 420;
const CHART_H = 190;
const PAD_X = 8;
const PAD_Y = 10;
const RSI_TOP = 142;
const usableW = CHART_W - PAD_X * 2;
const usableH = RSI_TOP - PAD_Y * 2;
const candleW = (usableW / CANDLES.length) * 0.55;
const step = usableW / CANDLES.length;

const maPath = MA_POINTS.map((point, index) => {
  const x = PAD_X + index * step + step / 2;
  const y = PAD_Y + (point / 100) * usableH;
  return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(' ');

export default function TradingViewCard({ imageUri }: Props) {
  return (
    <View className="rounded-3xl overflow-hidden border border-white/[0.14]">
      <BlurView intensity={20} tint="dark">
        <View className="bg-white/[0.04] p-4">
          <View className="rounded-2xl overflow-hidden bg-[#080C14] border border-white/[0.06]" style={{ height: 260 }}>
            {imageUri ? (
              // Will show actual image when uploaded
              <View className="flex-1 items-center justify-center">
                <Ionicons name="checkmark-circle" size={20} color="#34D399" />
                <Text className="text-[#34D399] text-xs font-semibold mt-1">Chart Ready</Text>
              </View>
            ) : (
              // Mock chart
              <View className="flex-1">
                <View className="absolute right-3 top-2 rounded bg-[#00B09B]/20 border border-[#00B09B]/40 px-2 py-1">
                  <Text className="text-[#00C2A8] text-xs font-bold font-mono">149.968</Text>
                </View>

                <Svg width="100%" height="100%" viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none">
                  {[18, 38, 58, 78, 102, 126].map((y) => (
                    <Line
                      key={`h-${y}`}
                      x1={0}
                      y1={y}
                      x2={CHART_W}
                      y2={y}
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth={0.6}
                    />
                  ))}
                  {[30, 76, 122, 168, 214, 260, 306, 352, 398].map((x) => (
                    <Line
                      key={`v-${x}`}
                      x1={x}
                      y1={0}
                      x2={x}
                      y2={RSI_TOP}
                      stroke="rgba(255,255,255,0.055)"
                      strokeWidth={0.6}
                    />
                  ))}
                  <Line
                    x1={0}
                    y1={24}
                    x2={CHART_W}
                    y2={24}
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth={0.8}
                    strokeDasharray="4 5"
                  />
                  {CANDLES.map(([open, close, high, low], index) => {
                    const isBull = close <= open;
                    const color = isBull ? '#00A991' : '#FF4052';
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
                  <Path
                    d={maPath}
                    fill="none"
                    stroke="#F5A000"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Line
                    x1={0}
                    y1={RSI_TOP}
                    x2={CHART_W}
                    y2={RSI_TOP}
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth={0.8}
                  />
                  <Rect x={0} y={RSI_TOP} width={CHART_W} height={48} fill="rgba(56,39,88,0.35)" />
                  <Path
                    d="M0 174 L16 169 L31 176 L47 166 L63 172 L79 163 L95 158 L111 151 L127 148 L143 153 L159 146 L175 150 L191 143 L207 147 L223 149 L239 154 L255 160 L271 166 L287 170 L303 163 L319 167 L335 172 L351 176 L367 168 L383 163 L399 157 L420 161"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth={1}
                    strokeLinejoin="round"
                  />
                  <Line
                    x1={0}
                    y1={160}
                    x2={CHART_W}
                    y2={160}
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth={0.6}
                    strokeDasharray="5 7"
                  />
                  {PRICE_LABELS.map((item) => (
                    <SvgText
                      key={item.label}
                      x={CHART_W - 4}
                      y={item.y}
                      fill="rgba(255,255,255,0.64)"
                      fontSize={5.8}
                      fontWeight="700"
                      textAnchor="end"
                    >
                      {item.label}
                    </SvgText>
                  ))}
                </Svg>

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

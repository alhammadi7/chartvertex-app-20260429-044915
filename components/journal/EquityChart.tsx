import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';

import { Colors } from '@/constants/theme';

type Props = {
  data: number[];
};

const CHART_W = 300;
const CHART_H = 120;
const PAD = 8;

export default function EquityChart({ data }: Props) {
  if (data.length < 2) return null;

  const min = Math.min(...data, 0);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = PAD + (i / (data.length - 1)) * (CHART_W - PAD * 2);
    const y = CHART_H - PAD - ((v - min) / range) * (CHART_H - PAD * 2);
    return { x, y };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART_H} L ${points[0].x} ${CHART_H} Z`;

  return (
    <View>
      <Text
        style={{
          color: Colors.text.muted,
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        Performance
      </Text>

      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.glass.border,
        }}
      >
        <BlurView intensity={20} tint="dark">
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 12,
              backgroundColor: Colors.glass.surface,
              alignItems: 'center',
            }}
          >
            <Svg
              width="100%"
              height={CHART_H}
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            >
              <Defs>
                <SvgGrad id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor={Colors.accent.primary} stopOpacity="0.3" />
                  <Stop offset="1" stopColor={Colors.accent.primary} stopOpacity="0.02" />
                </SvgGrad>
              </Defs>

              {/* Area fill */}
              <Path d={areaPath} fill="url(#areaFill)" />

              {/* Line */}
              <Path
                d={linePath}
                fill="none"
                stroke={Colors.accent.primary}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>

            {/* Day labels */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 4,
                marginTop: 8,
              }}
            >
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].slice(0, data.length).map((d, i) => (
                <Text
                  key={i}
                  style={{
                    color: Colors.text.dim,
                    fontSize: 10,
                    fontWeight: '500',
                  }}
                >
                  {d}
                </Text>
              ))}
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

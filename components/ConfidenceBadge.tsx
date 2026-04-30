import React from 'react';
import { Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Svg, { Circle } from 'react-native-svg';

import { Colors } from '@/constants/theme';

type Props = {
  value: number; // 0-100
};

function getGlowColor(v: number): string {
  if (v >= 80) return Colors.signals.bullish;
  if (v >= 60) return Colors.accent.primary;
  return '#F59E0B';
}

export default function ConfidenceBadge({ value }: Props) {
  const glowColor = getGlowColor(value);
  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <View
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.glass.border,
        shadowColor: glowColor,
        shadowOpacity: 0.5,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
      }}
    >
      <BlurView intensity={30} tint="dark">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 8,
            backgroundColor: Colors.glass.surface,
            gap: 8,
          }}
        >
          <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={glowColor}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${progress} ${circumference - progress}`}
                strokeDashoffset={circumference * 0.25}
                strokeLinecap="round"
                rotation="-90"
                origin={`${size / 2}, ${size / 2}`}
              />
            </Svg>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: glowColor,
                  fontSize: 16,
                  fontWeight: '800',
                  fontFamily: 'monospace',
                }}
              >
                {value}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: Colors.text.muted,
                fontSize: 9,
                fontWeight: '600',
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Confidence
            </Text>
            <Text
              style={{
                color: glowColor,
                fontSize: 14,
                fontWeight: '700',
                marginTop: 2,
              }}
            >
              {value}%
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

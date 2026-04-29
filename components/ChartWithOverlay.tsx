import React from 'react';
import { Image, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import { Colors, Gradients } from '@/constants/theme';
import { PriceLevel, Timeframe } from '@/constants/types';

type Props = {
  imageUri: string | null;
  levels: PriceLevel[];
  bias: 'bullish' | 'bearish';
  pair: string;
  timeframe: Timeframe;
  children?: React.ReactNode;
};

const LEVEL_COLORS: Record<PriceLevel['type'], string> = {
  entry: Colors.accent.primary,
  sl: Colors.signals.bearish,
  tp: Colors.signals.bullish,
};

const TP_OPACITY: Record<string, number> = {
  TP1: 1,
  TP2: 0.7,
  TP3: 0.5,
};

export default function ChartWithOverlay({
  imageUri,
  levels,
  bias,
  pair,
  timeframe,
  children,
}: Props) {
  const totalLevels = levels.length;

  return (
    <LinearGradient
      colors={Gradients.border}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, borderRadius: 24, padding: 1 }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 23,
          overflow: 'hidden',
          backgroundColor: Colors.bg.base,
        }}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#0A0E18',
            }}
          />
        )}

        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(6, 8, 15, 0.3)',
          }}
        />

        {levels.map((level, i) => {
          const color = LEVEL_COLORS[level.type];
          const opacity = level.type === 'tp' ? (TP_OPACITY[level.label] ?? 0.5) : 1;
          const isSolid = level.type === 'entry' || level.type === 'sl';
          const topPercent =
            totalLevels > 1 ? 10 + (i / (totalLevels - 1)) * 70 : 50;

          return (
            <View
              key={level.label}
              style={{
                position: 'absolute',
                top: `${topPercent}%`,
                left: 0,
                right: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: isSolid ? 2 : 1.5,
                  backgroundColor: color,
                  opacity,
                  borderStyle: isSolid ? 'solid' : 'dashed',
                }}
              />

              <View
                style={{
                  position: 'absolute',
                  right: 8,
                  top: -14,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                <BlurView intensity={25} tint="dark">
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      gap: 6,
                    }}
                  >
                    <Text
                      style={{
                        color,
                        fontSize: 10,
                        fontWeight: '700',
                        opacity,
                        letterSpacing: 0.5,
                      }}
                    >
                      {level.label}
                    </Text>
                    <Text
                      style={{
                        color: Colors.text.primary,
                        fontSize: 10,
                        fontFamily: 'monospace',
                        fontWeight: '500',
                      }}
                    >
                      ${level.price.toLocaleString()}
                    </Text>
                  </View>
                </BlurView>
              </View>
            </View>
          );
        })}

        <View
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            flexDirection: 'row',
            gap: 6,
          }}
        >
          <TopChip text={pair} />
          <TopChip text={timeframe} />
          <TopChip
            text={bias === 'bullish' ? '^ Long' : 'v Short'}
            color={bias === 'bullish' ? Colors.signals.bullish : Colors.signals.bearish}
          />
        </View>

        <View style={{ position: 'absolute', bottom: 12, left: 12 }}>
          {children}
        </View>
      </View>
    </LinearGradient>
  );
}

function TopChip({ text, color }: { text: string; color?: string }) {
  return (
    <View
      style={{
        borderRadius: 999,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.glass.border,
      }}
    >
      <BlurView intensity={25} tint="dark">
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: Colors.glass.surface,
          }}
        >
          <Text
            style={{
              color: color ?? Colors.text.primary,
              fontSize: 11,
              fontWeight: '600',
            }}
          >
            {text}
          </Text>
        </View>
      </BlurView>
    </View>
  );
}

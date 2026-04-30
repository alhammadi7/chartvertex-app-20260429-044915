import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { Timeframe, TIMEFRAMES } from '@/constants/types';
import GlassChip from '@/components/ui/GlassChip';

type Props = {
  pair: string;
  timeframe: Timeframe;
  onPairChange: (p: string) => void;
  onTimeframeChange: (t: Timeframe) => void;
  onRemove: () => void;
};

export default function OverlayChipsTop({
  pair,
  timeframe,
  onTimeframeChange,
  onRemove,
}: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {/* Pair selector */}
        <GlassChip>
          <Text
            style={{
              color: Colors.text.primary,
              fontSize: 12,
              fontWeight: '600',
              marginRight: 6,
            }}
          >
            {pair}
          </Text>
          <Ionicons
            name="chevron-down"
            size={12}
            color={Colors.text.primary}
          />
        </GlassChip>

        {/* Timeframe segmented */}
        <GlassChip>
          {TIMEFRAMES.map((tf) => {
            const active = timeframe === tf;
            return (
              <Pressable
                key={tf}
                onPress={() => onTimeframeChange(tf)}
                hitSlop={6}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                    color: active ? Colors.accent.primary : Colors.text.muted,
                  }}
                >
                  {tf}
                </Text>
              </Pressable>
            );
          })}
        </GlassChip>
      </View>

      {/* Remove */}
      <Pressable onPress={onRemove} hitSlop={8}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: Colors.glass.borderStrong,
          }}
        >
          <BlurView
            intensity={30}
            tint="dark"
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.glass.surface,
            }}
          >
            <Ionicons name="close" size={16} color={Colors.text.primary} />
          </BlurView>
        </View>
      </Pressable>
    </View>
  );
}

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

type Props = {
  onProfilePress?: () => void;
};

export default function GlassTopBar({ onProfilePress }: Props) {
  return (
    <View className="mx-4 mt-2 rounded-2xl overflow-hidden border border-white/10">
      <BlurView intensity={40} tint="dark">
        <View
          className="flex-row items-center justify-between px-4"
          style={{ height: 56, backgroundColor: Colors.glass.surface }}
        >
          <Pressable hitSlop={12}>
            <Ionicons name="menu" size={22} color={Colors.text.primary} />
          </Pressable>

          <Text
            className="text-base font-semibold tracking-wide"
            style={{ color: Colors.text.primary }}
          >
            ChartVertex
          </Text>

          <Pressable
            onPress={onProfilePress}
            hitSlop={12}
            className="w-9 h-9 rounded-full items-center justify-center border border-white/10"
            style={{ backgroundColor: Colors.glass.surfaceStrong }}
          >
            <Ionicons name="person" size={16} color={Colors.text.primary} />
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
}

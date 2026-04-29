import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onBackPress?: () => void;
  onProfilePress?: () => void;
};

export default function GlassTopBar({ onBackPress, onProfilePress }: Props) {
  return (
    <View className="mx-4 mt-2 rounded-2xl overflow-hidden border border-white/10">
      <BlurView intensity={40} tint="dark">
        <View className="flex-row items-center justify-between px-4 h-14 bg-white/[0.08]">
          {onBackPress ? (
            <Pressable
              onPress={onBackPress}
              hitSlop={12}
              className="w-9 h-9 rounded-full items-center justify-center border border-white/10 bg-white/[0.08]"
            >
              <Ionicons name="chevron-back" size={21} color="#F0F4FF" />
            </Pressable>
          ) : (
            <View className="w-9" />
          )}

          <Text className="text-[#F0F4FF] text-base font-semibold tracking-wider">
            ChartVertex
          </Text>

          <Pressable
            onPress={onProfilePress}
            hitSlop={12}
            className="w-9 h-9 rounded-full items-center justify-center border border-white/10 bg-white/[0.12]"
          >
            <Ionicons name="person" size={16} color="#F0F4FF" />
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
}

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onPick: (source: 'camera' | 'gallery') => void;
  hasImage: boolean;
  imageLabel?: string;
};

export default function UploadFallback({ onPick, hasImage, imageLabel }: Props) {
  return (
    <View className="flex-row gap-3">

      <Pressable
        onPress={() => onPick('camera')}
        className="flex-1 active:opacity-70"
      >
        <View className="rounded-2xl overflow-hidden border border-white/[0.14]">
          <BlurView intensity={20} tint="dark">
            <View className="flex-row items-center justify-center gap-2 py-3.5 bg-white/[0.06]">
              <Ionicons name="camera-outline" size={16} color="#8B95A8" />
              <Text className="text-[#8B95A8] text-sm font-semibold">Take Photo</Text>
            </View>
          </BlurView>
        </View>
      </Pressable>

      <Pressable
        onPress={() => onPick('gallery')}
        className="flex-1 active:opacity-70"
      >
        <View className={`rounded-2xl overflow-hidden border ${hasImage ? 'border-[#4F8EF7]/50' : 'border-white/[0.14]'}`}>
          <BlurView intensity={20} tint="dark">
            <View className={`flex-row items-center justify-center gap-2 py-3.5 ${hasImage ? 'bg-[#4F8EF7]/10' : 'bg-white/[0.06]'}`}>
              <Ionicons name="images-outline" size={16} color={hasImage ? '#4F8EF7' : '#8B95A8'} />
              <Text className={`text-sm font-semibold ${hasImage ? 'text-[#4F8EF7]' : 'text-[#8B95A8]'}`}>
                {hasImage && imageLabel ? imageLabel : 'Upload Chart'}
              </Text>
            </View>
          </BlurView>
        </View>
      </Pressable>

    </View>
  );
}

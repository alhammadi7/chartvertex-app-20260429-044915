import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

type Props = {
  onPick: (source: 'camera' | 'gallery') => void;
};

export default function UploadDropzone({ onPick }: Props) {
  return (
    <View className="flex-1 mb-32">
      <View
        className="flex-1 rounded-3xl overflow-hidden border border-dashed"
        style={{ borderColor: Colors.glass.borderStrong }}
      >
        <BlurView intensity={20} tint="dark" style={{ flex: 1 }}>
          <View
            className="flex-1 items-center justify-center px-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
          >
            <View
              className="w-16 h-16 rounded-full items-center justify-center border border-white/10 mb-5"
              style={{ backgroundColor: Colors.glass.surface }}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={28}
                color={Colors.accent.primary}
              />
            </View>

            <Text
              className="text-lg font-medium mb-1"
              style={{ color: Colors.text.primary }}
            >
              Tap to upload chart
            </Text>
            <Text
              className="text-xs mb-8"
              style={{ color: Colors.text.muted }}
            >
              PNG · JPG · 10MB max
            </Text>

            <View className="flex-row" style={{ gap: 12 }}>
              <DropzoneButton
                icon="camera-outline"
                label="Camera"
                onPress={() => onPick('camera')}
              />
              <DropzoneButton
                icon="images-outline"
                label="Gallery"
                onPress={() => onPick('gallery')}
              />
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

function DropzoneButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center px-5 py-3 rounded-2xl border border-white/10 active:opacity-70"
      style={{ backgroundColor: Colors.glass.surface, gap: 8 }}
    >
      <Ionicons name={icon} size={16} color={Colors.text.primary} />
      <Text
        className="text-sm font-medium"
        style={{ color: Colors.text.primary }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

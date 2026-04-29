import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

type Props = {
  onBack: () => void;
};

export default function AnalysisTopBar({ onBack }: Props) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 8,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.glass.border,
      }}
    >
      <BlurView intensity={40} tint="dark">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            height: 56,
            backgroundColor: Colors.glass.surface,
          }}
        >
          <Pressable
            onPress={onBack}
            hitSlop={12}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Ionicons name="chevron-back" size={20} color={Colors.text.primary} />
            <Text style={{ color: Colors.text.muted, fontSize: 14 }}>Back</Text>
          </Pressable>

          <Text
            style={{
              color: Colors.text.primary,
              fontSize: 16,
              fontWeight: '600',
              letterSpacing: 0.3,
            }}
          >
            Analysis
          </Text>

          <Pressable hitSlop={12}>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={Colors.text.muted}
            />
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
}

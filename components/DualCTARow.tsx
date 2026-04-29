import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Gradients, Shadows } from '@/constants/theme';

type Props = {
  onCalculateRisk: () => void;
  onSave: () => void;
};

export default function DualCTARow({ onCalculateRisk, onSave }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 32,
        left: 16,
        right: 16,
        flexDirection: 'row',
        gap: 12,
      }}
    >
      <Pressable
        onPress={onCalculateRisk}
        style={{
          flex: 1,
          ...Shadows.glow,
        }}
      >
        <LinearGradient
          colors={Gradients.cta}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 16 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              gap: 8,
            }}
          >
            <Ionicons name="calculator-outline" size={16} color="#FFFFFF" />
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: '600',
              }}
            >
              Calculate Risk
            </Text>
          </View>
        </LinearGradient>
      </Pressable>

      <Pressable onPress={onSave} style={{ flex: 0.6 }}>
        <View
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: Colors.glass.borderStrong,
          }}
        >
          <BlurView intensity={25} tint="dark">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 48,
                backgroundColor: Colors.glass.surface,
                gap: 8,
              }}
            >
              <Ionicons
                name="bookmark-outline"
                size={16}
                color={Colors.text.primary}
              />
              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                Save
              </Text>
            </View>
          </BlurView>
        </View>
      </Pressable>
    </View>
  );
}

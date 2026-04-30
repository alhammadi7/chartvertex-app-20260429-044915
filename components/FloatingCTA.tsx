import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { Gradients, Shadows } from '@/constants/theme';

type Props = {
  enabled: boolean;
  loading: boolean;
  onPress: () => void;
};

export default function FloatingCTA({ enabled, loading, onPress }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 32,
        left: 16,
        right: 16,
      }}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={onPress}
        disabled={!enabled || loading}
        style={{
          ...Shadows.glow,
          shadowOpacity: enabled ? 0.55 : 0,
          elevation: enabled ? 12 : 0,
          opacity: enabled ? 1 : 0.4,
        }}
      >
        <LinearGradient
          colors={Gradients.cta}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 20 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 56,
              gap: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Ionicons name="flash" size={18} color="#FFFFFF" />
            )}
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
                letterSpacing: 0.5,
              }}
            >
              {loading ? 'Analyzing…' : 'Analyze Chart'}
            </Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

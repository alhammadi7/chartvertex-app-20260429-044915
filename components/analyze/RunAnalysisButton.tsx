import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  enabled: boolean;
  loading: boolean;
  onPress: () => void;
};

const LOADING_MESSAGES = [
  'Reading Market Structure...',
  'Detecting Support & Resistance...',
  'Evaluating Liquidity...',
  'Generating Trade Setup...',
];

export default function RunAnalysisButton({ enabled, loading, onPress }: Props) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      setMsgIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMsgIndex((index) => (index + 1) % LOADING_MESSAGES.length);
    }, 900);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <Pressable
      onPress={onPress}
      disabled={!enabled || loading}
      className={enabled ? 'opacity-100' : 'opacity-35'}
      style={
        enabled
          ? {
              shadowColor: '#4F8EF7',
              shadowOpacity: 0.6,
              shadowRadius: 28,
              shadowOffset: { width: 0, height: 8 },
              elevation: 14,
            }
          : undefined
      }
    >
      <LinearGradient
        colors={loading ? ['#2A4A8A', '#4A2A8A'] : ['#4F8EF7', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="rounded-[20px]"
      >
        <View className="flex-row items-center justify-center h-14 gap-2.5">
          {loading ? (
            <Text className="text-white/80 text-sm font-semibold tracking-wide">
              {LOADING_MESSAGES[msgIndex]}
            </Text>
          ) : (
            <>
              <Ionicons name="flash" size={18} color="#FFFFFF" />
              <Text className="text-white text-base font-bold tracking-wide">
                Run AI Analysis
              </Text>
            </>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

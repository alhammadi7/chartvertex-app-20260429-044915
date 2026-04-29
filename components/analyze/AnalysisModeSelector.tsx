import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { ANALYSIS_MODES, AnalysisMode } from '@/constants/types';

type Props = {
  value: AnalysisMode;
  onChange: (m: AnalysisMode) => void;
};

const MODE_META: Record<AnalysisMode, { icon: string; color: string }> = {
  Scalping: { icon: '⚡', color: '#F59E0B' },
  Intraday: { icon: '🔥', color: '#F87171' },
  Swing:    { icon: '🌊', color: '#4F8EF7' },
  Position: { icon: '🏔', color: '#8B5CF6' },
};

export default function AnalysisModeSelector({ value, onChange }: Props) {
  return (
    <View>
      <Text className="text-[#8B95A8] text-[11px] font-semibold tracking-[1.5px] uppercase mb-2.5">
        Analysis Mode
      </Text>
      <View className="flex-row gap-2">
        {ANALYSIS_MODES.map((mode) => {
          const active = value === mode;
          const meta = MODE_META[mode];
          return (
            <Pressable
              key={mode}
              onPress={() => onChange(mode)}
              className="flex-1 active:opacity-80"
            >
              <View
                className={`items-center py-2.5 rounded-2xl border ${
                  active
                    ? 'bg-white/[0.10] border-white/20'
                    : 'bg-white/[0.04] border-white/[0.08]'
                }`}
              >
                <Text className="text-base mb-0.5">{meta.icon}</Text>
                <Text
                  className="text-[11px] font-semibold"
                  style={{ color: active ? meta.color : '#8B95A8' }}
                >
                  {mode}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

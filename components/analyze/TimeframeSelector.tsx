import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { TIMEFRAMES, Timeframe } from '@/constants/types';

type Props = {
  value: Timeframe;
  onChange: (t: Timeframe) => void;
};

export default function TimeframeSelector({ value, onChange }: Props) {
  return (
    <View>
      <Text className="text-[#8B95A8] text-[11px] font-semibold tracking-[1.5px] uppercase mb-2.5">
        Timeframe
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2 pr-4">
          {TIMEFRAMES.map((tf) => {
            const active = value === tf;
            return (
              <Pressable key={tf} onPress={() => onChange(tf)} className="active:opacity-70">
                <View
                  className={`px-4 py-2.5 rounded-full border ${
                    active
                      ? 'bg-[#4F8EF7]/20 border-[#4F8EF7]/60'
                      : 'bg-white/[0.05] border-white/[0.10]'
                  }`}
                >
                  <Text
                    className={`text-xs font-bold tracking-wide ${
                      active ? 'text-[#4F8EF7]' : 'text-[#8B95A8]'
                    }`}
                  >
                    {tf}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

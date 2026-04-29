import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const MOCK_NEWS = [
  {
    id: '1',
    source: 'ForexFactory',
    sourceColor: '#F59E0B',
    headline: 'Fed signals cautious approach to rate cuts amid persistent inflation data',
    time: '12m ago',
    impact: 'high',
  },
  {
    id: '2',
    source: 'Reuters',
    sourceColor: '#F87171',
    headline: 'Gold hits fresh highs as safe-haven demand surges on geopolitical tensions',
    time: '34m ago',
    impact: 'medium',
  },
  {
    id: '3',
    source: 'Bloomberg',
    sourceColor: '#4F8EF7',
    headline: 'Bitcoin consolidates above $66K ahead of key resistance at $68K level',
    time: '1h ago',
    impact: 'low',
  },
  {
    id: '4',
    source: 'Investing',
    sourceColor: '#8B5CF6',
    headline: 'EUR/USD tests critical 1.0850 support as dollar index strengthens',
    time: '2h ago',
    impact: 'high',
  },
];

const IMPACT_COLORS: Record<string, string> = {
  high:   '#F87171',
  medium: '#F59E0B',
  low:    '#34D399',
};

export default function MarketNewsSection() {
  return (
    <View>
      {/* Section header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-[#8B95A8] text-[11px] font-semibold tracking-[1.5px] uppercase">
            Market News
          </Text>
          {/* Live badge */}
          <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-[#F87171]/15 border border-[#F87171]/30">
            <View className="w-1.5 h-1.5 rounded-full bg-[#F87171]" style={{ shadowColor: '#F87171', shadowOpacity: 1, shadowRadius: 4, shadowOffset: { width: 0, height: 0 } }} />
            <Text className="text-[#F87171] text-[10px] font-bold tracking-wide">LIVE</Text>
          </View>
        </View>
        <Pressable className="flex-row items-center gap-1 active:opacity-70">
          <Text className="text-[#4F8EF7] text-xs font-semibold">See all</Text>
          <Ionicons name="chevron-forward" size={12} color="#4F8EF7" />
        </Pressable>
      </View>

      {/* News cards */}
      <View className="gap-2.5">
        {MOCK_NEWS.map((item) => (
          <Pressable key={item.id} className="active:opacity-80">
            <View className="rounded-2xl overflow-hidden border border-white/[0.10]">
              <BlurView intensity={15} tint="dark">
                <View className="flex-row gap-3 p-3.5 bg-white/[0.04]">

                  {/* Impact dot */}
                  <View className="pt-1">
                    <View
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: IMPACT_COLORS[item.impact] }}
                    />
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2 mb-1">
                      <Text
                        className="text-[10px] font-bold tracking-wide"
                        style={{ color: item.sourceColor }}
                      >
                        {item.source}
                      </Text>
                      <Text className="text-[#4A5568] text-[10px]">{item.time}</Text>
                    </View>
                    <Text className="text-[#F0F4FF] text-xs leading-4 font-medium" numberOfLines={2}>
                      {item.headline}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={14} color="#4A5568" />
                </View>
              </BlurView>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import GlassTopBar from '@/components/GlassTopBar';
import BottomNav from '@/components/BottomNav';

const STATS = [
  { label: 'Total Analyses', value: '47', icon: 'analytics-outline', color: '#4F8EF7' },
  { label: 'Win Rate', value: '73%', icon: 'trending-up-outline', color: '#34D399' },
  { label: 'Total P/L', value: '+$1,247', icon: 'cash-outline', color: '#34D399' },
  { label: 'Avg RR', value: '1:2.8', icon: 'git-branch-outline', color: '#8B5CF6' },
];

const RECENT = [
  { pair: 'BTCUSD', tf: '4H', pnl: '+$420', win: true, date: 'Apr 28' },
  { pair: 'XAUUSD', tf: '4H', pnl: '+$287', win: true, date: 'Apr 27' },
  { pair: 'EURUSD', tf: '1H', pnl: '-$85',  win: false, date: 'Apr 26' },
  { pair: 'SOLUSD', tf: '4H', pnl: '+$310', win: true, date: 'Apr 25' },
];

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-[#06080F]">
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#06080F', '#0D1B3E', '#1A0B2E']}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        <GlassTopBar />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-[#F0F4FF] text-xl font-bold mb-1">Dashboard</Text>
          <Text className="text-[#8B95A8] text-sm mb-5">Your trading overview</Text>

          {/* Stats grid */}
          <View className="flex-row flex-wrap gap-3 mb-6">
            {STATS.map((s) => (
              <View key={s.label} className="rounded-2xl overflow-hidden border border-white/[0.10]" style={{ width: '47%' }}>
                <BlurView intensity={20} tint="dark">
                  <View className="p-4 bg-white/[0.05]">
                    <View className="w-8 h-8 rounded-full items-center justify-center mb-3" style={{ backgroundColor: `${s.color}22` }}>
                      <Ionicons name={s.icon as any} size={16} color={s.color} />
                    </View>
                    <Text className="font-mono font-bold text-xl mb-0.5" style={{ color: s.color }}>{s.value}</Text>
                    <Text className="text-[#8B95A8] text-xs">{s.label}</Text>
                  </View>
                </BlurView>
              </View>
            ))}
          </View>

          {/* Recent trades */}
          <Text className="text-[#8B95A8] text-[11px] font-semibold tracking-[1.5px] uppercase mb-3">
            Recent Activity
          </Text>
          <View className="rounded-2xl overflow-hidden border border-white/[0.10]">
            <BlurView intensity={20} tint="dark">
              <View className="bg-white/[0.04]">
                {RECENT.map((t, i) => (
                  <View
                    key={t.pair + i}
                    className={`flex-row items-center px-4 py-3.5 ${i < RECENT.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                  >
                    <View className={`w-2 h-2 rounded-full mr-3 ${t.win ? 'bg-[#34D399]' : 'bg-[#F87171]'}`} />
                    <Text className="text-[#F0F4FF] text-sm font-bold flex-1">{t.pair}</Text>
                    <View className="px-2 py-0.5 rounded bg-white/[0.06] mr-3">
                      <Text className="text-[#8B95A8] text-[10px] font-semibold">{t.tf}</Text>
                    </View>
                    <Text className={`font-mono text-sm font-bold mr-3 ${t.win ? 'text-[#34D399]' : 'text-[#F87171]'}`}>{t.pnl}</Text>
                    <Text className="text-[#4A5568] text-xs">{t.date}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomNav />
    </View>
  );
}

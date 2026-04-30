import React from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

const MOCK_REPORT = {
  symbol: 'BTCUSD',
  timeframe: '4H',
  bias: 'Bullish' as const,
  confidence: 78,
  marketStructure:
    'Price has broken above a key weekly resistance at 65,800, forming a series of Higher Highs and Higher Lows on the 4H chart. The current candle structure confirms bullish market structure with a valid Break of Structure (BOS) confirmed on the last two closes. Momentum is aligned to the upside with no bearish divergence detected.',
  supportResistance: {
    support: ['65,800', '64,200', '62,500'],
    resistance: ['68,000', '69,420', '71,000'],
  },
  liquidity:
    'Sell-side liquidity pools identified below 65,800 (equal lows zone). Buy-side targets visible at 68,000-69,420 where previous swing highs created liquidity. Smart money likely to target the 68K-69K premium zone before any pullback.',
  riskPlan: {
    entry: '66,200',
    sl: '65,100',
    tp1: '67,500',
    tp2: '68,800',
    tp3: '69,420',
    rr: '1:2.8',
  },
  recommendation:
    'Wait for a pullback to the 66,000-66,200 demand zone on the 1H chart before entering long. Confirmation candle required. Risk 1-2% of account. Primary target is 68,800 (TP2). Trail stop after TP1 is hit. Avoid entry if price closes below 65,800 on the 4H.',
};

const BIAS_COLOR = {
  Bullish: '#34D399',
  Bearish: '#F87171',
  Neutral: '#F59E0B',
} as const;

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ symbol?: string; timeframe?: string }>();
  const symbol = params.symbol ?? MOCK_REPORT.symbol;
  const timeframe = params.timeframe ?? MOCK_REPORT.timeframe;
  const biasColor = BIAS_COLOR[MOCK_REPORT.bias];

  return (
    <View className="flex-1 bg-[#06080F]">
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#06080F', '#0D1B3E', '#1A0B2E']}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="mx-4 mt-2 rounded-2xl overflow-hidden border border-white/10">
          <BlurView intensity={40} tint="dark">
            <View className="flex-row items-center justify-between px-4 h-14 bg-white/[0.08]">
              <Pressable
                onPress={() => router.back()}
                hitSlop={12}
                className="flex-row items-center gap-1"
              >
                <Ionicons name="chevron-back" size={20} color="#F0F4FF" />
                <Text className="text-[#8B95A8] text-sm">Back</Text>
              </Pressable>
              <Text className="text-[#F0F4FF] text-base font-semibold">
                Full Report
              </Text>
              <View className="w-12" />
            </View>
          </BlurView>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="rounded-3xl overflow-hidden border border-white/[0.14] mb-4">
            <BlurView intensity={25} tint="dark">
              <View className="p-4 bg-white/[0.04]">
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text className="text-[#F0F4FF] text-xl font-bold">
                      {symbol}
                    </Text>
                    <Text className="text-[#8B95A8] text-sm">
                      {timeframe} - AI Analysis
                    </Text>
                  </View>
                  <View
                    className="px-3 py-1.5 rounded-full border"
                    style={{
                      backgroundColor: `${biasColor}18`,
                      borderColor: `${biasColor}44`,
                    }}
                  >
                    <Text className="font-bold text-sm" style={{ color: biasColor }}>
                      {MOCK_REPORT.bias}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <Text className="text-[#8B95A8] text-xs">Confidence</Text>
                  <View className="flex-1 h-1.5 rounded-full bg-white/10">
                    <View
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${MOCK_REPORT.confidence}%`,
                        backgroundColor: biasColor,
                      }}
                    />
                  </View>
                  <Text
                    className="font-mono font-bold text-xs"
                    style={{ color: biasColor }}
                  >
                    {MOCK_REPORT.confidence}%
                  </Text>
                </View>
              </View>
            </BlurView>
          </View>

          <ReportSection
            icon="analytics-outline"
            title="Market Structure"
            color="#4F8EF7"
          >
            <Text className="text-[#F0F4FF] text-sm leading-6">
              {MOCK_REPORT.marketStructure}
            </Text>
          </ReportSection>

          <ReportSection
            icon="layers-outline"
            title="Support / Resistance"
            color="#8B5CF6"
          >
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-[#34D399] text-[10px] font-bold uppercase tracking-widest mb-2">
                  Support
                </Text>
                {MOCK_REPORT.supportResistance.support.map((support) => (
                  <View key={support} className="flex-row items-center gap-2 mb-1.5">
                    <View className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
                    <Text className="text-[#F0F4FF] font-mono text-sm">
                      {support}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="w-px bg-white/10" />
              <View className="flex-1">
                <Text className="text-[#F87171] text-[10px] font-bold uppercase tracking-widest mb-2">
                  Resistance
                </Text>
                {MOCK_REPORT.supportResistance.resistance.map((resistance) => (
                  <View
                    key={resistance}
                    className="flex-row items-center gap-2 mb-1.5"
                  >
                    <View className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
                    <Text className="text-[#F0F4FF] font-mono text-sm">
                      {resistance}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ReportSection>

          <ReportSection icon="water-outline" title="Liquidity" color="#F59E0B">
            <Text className="text-[#F0F4FF] text-sm leading-6">
              {MOCK_REPORT.liquidity}
            </Text>
          </ReportSection>

          <ReportSection
            icon="shield-checkmark-outline"
            title="Risk Plan"
            color="#34D399"
          >
            <View className="gap-2">
              {[
                { label: 'Entry', value: MOCK_REPORT.riskPlan.entry, color: '#4F8EF7' },
                { label: 'Stop Loss', value: MOCK_REPORT.riskPlan.sl, color: '#F87171' },
                { label: 'TP1', value: MOCK_REPORT.riskPlan.tp1, color: '#34D399' },
                { label: 'TP2', value: MOCK_REPORT.riskPlan.tp2, color: '#34D399' },
                { label: 'TP3', value: MOCK_REPORT.riskPlan.tp3, color: '#34D399' },
                { label: 'R:R', value: MOCK_REPORT.riskPlan.rr, color: '#8B5CF6' },
              ].map((row) => (
                <View
                  key={row.label}
                  className="flex-row justify-between items-center py-2 border-b border-white/[0.06]"
                >
                  <Text className="text-[#8B95A8] text-sm">{row.label}</Text>
                  <Text
                    className="font-mono font-bold text-sm"
                    style={{ color: row.color }}
                  >
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>
          </ReportSection>

          <ReportSection
            icon="bulb-outline"
            title="AI Recommendation"
            color="#8B5CF6"
          >
            <Text className="text-[#F0F4FF] text-sm leading-6">
              {MOCK_REPORT.recommendation}
            </Text>
          </ReportSection>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ReportSection({
  icon,
  title,
  color,
  children,
}: {
  icon: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <View className="rounded-2xl overflow-hidden border border-white/[0.10] mb-4">
      <BlurView intensity={20} tint="dark">
        <View className="bg-white/[0.04]">
          <View className="flex-row items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
            <View
              className="w-7 h-7 rounded-full items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Ionicons name={icon as any} size={14} color={color} />
            </View>
            <Text className="text-[#F0F4FF] text-sm font-bold">{title}</Text>
          </View>
          <View className="px-4 py-3">{children}</View>
        </View>
      </BlurView>
    </View>
  );
}

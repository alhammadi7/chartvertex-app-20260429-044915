import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export type AnalysisPreview = {
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number;
  confidenceLabel: 'High' | 'Medium' | 'Low';
  support: string;
  resistance: string;
  riskSummary: string;
};

type Props = {
  data: AnalysisPreview;
  onViewReport: () => void;
};

const BIAS_COLORS = {
  Bullish: { text: '#34D399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.30)' },
  Bearish: { text: '#F87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.30)' },
  Neutral: { text: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.30)'  },
};

const CONF_COLORS = { High: '#34D399', Medium: '#F59E0B', Low: '#F87171' };

export default function ResultPreviewCard({ data, onViewReport }: Props) {
  const biasStyle  = BIAS_COLORS[data.bias];
  const confColor  = CONF_COLORS[data.confidenceLabel];
  const barWidth = `${data.confidence}%` as const;

  return (
    <View className="rounded-3xl overflow-hidden border border-white/[0.14]">
      <BlurView intensity={25} tint="dark">
        <View className="bg-white/[0.04]">

          {/* Header */}
          <View className="flex-row items-center justify-between px-4 pt-4 pb-3 border-b border-white/[0.06]">
            <View className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={16} color="#34D399" />
              <Text className="text-[#F0F4FF] text-sm font-bold tracking-wide">
                Analysis Complete
              </Text>
            </View>
            <View className="px-2 py-0.5 rounded-full bg-[#34D399]/15 border border-[#34D399]/30">
              <Text className="text-[#34D399] text-[10px] font-bold">AI RESULT</Text>
            </View>
          </View>

          <View className="px-4 py-4 gap-4">

            {/* Bias + Confidence row */}
            <View className="flex-row gap-3">

              {/* Bias */}
              <View
                className="flex-1 rounded-2xl p-3 border"
                style={{ backgroundColor: biasStyle.bg, borderColor: biasStyle.border }}
              >
                <Text className="text-[#8B95A8] text-[10px] font-semibold tracking-widest uppercase mb-1.5">
                  Bias
                </Text>
                <View className="flex-row items-center gap-1.5">
                  <Ionicons
                    name={data.bias === 'Bullish' ? 'trending-up' : data.bias === 'Bearish' ? 'trending-down' : 'remove'}
                    size={18}
                    color={biasStyle.text}
                  />
                  <Text className="text-lg font-bold" style={{ color: biasStyle.text }}>
                    {data.bias}
                  </Text>
                </View>
              </View>

              {/* Confidence */}
              <View className="flex-1 rounded-2xl p-3 border border-white/[0.10] bg-white/[0.04]">
                <Text className="text-[#8B95A8] text-[10px] font-semibold tracking-widest uppercase mb-1.5">
                  Confidence
                </Text>
                <Text className="font-mono font-bold text-lg mb-2" style={{ color: confColor }}>
                  {data.confidence}%
                </Text>
                {/* Bar */}
                <View className="h-1.5 rounded-full bg-white/10">
                  <View
                    className="h-1.5 rounded-full"
                    style={{ width: barWidth, backgroundColor: confColor }}
                  />
                </View>
                <Text className="text-[10px] font-semibold mt-1" style={{ color: confColor }}>
                  {data.confidenceLabel}
                </Text>
              </View>
            </View>

            {/* Key Levels */}
            <View className="rounded-2xl p-3 border border-white/[0.10] bg-white/[0.04]">
              <Text className="text-[#8B95A8] text-[10px] font-semibold tracking-widest uppercase mb-3">
                Key Levels
              </Text>
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-[#8B95A8] text-xs mb-0.5">Support</Text>
                  <Text className="text-[#34D399] font-mono font-bold text-base">{data.support}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-[#8B95A8] text-xs mb-0.5">Resistance</Text>
                  <Text className="text-[#F87171] font-mono font-bold text-base">{data.resistance}</Text>
                </View>
              </View>
            </View>

            {/* Risk Summary */}
            <View className="rounded-2xl p-3 border border-[#8B5CF6]/25 bg-[#8B5CF6]/[0.06]">
              <View className="flex-row items-center gap-1.5 mb-1.5">
                <Ionicons name="shield-checkmark-outline" size={13} color="#8B5CF6" />
                <Text className="text-[#8B5CF6] text-[10px] font-bold tracking-widest uppercase">
                  Risk Summary
                </Text>
              </View>
              <Text className="text-[#F0F4FF] text-xs leading-5">{data.riskSummary}</Text>
            </View>

          </View>

          {/* View Full Report CTA */}
          <View className="px-4 pb-4">
            <Pressable onPress={onViewReport} className="active:opacity-70">
              <LinearGradient
                colors={['#4F8EF7', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-2xl"
              >
                <View className="flex-row items-center justify-center h-12 gap-2">
                  <Ionicons name="document-text-outline" size={16} color="#fff" />
                  <Text className="text-white text-sm font-bold tracking-wide">
                    View Full Report
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

        </View>
      </BlurView>
    </View>
  );
}

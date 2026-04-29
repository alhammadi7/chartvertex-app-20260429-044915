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
  entry: string;
  sl: string;
  tp: string;
  rr: string;
  explanation: string;
  riskSummary: string;
};

type Props = {
  data: AnalysisPreview;
  onViewReport: () => void;
};

const BIAS_COLORS = {
  Bullish: {
    text: '#34D399',
    bg: 'rgba(52,211,153,0.15)',
    border: 'rgba(52,211,153,0.40)',
    icon: 'trending-up' as const,
  },
  Bearish: {
    text: '#F87171',
    bg: 'rgba(248,113,113,0.15)',
    border: 'rgba(248,113,113,0.40)',
    icon: 'trending-down' as const,
  },
  Neutral: {
    text: '#F59E0B',
    bg: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.40)',
    icon: 'remove' as const,
  },
};

const CONFIDENCE_COLORS = { High: '#34D399', Medium: '#F59E0B', Low: '#F87171' };

export default function ResultPreviewCard({ data, onViewReport }: Props) {
  const biasStyle = BIAS_COLORS[data.bias];
  const confidenceColor = CONFIDENCE_COLORS[data.confidenceLabel];
  const confidenceWidth = `${data.confidence}%` as const;

  return (
    <View style={{ borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: biasStyle.border }}>
      <BlurView intensity={30} tint="dark">
        <View style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingTop: 14,
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="checkmark-circle" size={15} color="#34D399" />
              <Text style={{ color: '#F0F4FF', fontSize: 13, fontWeight: '700', letterSpacing: 0.3 }}>
                Analysis Complete
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 999,
                backgroundColor: 'rgba(52,211,153,0.12)',
                borderWidth: 1,
                borderColor: 'rgba(52,211,153,0.30)',
              }}
            >
              <Text style={{ color: '#34D399', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 }}>
                AI RESULT
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              paddingVertical: 20,
              backgroundColor: biasStyle.bg,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255,255,255,0.06)',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Ionicons name={biasStyle.icon} size={32} color={biasStyle.text} />
              <Text style={{ color: biasStyle.text, fontSize: 36, fontWeight: '800', letterSpacing: 0 }}>
                {data.bias}
              </Text>
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, marginTop: 4, letterSpacing: 0.5 }}>
              Market Bias
            </Text>
          </View>

          <View style={{ padding: 14, gap: 10 }}>
            <View
              style={{
                borderRadius: 16,
                padding: 12,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.10)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text
                  style={{
                    color: '#8B95A8',
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  Confidence
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ color: confidenceColor, fontSize: 20, fontWeight: '800', fontFamily: 'monospace' }}>
                    {data.confidence}%
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 7,
                      paddingVertical: 2,
                      borderRadius: 999,
                      backgroundColor: `${confidenceColor}22`,
                      borderWidth: 1,
                      borderColor: `${confidenceColor}55`,
                    }}
                  >
                    <Text style={{ color: confidenceColor, fontSize: 10, fontWeight: '700' }}>
                      {data.confidenceLabel}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <View
                  style={{
                    height: 6,
                    borderRadius: 3,
                    width: confidenceWidth,
                    backgroundColor: confidenceColor,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.10)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                overflow: 'hidden',
              }}
            >
              <View style={{ paddingHorizontal: 12, paddingTop: 10, paddingBottom: 6 }}>
                <Text
                  style={{
                    color: '#8B95A8',
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  Trade Setup
                </Text>
              </View>
              {[
                { label: 'Entry', value: data.entry, color: '#4F8EF7' },
                { label: 'Stop Loss', value: data.sl, color: '#F87171' },
                { label: 'Take Profit', value: data.tp, color: '#34D399' },
                { label: 'R:R', value: data.rr, color: '#8B5CF6' },
              ].map((row) => (
                <View
                  key={row.label}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 9,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <Text style={{ color: '#8B95A8', fontSize: 13 }}>{row.label}</Text>
                  <Text style={{ color: row.color, fontSize: 14, fontWeight: '700', fontFamily: 'monospace' }}>
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={{
                borderRadius: 16,
                padding: 12,
                borderWidth: 1,
                borderColor: 'rgba(139,92,246,0.25)',
                backgroundColor: 'rgba(139,92,246,0.07)',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Ionicons name="sparkles" size={13} color="#8B5CF6" />
                <Text
                  style={{
                    color: '#8B5CF6',
                    fontSize: 10,
                    fontWeight: '800',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  AI Insight
                </Text>
              </View>
              <Text style={{ color: '#E0E8FF', fontSize: 13, lineHeight: 20 }}>{data.explanation}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View
                style={{
                  flex: 1,
                  borderRadius: 14,
                  padding: 11,
                  borderWidth: 1,
                  borderColor: 'rgba(52,211,153,0.25)',
                  backgroundColor: 'rgba(52,211,153,0.07)',
                }}
              >
                <Text
                  style={{
                    color: '#8B95A8',
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  Support
                </Text>
                <Text style={{ color: '#34D399', fontSize: 17, fontWeight: '800', fontFamily: 'monospace' }}>
                  {data.support}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderRadius: 14,
                  padding: 11,
                  borderWidth: 1,
                  borderColor: 'rgba(248,113,113,0.25)',
                  backgroundColor: 'rgba(248,113,113,0.07)',
                }}
              >
                <Text
                  style={{
                    color: '#8B95A8',
                    fontSize: 10,
                    fontWeight: '700',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  Resistance
                </Text>
                <Text style={{ color: '#F87171', fontSize: 17, fontWeight: '800', fontFamily: 'monospace' }}>
                  {data.resistance}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
            <Pressable
              onPress={onViewReport}
              style={{
                shadowColor: '#4F8EF7',
                shadowOpacity: 0.5,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 6 },
                elevation: 10,
              }}
            >
              <LinearGradient
                colors={['#4F8EF7', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 18 }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, gap: 8 }}>
                  <Ionicons name="document-text-outline" size={17} color="#fff" />
                  <Text style={{ color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.4 }}>
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

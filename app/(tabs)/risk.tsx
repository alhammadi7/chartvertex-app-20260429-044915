import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import BreakdownCard from '@/components/risk/BreakdownCard';
import BottomNav from '@/components/BottomNav';
import RiskHero from '@/components/risk/RiskHero';
import RiskInput from '@/components/risk/RiskInput';
import RiskSlider from '@/components/risk/RiskSlider';
import TargetPills from '@/components/risk/TargetPills';
import { Colors, Gradients, Shadows } from '@/constants/theme';

export default function RiskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    entry?: string;
    sl?: string;
    tp1?: string;
    tp2?: string;
    tp3?: string;
    pair?: string;
  }>();

  const [balance, setBalance] = useState('5000');
  const [riskPct, setRiskPct] = useState(3);
  const [entry, setEntry] = useState(params.entry ?? '66200');
  const [sl, setSl] = useState(params.sl ?? '65100');

  const tp1 = parseFloat(params.tp1 ?? '67500');
  const tp2 = parseFloat(params.tp2 ?? '68800');
  const tp3 = parseFloat(params.tp3 ?? '69420');

  const calc = useMemo(() => {
    const bal = parseFloat(balance) || 0;
    const ent = parseFloat(entry) || 0;
    const stop = parseFloat(sl) || 0;
    const pipDist = Math.abs(ent - stop);
    const riskAmt = (bal * riskPct) / 100;
    const lotSize = pipDist > 0 ? riskAmt / pipDist : 0;
    const rrTP1 = pipDist > 0 ? Math.abs(tp1 - ent) / pipDist : 0;
    const potentialPL = lotSize * Math.abs(tp3 - ent);

    return {
      pipDist,
      riskAmt,
      lotSize,
      rrTP1,
      potentialPL,
    };
  }, [balance, entry, riskPct, sl, tp1, tp3]);

  const handleReset = () => {
    setBalance('5000');
    setRiskPct(3);
  };

  const handleSave = () => {
    // TODO: save trade to journal
    router.push('/(tabs)/journal');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#06080F' }}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={Gradients.cosmos}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: Colors.glass.border,
          }}
        >
          <BlurView intensity={40} tint="dark">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                height: 56,
                backgroundColor: Colors.glass.surface,
              }}
            >
              <Pressable
                onPress={() => router.back()}
                hitSlop={12}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={Colors.text.primary}
                />
                <Text style={{ color: Colors.text.muted, fontSize: 14 }}>
                  Back
                </Text>
              </Pressable>

              <Text
                style={{
                  color: Colors.text.primary,
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Risk Calculator
              </Text>

              <Pressable onPress={handleReset} hitSlop={12}>
                <Ionicons name="refresh" size={18} color={Colors.text.muted} />
              </Pressable>
            </View>
          </BlurView>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 160,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <RiskHero
            lotSize={calc.lotSize}
            riskAmt={calc.riskAmt}
            rrRatio={calc.rrTP1}
            riskPct={riskPct}
          />

          <View style={{ marginTop: 16 }}>
            <RiskSlider value={riskPct} onChange={setRiskPct} />
          </View>

          <SectionTitle label="Account" />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <RiskInput
                label="Balance"
                value={balance}
                onChangeText={setBalance}
                prefix="$"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={{ flex: 1 }}>
              <RiskInput
                label="Risk %"
                value={String(riskPct)}
                onChangeText={(value) => {
                  const next = parseFloat(value) || 0;
                  setRiskPct(Math.min(next, 100));
                }}
                suffix="%"
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <SectionTitle label="Trade Levels" />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <RiskInput
                label="Entry"
                value={entry}
                onChangeText={setEntry}
                accentColor={Colors.accent.primary}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={{ flex: 1 }}>
              <RiskInput
                label="Stop Loss"
                value={sl}
                onChangeText={setSl}
                accentColor={Colors.signals.bearish}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <SectionTitle label="Targets" />
          <TargetPills tp1={tp1} tp2={tp2} tp3={tp3} />

          <SectionTitle label="Breakdown" />
          <BreakdownCard
            rows={[
              { label: 'Pip Distance', value: calc.pipDist.toFixed(1) },
              { label: 'Risk Amount', value: `$${calc.riskAmt.toFixed(2)}` },
              { label: 'Lot Size', value: calc.lotSize.toFixed(4) },
              { label: 'RR Ratio (TP1)', value: `1:${calc.rrTP1.toFixed(1)}` },
              {
                label: 'Potential P/L (TP3)',
                value: `+$${calc.potentialPL.toFixed(2)}`,
                color: Colors.signals.bullish,
              },
            ]}
          />
        </ScrollView>

        <View style={{ position: 'absolute', bottom: 32, left: 16, right: 16 }}>
          <Pressable onPress={handleSave} style={Shadows.glow}>
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
                <Ionicons name="bookmark" size={18} color="#FFFFFF" />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '600',
                    letterSpacing: 0.5,
                  }}
                >
                  Save & Continue
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
      <BottomNav />
    </View>
  );
}

function SectionTitle({ label }: { label: string }) {
  return (
    <Text
      style={{
        color: Colors.text.muted,
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      {label}
    </Text>
  );
}

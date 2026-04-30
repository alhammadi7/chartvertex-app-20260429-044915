import React, { useMemo } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Gradients } from '@/constants/theme';
import { MOCK_TRADES, getWeekSummary } from '@/constants/mockTrades';

import BottomNav from '@/components/BottomNav';
import JournalTopBar from '@/components/journal/JournalTopBar';
import WeekSelector from '@/components/journal/WeekSelector';
import WeeklySummaryCard from '@/components/journal/WeeklySummaryCard';
import EquityChart from '@/components/journal/EquityChart';
import HighlightCards from '@/components/journal/HighlightCards';
import TradeList from '@/components/journal/TradeList';
import EmptyJournal from '@/components/journal/EmptyJournal';

export default function JournalScreen() {
  const router = useRouter();
  const summary = useMemo(() => getWeekSummary(MOCK_TRADES), []);
  const hasData = MOCK_TRADES.length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#06080F' }}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={Gradients.cosmos}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <JournalTopBar onBack={() => router.back()} />

        {!hasData ? (
          <EmptyJournal />
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            <WeekSelector label={summary.range} />

            <View style={{ marginTop: 12 }}>
              <WeeklySummaryCard
                totalPnl={summary.totalPnl}
                range={summary.range}
                winRate={summary.winRate}
                totalTrades={summary.totalTrades}
                wins={summary.wins}
                avgRR={summary.avgRR}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <EquityChart data={summary.equityCurve} />
            </View>

            <View style={{ marginTop: 16 }}>
              <HighlightCards best={summary.best} worst={summary.worst} />
            </View>

            <View style={{ marginTop: 16 }}>
              <TradeList trades={MOCK_TRADES} />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
      <BottomNav />
    </View>
  );
}

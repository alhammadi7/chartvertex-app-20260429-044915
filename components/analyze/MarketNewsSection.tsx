import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

type NewsItem = {
  id: string;
  source: string;
  sourceColor: string;
  headline: string;
  time: string;
  impact: 'high' | 'medium' | 'low';
  category: 'Forex' | 'Crypto' | 'Macro';
};

const ALL_NEWS: NewsItem[] = [
  {
    id: '1',
    source: 'ForexFactory',
    sourceColor: '#F59E0B',
    headline: 'Fed signals cautious approach to rate cuts amid persistent inflation data',
    time: '2m ago',
    impact: 'high',
    category: 'Macro',
  },
  {
    id: '2',
    source: 'Bloomberg',
    sourceColor: '#4F8EF7',
    headline: 'Bitcoin consolidates above $66K ahead of key resistance at $68K level',
    time: '5m ago',
    impact: 'medium',
    category: 'Crypto',
  },
  {
    id: '3',
    source: 'Reuters',
    sourceColor: '#F87171',
    headline: 'Gold hits fresh highs as safe-haven demand surges on geopolitical tensions',
    time: '18m ago',
    impact: 'high',
    category: 'Macro',
  },
  {
    id: '4',
    source: 'Investing',
    sourceColor: '#8B5CF6',
    headline: 'EUR/USD tests critical 1.0850 support as dollar index strengthens',
    time: '31m ago',
    impact: 'high',
    category: 'Forex',
  },
  {
    id: '5',
    source: 'ForexFactory',
    sourceColor: '#F59E0B',
    headline: 'GBP/USD bulls defend 1.2700 ahead of UK CPI data release tomorrow',
    time: '44m ago',
    impact: 'medium',
    category: 'Forex',
  },
  {
    id: '6',
    source: 'Bloomberg',
    sourceColor: '#4F8EF7',
    headline: 'Ethereum ETF inflows hit record $180M as institutional demand surges',
    time: '1h ago',
    impact: 'medium',
    category: 'Crypto',
  },
  {
    id: '7',
    source: 'Reuters',
    sourceColor: '#F87171',
    headline: 'OPEC+ maintains output cuts, crude oil prices rally toward $88',
    time: '1h ago',
    impact: 'low',
    category: 'Macro',
  },
];

const FILTERS = ['All', 'Forex', 'Crypto', 'Macro'] as const;
type Filter = (typeof FILTERS)[number];

const IMPACT_COLORS = { high: '#F87171', medium: '#F59E0B', low: '#34D399' };

export default function MarketNewsSection() {
  const [active, setActive] = useState<Filter>('All');

  const filtered =
    active === 'All' ? ALL_NEWS : ALL_NEWS.filter((news) => news.category === active);
  const visible = filtered.slice(0, 5);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text
            style={{
              color: '#8B95A8',
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Market News
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: 7,
              paddingVertical: 2,
              borderRadius: 999,
              backgroundColor: 'rgba(248,113,113,0.15)',
              borderWidth: 1,
              borderColor: 'rgba(248,113,113,0.30)',
            }}
          >
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: '#F87171' }} />
            <Text style={{ color: '#F87171', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 }}>
              LIVE
            </Text>
          </View>
        </View>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={{ color: '#4F8EF7', fontSize: 12, fontWeight: '600' }}>See all</Text>
          <Ionicons name="chevron-forward" size={12} color="#4F8EF7" />
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', gap: 8, paddingRight: 16 }}>
          {FILTERS.map((filter) => {
            const isActive = active === filter;

            return (
              <Pressable key={filter} onPress={() => setActive(filter)}>
                <View
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor: isActive ? 'rgba(79,142,247,0.18)' : 'rgba(255,255,255,0.05)',
                    borderWidth: 1,
                    borderColor: isActive ? 'rgba(79,142,247,0.50)' : 'rgba(255,255,255,0.10)',
                  }}
                >
                  <Text
                    style={{
                      color: isActive ? '#4F8EF7' : '#8B95A8',
                      fontSize: 12,
                      fontWeight: '600',
                    }}
                  >
                    {filter}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={{ gap: 8 }}>
        {visible.map((item) => (
          <Pressable key={item.id}>
            <View
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.09)',
              }}
            >
              <BlurView intensity={15} tint="dark">
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    padding: 12,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <View style={{ paddingTop: 4 }}>
                    <View
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 4,
                        backgroundColor: IMPACT_COLORS[item.impact],
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 6,
                        marginBottom: 3,
                      }}
                    >
                      <Text
                        style={{
                          color: item.sourceColor,
                          fontSize: 10,
                          fontWeight: '800',
                          letterSpacing: 0.5,
                        }}
                      >
                        {item.source}
                      </Text>
                      <Text style={{ color: '#4A5568', fontSize: 10 }}>{item.time}</Text>
                      <View
                        style={{
                          paddingHorizontal: 5,
                          paddingVertical: 1,
                          borderRadius: 4,
                          backgroundColor: 'rgba(255,255,255,0.06)',
                        }}
                      >
                        <Text style={{ color: '#8B95A8', fontSize: 9, fontWeight: '600' }}>
                          {item.category}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{ color: '#F0F4FF', fontSize: 12, lineHeight: 17, fontWeight: '500' }}
                      numberOfLines={2}
                    >
                      {item.headline}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={13} color="#4A5568" style={{ marginTop: 2 }} />
                </View>
              </BlurView>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

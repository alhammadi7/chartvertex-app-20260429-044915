import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import {
  MARKET_CATEGORIES,
  MarketCategory,
  SYMBOLS_BY_CATEGORY,
} from '@/constants/types';

type Props = {
  category: MarketCategory;
  symbol: string;
  onCategoryChange: (c: MarketCategory) => void;
  onSymbolChange: (s: string) => void;
};

const CAT_ICONS: Record<MarketCategory, string> = {
  Forex:       '💱',
  Metals:      '🥇',
  Crypto:      '₿',
  Indices:     '📈',
  Commodities: '🛢',
  Stocks:      '🏢',
};

export default function MarketCategorySelector({ category, symbol, onCategoryChange, onSymbolChange }: Props) {
  const [symbolPickerOpen, setSymbolPickerOpen] = useState(false);
  const symbols = SYMBOLS_BY_CATEGORY[category];

  const handleCategoryChange = (c: MarketCategory) => {
    onCategoryChange(c);
    onSymbolChange(SYMBOLS_BY_CATEGORY[c][0]);
  };

  return (
    <View>
      {/* Category row */}
      <Text className="text-[#8B95A8] text-[11px] font-semibold tracking-[1.5px] uppercase mb-2.5">
        Market
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
        <View className="flex-row gap-2 pr-4">
          {MARKET_CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <Pressable key={cat} onPress={() => handleCategoryChange(cat)} className="active:opacity-70">
                <View
                  className={`flex-row items-center gap-1.5 px-3.5 py-2 rounded-full border ${
                    active
                      ? 'bg-[#4F8EF7]/15 border-[#4F8EF7]/50'
                      : 'bg-white/[0.04] border-white/[0.10]'
                  }`}
                >
                  <Text className="text-xs">{CAT_ICONS[cat]}</Text>
                  <Text
                    className={`text-xs font-semibold ${active ? 'text-[#4F8EF7]' : 'text-[#8B95A8]'}`}
                  >
                    {cat}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Symbol selector */}
      <Text className="text-[#8B95A8] text-[11px] font-semibold tracking-[1.5px] uppercase mb-2.5">
        Symbol
      </Text>
      <Pressable onPress={() => setSymbolPickerOpen(true)} className="active:opacity-80">
        <View className="rounded-2xl overflow-hidden border border-white/[0.14]">
          <BlurView intensity={20} tint="dark">
            <View className="flex-row items-center justify-between px-4 py-3.5 bg-white/[0.06]">
              <View className="flex-row items-center gap-2">
                <Text className="text-base">{CAT_ICONS[category]}</Text>
                <Text className="text-[#F0F4FF] text-base font-bold tracking-wide">{symbol}</Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Text className="text-[#8B95A8] text-xs">{symbols.length} symbols</Text>
                <Ionicons name="chevron-down" size={14} color="#8B95A8" />
              </View>
            </View>
          </BlurView>
        </View>
      </Pressable>

      {/* Symbol picker modal */}
      <Modal
        visible={symbolPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setSymbolPickerOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/60"
          onPress={() => setSymbolPickerOpen(false)}
        >
          <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden border-t border-white/10">
            <BlurView intensity={60} tint="dark">
              <View className="bg-[#06080F]/90">
                {/* Handle */}
                <View className="items-center pt-3 pb-2">
                  <View className="w-10 h-1 rounded-full bg-white/20" />
                </View>

                {/* Header */}
                <View className="flex-row items-center justify-between px-5 pb-4">
                  <Text className="text-[#F0F4FF] text-base font-semibold">{category} Symbols</Text>
                  <Pressable onPress={() => setSymbolPickerOpen(false)}>
                    <Ionicons name="close" size={20} color="#8B95A8" />
                  </Pressable>
                </View>

                {/* Symbol list */}
                <FlatList
                  data={symbols}
                  keyExtractor={(s) => s}
                  style={{ maxHeight: 320 }}
                  contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                  numColumns={3}
                  columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
                  renderItem={({ item }) => {
                    const active = symbol === item;
                    return (
                      <Pressable
                        onPress={() => { onSymbolChange(item); setSymbolPickerOpen(false); }}
                        className="flex-1 active:opacity-70"
                      >
                        <View
                          className={`items-center py-3 rounded-2xl border ${
                            active
                              ? 'bg-[#4F8EF7]/20 border-[#4F8EF7]/60'
                              : 'bg-white/[0.05] border-white/[0.10]'
                          }`}
                        >
                          <Text
                            className={`text-sm font-bold ${active ? 'text-[#4F8EF7]' : 'text-[#F0F4FF]'}`}
                          >
                            {item}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  }}
                />
              </View>
            </BlurView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

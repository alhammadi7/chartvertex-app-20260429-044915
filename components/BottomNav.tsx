import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Tab = {
  label: string;
  icon: string;
  activeIcon: string;
  route: string;
};

const TABS: Tab[] = [
  {
    label: 'Analyze',
    icon: 'scan-outline',
    activeIcon: 'scan',
    route: '/(tabs)/analyze',
  },
  {
    label: 'Risk',
    icon: 'calculator-outline',
    activeIcon: 'calculator',
    route: '/(tabs)/risk',
  },
  {
    label: 'Journal',
    icon: 'journal-outline',
    activeIcon: 'journal',
    route: '/(tabs)/journal',
  },
  {
    label: 'Dashboard',
    icon: 'grid-outline',
    activeIcon: 'grid',
    route: '/(tabs)/dashboard',
  },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isActive = (route: string) => {
    const seg = route.replace('/(tabs)/', '');
    return pathname.includes(seg);
  };

  return (
    <View
      className="absolute left-4 right-4 rounded-3xl overflow-hidden border border-white/[0.12]"
      style={{
        bottom: insets.bottom + 12,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: -4 },
        elevation: 20,
      }}
    >
      <BlurView intensity={60} tint="dark">
        <View className="flex-row bg-[#06080F]/90">
          {TABS.map((tab) => {
            const active = isActive(tab.route);
            return (
              <Pressable
                key={tab.route}
                onPress={() => router.push(tab.route as any)}
                className="flex-1 items-center py-3 active:opacity-70"
              >
                <View className="relative items-center">
                  {/* Active indicator dot */}
                  {active && (
                    <View
                      className="absolute -top-1 w-1 h-1 rounded-full bg-[#4F8EF7]"
                      style={{
                        shadowColor: '#4F8EF7',
                        shadowOpacity: 0.9,
                        shadowRadius: 6,
                        shadowOffset: { width: 0, height: 0 },
                      }}
                    />
                  )}

                  <Ionicons
                    name={(active ? tab.activeIcon : tab.icon) as any}
                    size={22}
                    color={active ? '#4F8EF7' : '#4A5568'}
                    style={active ? {
                      shadowColor: '#4F8EF7',
                      shadowOpacity: 0.6,
                      shadowRadius: 8,
                      shadowOffset: { width: 0, height: 0 },
                    } : undefined}
                  />
                  <Text
                    className="text-[10px] font-semibold mt-0.5"
                    style={{ color: active ? '#4F8EF7' : '#4A5568' }}
                  >
                    {tab.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

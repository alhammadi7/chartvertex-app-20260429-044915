import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const MOCK_USER = {
  name: 'Mohamed Al Hammadi',
  email: 'mohamed@chartvertex.io',
  plan: 'Pro',
  analyses: 47,
  initials: 'MA',
};

type MenuItem = {
  icon: string;
  label: string;
  color?: string;
  danger?: boolean;
  onPress: () => void;
};

export default function ProfileModal({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();

  const menuItems: MenuItem[] = [
    {
      icon: 'star-outline',
      label: 'Rate App',
      onPress: () => {},
    },
    {
      icon: 'share-social-outline',
      label: 'Share ChartVertex',
      onPress: () => {},
    },
    {
      icon: 'chatbubble-ellipses-outline',
      label: 'Support',
      onPress: () => {},
    },
    {
      icon: 'document-text-outline',
      label: 'Terms & Privacy',
      onPress: () => {},
    },
    {
      icon: 'log-out-outline',
      label: 'Log Out',
      color: '#F87171',
      onPress: () => {
        onClose();
        Alert.alert('Log Out', 'You have been logged out.');
      },
    },
    {
      icon: 'trash-outline',
      label: 'Delete Account',
      color: '#F87171',
      danger: true,
      onPress: () => {
        Alert.alert(
          'Delete Account',
          'This action is irreversible. All your data will be permanently deleted.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => onClose() },
          ]
        );
      },
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/60"
        onPress={onClose}
      >
        <View
          className="absolute bottom-0 left-0 right-0 rounded-t-3xl overflow-hidden"
          style={{ paddingBottom: insets.bottom }}
        >
          <BlurView intensity={70} tint="dark">
            <View className="bg-[#06080F]/95">

              {/* Drag handle */}
              <View className="items-center pt-3 pb-1">
                <View className="w-10 h-1 rounded-full bg-white/20" />
              </View>

              {/* Avatar + info */}
              <View className="items-center px-6 pt-4 pb-6">
                {/* Avatar circle */}
                <View
                  className="w-20 h-20 rounded-full items-center justify-center mb-3 border-2 border-[#4F8EF7]/50"
                  style={{
                    shadowColor: '#4F8EF7',
                    shadowOpacity: 0.5,
                    shadowRadius: 16,
                    shadowOffset: { width: 0, height: 0 },
                  }}
                >
                  <View className="w-full h-full rounded-full bg-[#4F8EF7]/20 items-center justify-center">
                    <Text className="text-[#4F8EF7] text-2xl font-bold">
                      {MOCK_USER.initials}
                    </Text>
                  </View>
                </View>

                <Text className="text-[#F0F4FF] text-lg font-bold mb-0.5">
                  {MOCK_USER.name}
                </Text>
                <Text className="text-[#8B95A8] text-sm mb-4">
                  {MOCK_USER.email}
                </Text>

                {/* Plan + analyses row */}
                <View className="flex-row gap-3">
                  <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40">
                    <Ionicons name="diamond" size={12} color="#8B5CF6" />
                    <Text className="text-[#8B5CF6] text-xs font-bold">
                      {MOCK_USER.plan} Plan
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10">
                    <Ionicons name="analytics-outline" size={12} color="#8B95A8" />
                    <Text className="text-[#8B95A8] text-xs font-semibold">
                      {MOCK_USER.analyses} Analyses
                    </Text>
                  </View>
                </View>
              </View>

              {/* Divider */}
              <View className="h-px bg-white/[0.08] mx-6 mb-2" />

              {/* Menu items */}
              <ScrollView
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
              >
                {menuItems.map((item, i) => {
                  const isDivider = i === menuItems.length - 3;
                  return (
                    <View key={item.label}>
                      {isDivider && (
                        <View className="h-px bg-white/[0.08] my-2" />
                      )}
                      <Pressable
                        onPress={item.onPress}
                        className={`flex-row items-center gap-3 px-4 py-3.5 rounded-2xl mb-1 active:opacity-70 ${
                          item.danger ? 'bg-[#F87171]/[0.06]' : 'bg-white/[0.04]'
                        }`}
                      >
                        <View
                          className={`w-8 h-8 rounded-full items-center justify-center ${
                            item.danger ? 'bg-[#F87171]/15' : 'bg-white/[0.08]'
                          }`}
                        >
                          <Ionicons
                            name={item.icon as any}
                            size={16}
                            color={item.color ?? '#8B95A8'}
                          />
                        </View>
                        <Text
                          className="flex-1 text-sm font-semibold"
                          style={{ color: item.color ?? '#F0F4FF' }}
                        >
                          {item.label}
                        </Text>
                        {!item.danger && (
                          <Ionicons name="chevron-forward" size={14} color="#4A5568" />
                        )}
                      </Pressable>
                    </View>
                  );
                })}
              </ScrollView>

            </View>
          </BlurView>
        </View>
      </Pressable>
    </Modal>
  );
}

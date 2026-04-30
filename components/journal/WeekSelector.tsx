import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

type Props = {
  label: string;
};

export default function WeekSelector({ label }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 999,
          backgroundColor: Colors.glass.surface,
          borderWidth: 1,
          borderColor: Colors.glass.border,
          gap: 6,
        }}
      >
        <Ionicons name="chevron-back" size={14} color={Colors.text.muted} />
        <Text
          style={{
            color: Colors.text.primary,
            fontSize: 13,
            fontWeight: '600',
          }}
        >
          {label}
        </Text>
        <Ionicons name="chevron-forward" size={14} color={Colors.text.muted} />
      </Pressable>
    </View>
  );
}

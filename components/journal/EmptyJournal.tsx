import React from 'react';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

export default function EmptyJournal() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
      }}
    >
      <View
        style={{
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.glass.border,
        }}
      >
        <BlurView intensity={20} tint="dark">
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 40,
              paddingHorizontal: 32,
              backgroundColor: Colors.glass.surface,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: 'rgba(255,255,255,0.04)',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                borderWidth: 1,
                borderColor: Colors.glass.border,
              }}
            >
              <Ionicons name="journal-outline" size={28} color={Colors.text.muted} />
            </View>

            <Text
              style={{
                color: Colors.text.primary,
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              No trades this week
            </Text>
            <Text
              style={{
                color: Colors.text.muted,
                fontSize: 13,
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              Analyze your first chart to start building your journal.
            </Text>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

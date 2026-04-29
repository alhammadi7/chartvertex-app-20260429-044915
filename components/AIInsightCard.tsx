import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

type Props = {
  text: string;
};

const COLLAPSED_LINES = 3;

export default function AIInsightCard({ text }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <Text
        style={{
          color: Colors.text.muted,
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        AI Insight
      </Text>

      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: Colors.glass.border,
        }}
      >
        <BlurView intensity={20} tint="dark">
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.glass.surface,
            }}
          >
            {/* Accent left border */}
            <View
              style={{
                width: 3,
                backgroundColor: '#8B5CF6',
                borderRadius: 3,
              }}
            />

            <View style={{ flex: 1, padding: 16 }}>
              <Text
                numberOfLines={expanded ? undefined : COLLAPSED_LINES}
                style={{
                  color: Colors.text.primary,
                  fontSize: 13,
                  lineHeight: 20,
                  fontWeight: '400',
                }}
              >
                {text}
              </Text>

              <Pressable
                onPress={() => setExpanded((p) => !p)}
                hitSlop={8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    color: '#8B5CF6',
                    fontSize: 12,
                    fontWeight: '600',
                  }}
                >
                  {expanded ? 'Show less' : 'Read more'}
                </Text>
                <Ionicons
                  name={expanded ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color="#8B5CF6"
                />
              </Pressable>
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

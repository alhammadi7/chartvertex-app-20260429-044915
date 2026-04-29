import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { Colors } from '@/constants/theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  prefix?: string;
  suffix?: string;
  accentColor?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
};

export default function RiskInput({
  label,
  value,
  onChangeText,
  prefix,
  suffix,
  accentColor,
  keyboardType = 'default',
  editable = true,
}: Props) {
  const borderColor = accentColor ? `${accentColor}44` : Colors.glass.border;

  return (
    <View
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor,
      }}
    >
      <BlurView intensity={20} tint="dark">
        <View style={{ padding: 14, backgroundColor: Colors.glass.surface }}>
          <Text
            style={{
              color: accentColor ?? Colors.text.muted,
              fontSize: 10,
              fontWeight: '600',
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            {label}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {prefix ? <Affix text={prefix} align="right" /> : null}
            <TextInput
              value={value}
              onChangeText={onChangeText}
              editable={editable}
              keyboardType={keyboardType}
              style={{
                flex: 1,
                color: Colors.text.primary,
                fontSize: 18,
                fontWeight: '600',
                fontFamily: 'monospace',
                padding: 0,
              }}
              placeholderTextColor={Colors.text.dim}
              selectionColor={Colors.accent.primary}
            />
            {suffix ? <Affix text={suffix} align="left" /> : null}
          </View>
        </View>
      </BlurView>
    </View>
  );
}

function Affix({ text, align }: { text: string; align: 'left' | 'right' }) {
  return (
    <Text
      style={{
        color: Colors.text.muted,
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'monospace',
        marginLeft: align === 'left' ? 2 : 0,
        marginRight: align === 'right' ? 2 : 0,
      }}
    >
      {text}
    </Text>
  );
}

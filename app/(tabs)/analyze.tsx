import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import AnalysisModeSelector from '@/components/analyze/AnalysisModeSelector';
import MarketCategorySelector from '@/components/analyze/MarketCategorySelector';
import MarketNewsSection from '@/components/analyze/MarketNewsSection';
import ResultPreviewCard, {
  AnalysisPreview,
} from '@/components/analyze/ResultPreviewCard';
import RunAnalysisButton from '@/components/analyze/RunAnalysisButton';
import TimeframeSelector from '@/components/analyze/TimeframeSelector';
import TradingViewCard from '@/components/analyze/TradingViewCard';
import UploadFallback from '@/components/analyze/UploadFallback';
import GlassTopBar from '@/components/GlassTopBar';
import ProfileModal from '@/components/ProfileModal';
import { AnalysisOutput } from '@/ai/types';
import { Gradients } from '@/constants/theme';
import { AnalysisMode, MarketCategory, Timeframe } from '@/constants/types';
import { useAnalyzeChart } from '@/hooks/useAnalyzeChart';

export default function AnalyzeScreen() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [imageLabel, setImageLabel] = useState('');
  const [mode, setMode] = useState<AnalysisMode>('Intraday');
  const [category, setCategory] = useState<MarketCategory>('Crypto');
  const [symbol, setSymbol] = useState('BTCUSD');
  const [timeframe, setTimeframe] = useState<Timeframe>('4H');
  const [profileVisible, setProfileVisible] = useState(false);
  const {
    analyze,
    loading: aiLoading,
    result: aiResult,
    error: aiError,
    provider,
  } = useAnalyzeChart();

  const result = aiResult ? mapAnalysisOutput(aiResult) : null;

  const pickImage = async (source: 'camera' | 'gallery') => {
    try {
      const perm =
        source === 'camera'
          ? await ImagePicker.requestCameraPermissionsAsync()
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!perm.granted) return;

      const opts: ImagePicker.ImagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
        allowsEditing: false,
      };

      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync(opts)
          : await ImagePicker.launchImageLibraryAsync(opts);

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        const name = asset.fileName ?? 'chart.jpg';

        setImage(asset.uri);
        setImageLabel(name.length > 14 ? `${name.slice(0, 14)}...` : name);
      }
    } catch (err) {
      console.warn('Image pick failed:', err);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;

    analyze({
      imageUri: image,
      symbol,
      timeframe,
      analysisMode: mode,
      marketCategory: category,
    });
  };

  return (
    <View className="flex-1 bg-[#06080F]">
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={Gradients.cosmos}
        locations={[0, 0.5, 1]}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        <GlassTopBar onProfilePress={() => setProfileVisible(true)} />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-[#F0F4FF] text-xl font-bold mb-1">
            AI Chart Analysis
          </Text>
          <Text className="text-[#8B95A8] text-sm mb-4">
            AI-powered chart analysis for smarter trading decisions
          </Text>

          <View className="mb-4">
            <TradingViewCard
              symbol={symbol}
              timeframe={timeframe}
              imageUri={image}
            />
          </View>

          <View className="mb-3 items-center">
            <RunAnalysisButton
              enabled={!!image}
              loading={aiLoading}
              onPress={handleAnalyze}
            />
            {!aiLoading ? (
              <View className="mt-3 items-center gap-1">
                <Text className="text-[#4A5568] text-xs font-medium">
                  AI will analyze:
                </Text>
                <Text className="text-[#4A5568] text-xs text-center leading-5">
                  Market Structure - Support & Resistance - Trade Setup
                </Text>
              </View>
            ) : null}
          </View>

          <View className="mb-5">
            <UploadFallback
              onPick={pickImage}
              hasImage={!!image}
              imageLabel={imageLabel}
            />
          </View>

          <View className="mb-5">
            <AnalysisModeSelector value={mode} onChange={setMode} />
          </View>

          <View className="mb-5">
            <MarketCategorySelector
              category={category}
              symbol={symbol}
              onCategoryChange={setCategory}
              onSymbolChange={setSymbol}
            />
          </View>

          <View className="mb-5">
            <TimeframeSelector value={timeframe} onChange={setTimeframe} />
          </View>

          <View className="mb-6">
            <MarketNewsSection />
          </View>

          {aiError ? (
            <View className="mb-5 rounded-2xl overflow-hidden border border-[#F87171]/30 bg-[#F87171]/[0.06] p-4">
              <Text className="text-[#F87171] text-sm font-semibold text-center">
                {aiError}
              </Text>
            </View>
          ) : null}

          {result ? (
            <View className="mb-6">
              {provider ? (
                <Text className="text-[#4A5568] text-[10px] font-semibold text-center mb-2 uppercase tracking-widest">
                  Analyzed by {provider}
                </Text>
              ) : null}
              <ResultPreviewCard
                data={result}
                onViewReport={() =>
                  router.push({
                    pathname: '/(tabs)/report',
                    params: {
                      symbol,
                      timeframe,
                    },
                  })
                }
              />
            </View>
          ) : null}
        </ScrollView>

      </SafeAreaView>
      <ProfileModal
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
      />
    </View>
  );
}

function mapAnalysisOutput(output: AnalysisOutput): AnalysisPreview {
  return {
    bias: output.bias,
    confidence: output.confidence,
    confidenceLabel: output.probabilityLabel,
    support: output.support,
    resistance: output.resistance,
    entry: output.entry,
    sl: output.stopLoss,
    tp: output.takeProfit,
    rr: output.riskReward,
    explanation: output.aiRecommendation,
    riskSummary: output.riskPlan,
  };
}

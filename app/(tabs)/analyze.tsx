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
import BottomNav from '@/components/BottomNav';
import GlassTopBar from '@/components/GlassTopBar';
import ProfileModal from '@/components/ProfileModal';
import { Gradients } from '@/constants/theme';
import { AnalysisMode, MarketCategory, Timeframe } from '@/constants/types';

export default function AnalyzeScreen() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [imageLabel, setImageLabel] = useState('');
  const [mode, setMode] = useState<AnalysisMode>('Intraday');
  const [category, setCategory] = useState<MarketCategory>('Crypto');
  const [symbol, setSymbol] = useState('BTCUSD');
  const [timeframe, setTimeframe] = useState<Timeframe>('4H');
  const [loading, setLoading] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [result, setResult] = useState<AnalysisPreview | null>(null);
  const [error, setError] = useState(false);

  const mockResult: AnalysisPreview = {
    bias: 'Bullish',
    confidence: 78,
    confidenceLabel: 'High',
    support: '65,800',
    resistance: '68,000',
    riskSummary:
      'Valid BOS above 65,800. Entry near 66,200 with SL at 65,100. Targets at 67,500 / 68,800. R:R 1:2.8.',
  };

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

    setError(false);
    setResult(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(mockResult);
    }, 3600);
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
            paddingBottom: 160,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-[#F0F4FF] text-xl font-bold mb-1">
            AI Chart Analysis
          </Text>
          <Text className="text-[#8B95A8] text-sm mb-4">
            Upload your chart and configure trade parameters
          </Text>

          <View className="mb-4">
            <TradingViewCard
              symbol={symbol}
              timeframe={timeframe}
              imageUri={image}
            />
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

          {error ? (
            <View className="mb-5 rounded-2xl overflow-hidden border border-[#F87171]/30 bg-[#F87171]/[0.06] p-4">
              <Text className="text-[#F87171] text-sm font-semibold text-center">
                Analysis failed. Please try again.
              </Text>
            </View>
          ) : null}

          {result ? (
            <View className="mb-6">
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

        <View className="absolute bottom-8 left-4 right-4">
          <RunAnalysisButton
            enabled={!!image}
            loading={loading}
            onPress={handleAnalyze}
          />
        </View>
      </SafeAreaView>

      <BottomNav />
      <ProfileModal
        visible={profileVisible}
        onClose={() => setProfileVisible(false)}
      />
    </View>
  );
}

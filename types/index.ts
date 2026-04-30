export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';
export type AssetClass = 'Forex' | 'Stocks' | 'Crypto' | 'Commodities' | 'Indices';
export type Timeframe = '1M' | '5M' | '15M' | '1H' | '4H' | 'Daily' | 'Weekly';
export type Strategy =
  | 'Smart Money Concepts'
  | 'Pure Price Action'
  | 'Indicator-Based Analysis'
  | 'Top-Down Analysis';
export type SetupGrade = 'A+' | 'A' | 'B' | 'Low Probability';
export type Verdict = 'Enter' | 'Wait' | 'Avoid';

export interface RiskSettings {
  accountBalance: string;
  riskPercentage: string;
  entryPrice: string;
}

export interface AnalysisInput {
  assetClass: AssetClass;
  symbol: string;
  timeframe: Timeframe;
  strategy: Strategy;
  riskSettings: RiskSettings;
  images: File[];
}

export interface AnalysisResult {
  marketBias: 'Bullish' | 'Bearish' | 'Neutral';
  entryZone: string;
  stopLoss: string;
  tp1: string;
  tp2: string;
  tp3: string;
  riskReward: string;
  setupGrade: SetupGrade;
  verdict: Verdict;
  confidence: number;
  keyLevels: string[];
  liquidityZones: string[];
  reasoning: string;
  positionSize?: string;
  riskAmount?: string;
}

export interface AIAnalysisResult {
  provider: 'anthropic' | 'openai';
  bias: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number;
  probabilityLabel: 'High' | 'Medium' | 'Low';
  support: string;
  resistance: string;
  entry: string;
  stopLoss: string;
  takeProfit: string;
  riskReward: string;
  marketStructure: string;
  liquidity: string;
  riskPlan: string;
  aiRecommendation: string;
  disclaimer: string;
}

export type Bias = 'long' | 'short' | 'neutral' | null;

export type Timeframe =
  | '1m'
  | '5m'
  | '15m'
  | '30m'
  | '1H'
  | '4H'
  | 'D'
  | '1D'
  | '1W'
  | '1M';

export const TIMEFRAMES: Timeframe[] = [
  '1m',
  '5m',
  '15m',
  '30m',
  '1H',
  '4H',
  'D',
  '1D',
  '1W',
  '1M',
];

export type AnalysisMode = 'Scalping' | 'Intraday' | 'Swing' | 'Position';

export const ANALYSIS_MODES: AnalysisMode[] = [
  'Scalping',
  'Intraday',
  'Swing',
  'Position',
];

export type MarketCategory =
  | 'Forex'
  | 'Metals'
  | 'Crypto'
  | 'Indices'
  | 'Commodities'
  | 'Stocks';

export const MARKET_CATEGORIES: MarketCategory[] = [
  'Forex',
  'Metals',
  'Crypto',
  'Indices',
  'Commodities',
  'Stocks',
];

export const SYMBOLS_BY_CATEGORY: Record<MarketCategory, string[]> = {
  Forex: [
    'EURUSD',
    'GBPUSD',
    'USDJPY',
    'USDCHF',
    'USDCAD',
    'AUDUSD',
    'NZDUSD',
    'EURJPY',
    'GBPJPY',
    'EURGBP',
    'AUDJPY',
    'CADJPY',
  ],
  Metals: ['XAUUSD', 'XAGUSD'],
  Crypto: [
    'BTCUSD',
    'ETHUSD',
    'SOLUSD',
    'XRPUSD',
    'BNBUSD',
    'ADAUSD',
    'DOGEUSD',
    'AVAXUSD',
    'LINKUSD',
    'TONUSD',
  ],
  Indices: ['US30', 'US100', 'US500', 'GER40', 'UK100', 'JP225'],
  Commodities: ['WTI', 'BRENT', 'NATGAS'],
  Stocks: ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'META', 'GOOGL', 'AMD'],
};

export const PAIRS = [
  'BTC/USDT',
  'ETH/USDT',
  'SOL/USDT',
  'XAU/USD',
  'EUR/USD',
  'GBP/USD',
  'BTCUSD',
  'ETHUSD',
  'EURUSD',
  'XAUUSD',
];

export type PriceLevel = {
  label: string;
  price: number;
  type: 'entry' | 'sl' | 'tp';
};

export type AnalysisResult = {
  trend: 'bullish' | 'bearish';
  confidence: number;
  structure: string;
  timeframe: Timeframe;
  pair: string;
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
  insight: string;
  levels: PriceLevel[];
};

import type { AnalysisInput, AnalysisResult, SetupGrade, Verdict } from '@/types';

function randomBetween(min: number, max: number, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const reasoningTemplates = {
  'Smart Money Concepts': [
    'Price has swept the buy-side liquidity above the recent swing high and returned to an imbalance zone. Order block identified at the entry zone with strong displacement. The internal range shows a clear shift of character confirming directional bias. Mitigation of the OB is expected before continuation.',
    'Bearish order block mitigated at the key supply zone. Fair value gap (FVG) present below current price acting as a magnet. Stop hunts confirmed on lower timeframe. Institutional footprint visible with large volume absorption at the identified level.',
  ],
  'Pure Price Action': [
    'Clean pin bar rejection at a confluence of a previous resistance-turned-support level and the 50% retracement of the last impulse leg. Structure remains intact. The setup offers a favorable risk-to-reward ratio with the stop placed safely below the wick.',
    'Inside bar breakout on the higher timeframe with momentum confirmation. Market is respecting the ascending channel structure. Entry at the retrace of the breakout candle provides optimal placement.',
  ],
  'Indicator-Based Analysis': [
    'RSI divergence confirmed on the 4H timeframe with price forming a higher low while RSI prints a lower low — classic bullish hidden divergence. MACD crossover aligned. 200 EMA acting as dynamic support. Volume increasing on the upside.',
    'Price crossing above the 50 and 200 EMA with a golden cross forming. Bollinger Bands expanding, signaling momentum. Stochastic exiting oversold territory. All indicators aligned for a continuation move.',
  ],
  'Top-Down Analysis': [
    'Weekly timeframe shows a strong bullish structure with higher highs and higher lows. Daily has pulled back into a key demand zone. On the 4H, a bullish engulfing pattern confirms entry. The top-down confluence across three timeframes strengthens the probability of this setup.',
    'Monthly resistance acting as a ceiling. Weekly shows bearish pressure building with lower highs. Daily confirms the trend with a breakdown of structure. Entry on 4H retrace to the breakdown level offers a high-conviction short.',
  ],
};

export function runMockAnalysis(input: AnalysisInput): AnalysisResult {
  const { assetClass, symbol, timeframe, strategy, riskSettings } = input;

  // Seed logic based on inputs for consistency within a session
  const seed = symbol.length + timeframe.length + strategy.length;
  const isBullish = seed % 3 !== 0;
  const bias = seed % 3 === 2 ? 'Neutral' : isBullish ? 'Bullish' : 'Bearish';

  // Price base per asset class
  const priceBase: Record<string, number> = {
    Forex: 1.08,
    Stocks: 185,
    Crypto: 42000,
    Commodities: 1920,
    Indices: 5200,
  };
  const base = parseFloat(riskSettings.entryPrice) || priceBase[assetClass] || 100;
  const pip = base * 0.001;

  const entry = base;
  const sl = isBullish ? base - pip * randomBetween(8, 15) : base + pip * randomBetween(8, 15);
  const risk = Math.abs(entry - sl);
  const tp1 = isBullish ? base + risk * 1.5 : base - risk * 1.5;
  const tp2 = isBullish ? base + risk * 2.5 : base - risk * 2.5;
  const tp3 = isBullish ? base + risk * 4.0 : base - risk * 4.0;

  const rrRaw = ((Math.abs(tp2 - entry) / risk)).toFixed(1);
  const rr = `1 : ${rrRaw}`;

  // Grade logic
  const gradeOptions: SetupGrade[] = ['A+', 'A', 'A', 'B', 'B', 'Low Probability'];
  const gradeIndex = (seed + timeframe.length) % gradeOptions.length;
  const setupGrade = gradeOptions[gradeIndex];

  // Verdict
  const verdict: Verdict =
    setupGrade === 'A+' || setupGrade === 'A' ? 'Enter' : setupGrade === 'B' ? 'Wait' : 'Avoid';

  // Confidence
  const confidenceMap: Record<SetupGrade, number> = {
    'A+': randomBetween(85, 94, 0),
    A: randomBetween(72, 84, 0),
    B: randomBetween(55, 70, 0),
    'Low Probability': randomBetween(30, 54, 0),
  };
  const confidence = confidenceMap[setupGrade];

  // Key levels
  const keyLevels = [
    `${(base * 0.995).toFixed(assetClass === 'Crypto' ? 0 : 4)} — Support`,
    `${(base * 1.005).toFixed(assetClass === 'Crypto' ? 0 : 4)} — Resistance`,
    `${(base * 0.985).toFixed(assetClass === 'Crypto' ? 0 : 4)} — Major Support`,
  ];

  const liquidityZones = [
    `${(isBullish ? base * 1.008 : base * 0.992).toFixed(assetClass === 'Crypto' ? 0 : 4)} — Buy-Side Liquidity`,
    `${(isBullish ? base * 0.992 : base * 1.008).toFixed(assetClass === 'Crypto' ? 0 : 4)} — Sell-Side Liquidity`,
  ];

  // Position size
  let positionSize: string | undefined;
  let riskAmount: string | undefined;
  if (riskSettings.accountBalance && riskSettings.riskPercentage) {
    const bal = parseFloat(riskSettings.accountBalance);
    const riskPct = parseFloat(riskSettings.riskPercentage);
    if (!isNaN(bal) && !isNaN(riskPct)) {
      const ra = (bal * riskPct) / 100;
      riskAmount = `$${ra.toFixed(2)}`;
      const ps = ra / (Math.abs(entry - sl) * (assetClass === 'Forex' ? 100000 : 1));
      positionSize = assetClass === 'Forex' ? `${ps.toFixed(2)} lots` : `${ps.toFixed(4)} units`;
    }
  }

  const reasoningArr = reasoningTemplates[strategy] || reasoningTemplates['Pure Price Action'];
  const reasoning = pickRandom(reasoningArr);

  const fmt = (n: number) =>
    assetClass === 'Crypto' ? n.toFixed(0) : assetClass === 'Forex' ? n.toFixed(5) : n.toFixed(2);

  return {
    marketBias: bias,
    entryZone: `${fmt(entry * 0.999)} – ${fmt(entry * 1.001)}`,
    stopLoss: fmt(sl),
    tp1: fmt(tp1),
    tp2: fmt(tp2),
    tp3: fmt(tp3),
    riskReward: rr,
    setupGrade,
    verdict,
    confidence,
    keyLevels,
    liquidityZones,
    reasoning,
    positionSize,
    riskAmount,
  };
}

import { AnalysisResult, Timeframe } from './types';

export type TradeRecord = {
  id: string;
  pair: string;
  timeframe: Timeframe;
  bias: 'long' | 'short';
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
  outcome: 'tp1' | 'tp2' | 'tp3' | 'sl';
  pnl: number;
  rr: number;
  date: string; // ISO
  balance: number;
  riskPct: number;
};

export type WeekSummary = {
  label: string;
  range: string;
  totalPnl: number;
  winRate: number;
  totalTrades: number;
  wins: number;
  avgRR: number;
  equityCurve: number[];
  best: TradeRecord | null;
  worst: TradeRecord | null;
};

export const MOCK_TRADES: TradeRecord[] = [
  {
    id: 't1',
    pair: 'BTC/USDT',
    timeframe: '4H',
    bias: 'long',
    entry: 66200,
    sl: 65100,
    tp1: 67500,
    tp2: 68800,
    tp3: 69420,
    outcome: 'tp2',
    pnl: 420,
    rr: 4.2,
    date: '2026-04-28T10:00:00Z',
    balance: 5000,
    riskPct: 3,
  },
  {
    id: 't2',
    pair: 'ETH/USDT',
    timeframe: '1H',
    bias: 'long',
    entry: 3280,
    sl: 3240,
    tp1: 3340,
    tp2: 3380,
    tp3: 3420,
    outcome: 'tp1',
    pnl: 195,
    rr: 1.5,
    date: '2026-04-27T14:30:00Z',
    balance: 5420,
    riskPct: 2,
  },
  {
    id: 't3',
    pair: 'EUR/USD',
    timeframe: '1H',
    bias: 'short',
    entry: 1.0842,
    sl: 1.089,
    tp1: 1.079,
    tp2: 1.075,
    tp3: 1.072,
    outcome: 'sl',
    pnl: -85,
    rr: 0.8,
    date: '2026-04-26T09:15:00Z',
    balance: 5615,
    riskPct: 2,
  },
  {
    id: 't4',
    pair: 'SOL/USDT',
    timeframe: '4H',
    bias: 'long',
    entry: 148.5,
    sl: 145.0,
    tp1: 153.0,
    tp2: 156.5,
    tp3: 160.0,
    outcome: 'tp1',
    pnl: 310,
    rr: 1.3,
    date: '2026-04-25T16:00:00Z',
    balance: 5530,
    riskPct: 3,
  },
  {
    id: 't5',
    pair: 'XAU/USD',
    timeframe: '4H',
    bias: 'long',
    entry: 2340,
    sl: 2325,
    tp1: 2360,
    tp2: 2375,
    tp3: 2390,
    outcome: 'tp2',
    pnl: 287.5,
    rr: 2.3,
    date: '2026-04-24T11:00:00Z',
    balance: 5220,
    riskPct: 3,
  },
  {
    id: 't6',
    pair: 'GBP/USD',
    timeframe: '1H',
    bias: 'short',
    entry: 1.293,
    sl: 1.297,
    tp1: 1.288,
    tp2: 1.284,
    tp3: 1.28,
    outcome: 'sl',
    pnl: -60,
    rr: 0.6,
    date: '2026-04-23T08:45:00Z',
    balance: 5280,
    riskPct: 1,
  },
  {
    id: 't7',
    pair: 'BTC/USDT',
    timeframe: '4H',
    bias: 'long',
    entry: 64800,
    sl: 63900,
    tp1: 66000,
    tp2: 67200,
    tp3: 68000,
    outcome: 'tp1',
    pnl: 180,
    rr: 1.3,
    date: '2026-04-22T13:30:00Z',
    balance: 5340,
    riskPct: 2,
  },
];

export function getWeekSummary(trades: TradeRecord[]): WeekSummary {
  const wins = trades.filter((t) => t.pnl > 0);
  const totalPnl = trades.reduce((s, t) => s + t.pnl, 0);
  const avgRR =
    trades.length > 0
      ? trades.reduce((s, t) => s + t.rr, 0) / trades.length
      : 0;

  const sorted = [...trades].sort((a, b) => a.pnl - b.pnl);
  const best = sorted.length > 0 ? sorted[sorted.length - 1] : null;
  const worst = sorted.length > 0 ? sorted[0] : null;

  // Build equity curve (cumulative P/L per trade, chronological)
  const chronological = [...trades].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  let cumulative = 0;
  const equityCurve = chronological.map((t) => {
    cumulative += t.pnl;
    return cumulative;
  });

  return {
    label: 'This Week',
    range: 'Apr 21 - Apr 28',
    totalPnl,
    winRate: trades.length > 0 ? (wins.length / trades.length) * 100 : 0,
    totalTrades: trades.length,
    wins: wins.length,
    avgRR,
    equityCurve,
    best,
    worst,
  };
}

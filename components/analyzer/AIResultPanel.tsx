'use client';
import type { AIAnalysisResult } from '@/types';

interface AIResultPanelProps {
  result: AIAnalysisResult;
  symbol: string;
}

function Box({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="cv-card p-3 flex flex-col gap-1">
      <span className="cv-label" style={{ marginBottom: 0 }}>{label}</span>
      <span className="font-display font-bold text-sm" style={{ color: color || 'var(--cv-text)' }}>
        {value}
      </span>
    </div>
  );
}

export default function AIResultPanel({ result, symbol }: AIResultPanelProps) {
  const biasColor = result.bias === 'Bullish' ? 'var(--cv-green)' : result.bias === 'Bearish' ? 'var(--cv-red)' : 'var(--cv-amber)';
  const confColor = result.confidence >= 70 ? '#10b981' : result.confidence >= 45 ? '#f59e0b' : '#ef4444';
  const probColor = result.probabilityLabel === 'High' ? '#10b981' : result.probabilityLabel === 'Medium' ? '#f59e0b' : '#ef4444';
  const providerColor = result.provider === 'anthropic' ? '#c084fc' : '#34d399';

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Provider badge */}
      <div className="flex items-center gap-2">
        <span className="badge text-xs" style={{ background: 'var(--cv-surface2)', color: providerColor, border: `1px solid ${providerColor}30` }}>
          ● ChartVertex AI · via {result.provider === 'anthropic' ? 'Primary Engine' : 'Fallback Engine'}
        </span>
        <span className="badge text-xs" style={{ background: 'var(--cv-surface2)', color: probColor, border: `1px solid ${probColor}30` }}>
          {result.probabilityLabel} Probability
        </span>
      </div>

      {/* Key metrics row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Box label="Market Bias" value={result.bias} color={biasColor} />
        <Box label="Entry Zone" value={result.entry} />
        <Box label="Stop Loss" value={result.stopLoss} color="var(--cv-red)" />
        <Box label="Risk : Reward" value={result.riskReward} />
      </div>

      {/* Support / Resistance / TP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Box label="Support" value={result.support} color="var(--cv-green)" />
        <Box label="Resistance" value={result.resistance} color="var(--cv-red)" />
        <Box label="Take Profit" value={result.takeProfit} color="var(--cv-green)" />
      </div>

      {/* Confidence bar */}
      <div className="cv-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="cv-label" style={{ marginBottom: 0 }}>Confidence</span>
          <span className="font-mono font-bold text-sm" style={{ color: confColor }}>{result.confidence}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'var(--cv-border2)' }}>
          <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${result.confidence}%`, background: confColor }} />
        </div>
      </div>

      {/* Market Structure */}
      <div className="cv-card p-4">
        <h4 className="cv-label mb-2">Market Structure</h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{result.marketStructure}</p>
      </div>

      {/* Liquidity */}
      <div className="cv-card p-4">
        <h4 className="cv-label mb-2">Liquidity Zones</h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{result.liquidity}</p>
      </div>

      {/* AI Recommendation */}
      <div className="rounded-xl p-4" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
        <h4 className="cv-label mb-2" style={{ color: 'var(--cv-accent2)' }}>AI Recommendation — {symbol}</h4>
        <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--cv-text)' }}>{result.aiRecommendation}</p>
      </div>

      {/* Risk Plan */}
      <div className="cv-card p-4">
        <h4 className="cv-label mb-2">Risk Plan</h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{result.riskPlan}</p>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl p-4 text-xs leading-relaxed" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#fca5a5' }}>
        ⚠️ {result.disclaimer}
      </div>
    </div>
  );
}

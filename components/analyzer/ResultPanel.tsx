'use client';
import { useApp } from '@/context/AppContext';
import type { AnalysisResult } from '@/types';

interface ResultPanelProps {
  result: AnalysisResult;
}

function MetricBox({ label, value, className }: { label: string; value: string | number; className?: string }) {
  return (
    <div className="cv-card p-3 flex flex-col gap-1">
      <span className="cv-label" style={{ marginBottom: 0 }}>{label}</span>
      <span className={`font-display font-bold text-base ${className || ''}`} style={{ color: className ? undefined : 'var(--cv-text)' }}>
        {value}
      </span>
    </div>
  );
}

export default function ResultPanel({ result }: ResultPanelProps) {
  const { t } = useApp();

  const gradeClass = result.setupGrade === 'A+' ? 'grade-aplus' : result.setupGrade === 'A' ? 'grade-a' : result.setupGrade === 'B' ? 'grade-b' : 'grade-low';
  const verdictClass = result.verdict === 'Enter' ? 'verdict-enter' : result.verdict === 'Wait' ? 'verdict-wait' : 'verdict-avoid';
  const biasClass = result.marketBias === 'Bullish' ? 'bias-bullish' : result.marketBias === 'Bearish' ? 'bias-bearish' : 'bias-neutral';

  const confColor = result.confidence >= 75 ? '#10b981' : result.confidence >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Header metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricBox label={t.dashboard.marketBias} value={result.marketBias} className={biasClass} />
        <MetricBox label={t.dashboard.grade} value={result.setupGrade} className={gradeClass} />
        <div className="cv-card p-3 flex flex-col gap-1 col-span-2 sm:col-span-1">
          <span className="cv-label" style={{ marginBottom: 0 }}>{t.dashboard.verdict}</span>
          <span className={`font-display font-bold text-base ${verdictClass}`}>{result.verdict}</span>
        </div>
        {/* Confidence */}
        <div className="cv-card p-3 flex flex-col gap-2">
          <span className="cv-label" style={{ marginBottom: 0 }}>{t.dashboard.confidence}</span>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--cv-border2)' }}>
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${result.confidence}%`, background: confColor }} />
            </div>
            <span className="font-mono text-sm font-bold" style={{ color: confColor }}>{result.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Trade levels */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricBox label={t.dashboard.entryZone} value={result.entryZone} />
        <MetricBox label={t.dashboard.stopLoss} value={result.stopLoss} className="bias-bearish" />
        <MetricBox label={t.dashboard.tp1} value={result.tp1} className="bias-bullish" />
        <MetricBox label={t.dashboard.rr} value={result.riskReward} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <MetricBox label={t.dashboard.tp2} value={result.tp2} className="bias-bullish" />
        <MetricBox label={t.dashboard.tp3} value={result.tp3} className="bias-bullish" />
        {result.riskAmount && result.positionSize && (
          <div className="cv-card p-3 flex flex-col gap-1">
            <span className="cv-label" style={{ marginBottom: 0 }}>{t.dashboard.riskAmount}</span>
            <span className="font-display font-bold text-sm" style={{ color: 'var(--cv-text)' }}>{result.riskAmount}</span>
            <span className="text-xs" style={{ color: 'var(--cv-text3)' }}>{result.positionSize}</span>
          </div>
        )}
      </div>

      {/* Key levels & liquidity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="cv-card p-4">
          <h4 className="cv-label mb-3">{t.dashboard.keyLevels}</h4>
          <ul className="space-y-1.5">
            {result.keyLevels.map((l, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-mono" style={{ color: 'var(--cv-text2)' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--cv-accent)' }} />
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div className="cv-card p-4">
          <h4 className="cv-label mb-3">{t.dashboard.liquidity}</h4>
          <ul className="space-y-1.5">
            {result.liquidityZones.map((l, i) => (
              <li key={i} className="flex items-center gap-2 text-sm font-mono" style={{ color: 'var(--cv-text2)' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--cv-purple)' }} />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reasoning */}
      <div className="cv-card p-4">
        <h4 className="cv-label mb-3">{t.dashboard.reasoning}</h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{result.reasoning}</p>
      </div>

      {/* Risk disclaimer */}
      <div className="rounded-xl p-4 text-xs leading-relaxed" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#fca5a5' }}>
        ⚠️ This analysis is generated for educational purposes only and does not constitute financial advice. Trading carries significant risk of loss. Always conduct your own due diligence.
      </div>
    </div>
  );
}

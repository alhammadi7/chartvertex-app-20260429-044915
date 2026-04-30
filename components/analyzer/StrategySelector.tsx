'use client';
import { useApp } from '@/context/AppContext';
import type { Strategy } from '@/types';

const strategies: Strategy[] = [
  'Smart Money Concepts',
  'Pure Price Action',
  'Indicator-Based Analysis',
  'Top-Down Analysis',
];

interface StrategySelectorProps {
  value: Strategy;
  onChange: (s: Strategy) => void;
}

export default function StrategySelector({ value, onChange }: StrategySelectorProps) {
  const { t } = useApp();
  return (
    <div>
      <label className="cv-label">{t.dashboard.strategy}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {strategies.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className="px-3 py-2.5 rounded-lg text-sm font-medium text-start transition-all"
            style={{
              background: value === s ? 'var(--cv-accent-glow)' : 'var(--cv-surface2)',
              border: `1px solid ${value === s ? 'var(--cv-accent)' : 'var(--cv-border)'}`,
              color: value === s ? 'var(--cv-accent2)' : 'var(--cv-text2)',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useApp } from '@/context/AppContext';
import type { RiskSettings } from '@/types';

interface RiskSettingsProps {
  values: RiskSettings;
  onChange: (v: RiskSettings) => void;
}

export default function RiskSettingsPanel({ values, onChange }: RiskSettingsProps) {
  const { t } = useApp();
  const update = (k: keyof RiskSettings) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...values, [k]: e.target.value });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className="cv-label">{t.dashboard.accountBalance}</label>
        <input className="cv-input" type="number" placeholder="10000" value={values.accountBalance} onChange={update('accountBalance')} />
      </div>
      <div>
        <label className="cv-label">{t.dashboard.riskPercentage}</label>
        <input className="cv-input" type="number" placeholder="1" min="0.1" max="10" step="0.1" value={values.riskPercentage} onChange={update('riskPercentage')} />
      </div>
      <div>
        <label className="cv-label">{t.dashboard.entryPrice}</label>
        <input className="cv-input" type="number" placeholder="0.00" value={values.entryPrice} onChange={update('entryPrice')} />
      </div>
    </div>
  );
}

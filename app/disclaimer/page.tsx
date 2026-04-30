'use client';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { useApp } from '@/context/AppContext';

export default function DisclaimerPage() {
  const { t } = useApp();
  return (
    <LegalPageLayout title={t.disclaimer2.title}>
      <div className="space-y-6">
        <div className="rounded-xl p-5" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
          <p className="font-semibold text-base mb-2" style={{ color: '#fca5a5' }}>⚠️ Important Risk Warning</p>
          <p className="text-sm leading-relaxed" style={{ color: '#fca5a5' }}>
            Trading financial instruments involves a high level of risk and may not be suitable for all investors. You could lose some or all of your invested capital. Do not trade with money you cannot afford to lose.
          </p>
        </div>

        {[
          { title: 'Educational Purpose Only', body: 'All analysis, signals, trade setups, grades, verdicts, and recommendations provided by ChartVertex AI are strictly for educational and informational purposes. They do not constitute financial, investment, or trading advice of any kind.' },
          { title: 'No Guarantee of Results', body: 'Past performance of any analysis, trade setup, or strategy does not guarantee future results. Markets are inherently unpredictable. Any analysis shown may not reflect actual market conditions at the time of your trade.' },
          { title: 'Use of ChartVertex AI', body: 'ChartVertex AI generates structured analysis based on common technical analysis methodologies. It does not have access to real-time market data and its outputs should not be treated as real-time signals. Always verify current market conditions independently.' },
          { title: 'Risk Management Responsibility', body: 'You are solely responsible for your own risk management, position sizing, and trading decisions. ChartVertex provides risk calculation tools for educational purposes only. Calculated position sizes and risk amounts are estimates and may not reflect actual broker requirements.' },
          { title: 'Regulatory Compliance', body: 'Trading financial instruments may be regulated in your jurisdiction. It is your responsibility to ensure that your trading activities comply with all applicable laws and regulations in your country of residence.' },
          { title: 'Independent Verification', body: 'Before acting on any analysis from ChartVertex, you should independently verify the information and, where appropriate, seek independent professional advice from a licensed financial advisor.' },
          { title: 'No Liability', body: 'ChartVertex, its creators, and affiliates accept no responsibility or liability for any losses incurred as a result of using this platform or acting on any analysis provided. All trading decisions are made entirely at your own risk.' },
        ].map((s) => (
          <div key={s.title} className="cv-card p-5">
            <h3 className="font-display font-semibold text-base mb-2" style={{ color: 'var(--cv-text)' }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{s.body}</p>
          </div>
        ))}

        <p className="text-xs text-center" style={{ color: 'var(--cv-text3)' }}>
          By using ChartVertex, you confirm that you have read, understood, and accepted this risk disclaimer in full.
        </p>
      </div>
    </LegalPageLayout>
  );
}

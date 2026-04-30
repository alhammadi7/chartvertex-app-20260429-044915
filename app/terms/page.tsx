'use client';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { useApp } from '@/context/AppContext';

const sections = [
  { title: '1. Acceptance of Terms', body: 'By accessing and using ChartVertex ("the Platform"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Platform. We reserve the right to modify these terms at any time without prior notice.' },
  { title: '2. Description of Service', body: 'ChartVertex provides educational chart analysis tools powered by ChartVertex AI. All analysis, signals, setups, and recommendations provided are strictly for educational and informational purposes only. ChartVertex is not a licensed financial advisor, broker, or investment service.' },
  { title: '3. No Financial Advice', body: 'Nothing on this Platform constitutes financial, investment, trading, or any other type of advice. You should not rely on any information on this Platform as a substitute for professional financial advice. Always consult a qualified financial professional before making any trading decisions.' },
  { title: '4. Risk Acknowledgment', body: 'Trading financial instruments — including Forex, Stocks, Cryptocurrencies, Commodities, and Indices — involves substantial risk of loss. You may lose some or all of your invested capital. Past performance is not indicative of future results. You use this Platform entirely at your own risk.' },
  { title: '5. Accuracy of Information', body: 'ChartVertex AI analysis is generated for educational purposes and does not guarantee accuracy. Market conditions can change rapidly and unpredictably. We make no representations or warranties regarding the accuracy, completeness, or timeliness of any analysis provided.' },
  { title: '6. Intellectual Property', body: 'All content, branding, design, and software on this Platform is the intellectual property of ChartVertex and Mohamed AlHammadi. You may not reproduce, distribute, or create derivative works without explicit written permission.' },
  { title: '7. Limitation of Liability', body: 'To the fullest extent permitted by law, ChartVertex and its creators shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the Platform or reliance on any analysis provided.' },
  { title: '8. Privacy', body: 'Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.' },
  { title: '9. Governing Law', body: 'These Terms shall be governed by and construed in accordance with applicable law. Any disputes shall be resolved through binding arbitration or in a court of competent jurisdiction.' },
  { title: '10. Contact', body: 'For questions regarding these Terms and Conditions, please contact us through the Contact page on this Platform.' },
];

export default function TermsPage() {
  const { t } = useApp();
  return (
    <LegalPageLayout title={t.terms.title}>
      <div className="space-y-8">
        <p className="text-base leading-relaxed" style={{ color: 'var(--cv-text2)' }}>
          Please read these Terms and Conditions carefully before using ChartVertex. By using our platform, you agree to the following terms.
        </p>
        {sections.map((s) => (
          <div key={s.title} className="cv-card p-5">
            <h3 className="font-display font-semibold text-base mb-3" style={{ color: 'var(--cv-text)' }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{s.body}</p>
          </div>
        ))}
      </div>
    </LegalPageLayout>
  );
}

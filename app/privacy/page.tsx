'use client';
import LegalPageLayout from '@/components/layout/LegalPageLayout';
import { useApp } from '@/context/AppContext';

export default function PrivacyPage() {
  const { t } = useApp();
  return (
    <LegalPageLayout title={t.privacy.title}>
      <div className="space-y-6">
        <p className="text-base leading-relaxed" style={{ color: 'var(--cv-text2)' }}>
          Your privacy is important to us. This Privacy Policy explains how ChartVertex collects, uses, and protects your information when you use our platform.
        </p>
        {[
          { title: 'Information We Collect', body: 'ChartVertex is a client-side platform. Chart images you upload are processed locally in your browser and are never transmitted to or stored on our servers. We do not collect personal identification information unless you voluntarily contact us.' },
          { title: 'Chart Image Data', body: 'Images uploaded to the Dashboard Analyzer are processed entirely within your browser session. They are not uploaded, stored, or shared with any third party. When you close the session, all uploaded images are discarded.' },
          { title: 'Local Storage', body: 'We may use browser local storage to save your preferences such as language and theme settings. This data stays on your device and is never transmitted externally.' },
          { title: 'Analytics', body: 'We may collect anonymized usage analytics to improve the platform experience. This data does not include personally identifiable information and is used solely for product improvement purposes.' },
          { title: 'Cookies', body: 'ChartVertex may use essential cookies to ensure the platform functions correctly. We do not use advertising or tracking cookies. You can control cookie settings through your browser preferences.' },
          { title: 'Third-Party Services', body: 'ChartVertex does not sell, trade, or rent your personal information to third parties. We do not integrate third-party advertising networks that track your behavior.' },
          { title: 'Children\'s Privacy', body: 'ChartVertex is not intended for use by individuals under the age of 18. We do not knowingly collect data from minors. If you believe a minor has provided us with personal information, please contact us immediately.' },
          { title: 'Changes to This Policy', body: 'We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date. Continued use of the Platform constitutes acceptance of any updated policy.' },
          { title: 'Contact Us', body: 'If you have questions about this Privacy Policy or your data, please contact us through the Contact page on this Platform.' },
        ].map((s) => (
          <div key={s.title} className="cv-card p-5">
            <h3 className="font-display font-semibold text-base mb-2" style={{ color: 'var(--cv-text)' }}>{s.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{s.body}</p>
          </div>
        ))}
      </div>
    </LegalPageLayout>
  );
}

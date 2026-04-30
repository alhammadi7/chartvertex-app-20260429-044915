interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, desc, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className="cv-card p-6 animate-fade-up group transition-all duration-300 hover:border-blue-500/20"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-500/20"
        style={{ background: 'var(--cv-surface2)', color: 'var(--cv-accent)' }}
      >
        {icon}
      </div>
      <h3 className="font-display font-semibold text-base mb-2" style={{ color: 'var(--cv-text)' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--cv-text2)' }}>{desc}</p>
    </div>
  );
}

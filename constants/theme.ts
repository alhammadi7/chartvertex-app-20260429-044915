/**
 * ChartVertex — Design Tokens
 * Hybrid: Meridian Glass visuals + Obsidian Pulse structure
 */

export const Colors = {
  bg: {
    base: '#06080F',
    deep: '#0D1B3E',
    violet: '#1A0B2E',
  },
  glass: {
    surface: 'rgba(255, 255, 255, 0.08)',
    surfaceStrong: 'rgba(255, 255, 255, 0.12)',
    border: 'rgba(255, 255, 255, 0.14)',
    borderStrong: 'rgba(255, 255, 255, 0.20)',
  },
  accent: {
    primary: '#4F8EF7',
    glow: '#8B5CF6',
  },
  signals: {
    bullish: '#34D399',
    bearish: '#F87171',
    neutral: '#7A869A',
  },
  text: {
    primary: '#F0F4FF',
    muted: '#8B95A8',
    dim: '#4A5568',
  },
} as const;

export const Gradients = {
  cosmos: ['#06080F', '#0D1B3E', '#1A0B2E'] as const,
  cta: ['#4F8EF7', '#8B5CF6'] as const,
  border: ['#4F8EF7', '#8B5CF6'] as const,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

export const Shadows = {
  glow: {
    shadowColor: '#4F8EF7',
    shadowOpacity: 0.55,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
};

/**
 * ChartVertex Design System — Effects
 * Gradients, shadows, glow, overlays.
 */

import { palette } from './colors';

// ── Background gradients ─────────────────────────────
export const gradients = {
  /** Full-screen cosmos background */
  cosmos: {
    colors: [palette.bgBase, palette.bgDeep, palette.bgViolet] as const,
    locations: [0, 0.5, 1] as const,
    start: { x: 0, y: 0 },
    end:   { x: 0, y: 1 },
  },

  /** CTA button — left → right */
  cta: {
    colors: [palette.accentBlue, palette.accentViolet] as const,
    start: { x: 0, y: 0 },
    end:   { x: 1, y: 0 },
  },

  /** Chart canvas gradient border */
  border: {
    colors: [palette.accentBlue, palette.accentViolet] as const,
    start: { x: 0, y: 0 },
    end:   { x: 1, y: 1 },
  },

  /** Equity chart area fill — top → bottom */
  equityArea: {
    colors: [
      'rgba(79,142,247,0.30)',
      'rgba(79,142,247,0.02)',
    ] as const,
    start: { x: 0, y: 0 },
    end:   { x: 0, y: 1 },
  },

  /** Bullish tint overlay */
  bullishArea: {
    colors: [
      'rgba(52,211,153,0.20)',
      'rgba(52,211,153,0.02)',
    ] as const,
    start: { x: 0, y: 0 },
    end:   { x: 0, y: 1 },
  },
} as const;

// ── Shadows / glow ───────────────────────────────────
export const shadows = {
  /** Primary CTA glow — accentBlue */
  ctaGlow: {
    shadowColor: palette.accentBlue,
    shadowOpacity: 0.55,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  /** Disabled — no glow */
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },

  /** Confidence badge — color-matched glow */
  badgeGlow: (color: string) => ({
    shadowColor: color,
    shadowOpacity: 0.50,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  }),

  /** Subtle card elevation */
  cardElevation: {
    shadowColor: '#000000',
    shadowOpacity: 0.30,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
} as const;

// ── Price level overlay colors ───────────────────────
export const levelColors = {
  entry: palette.accentBlue,
  sl:    palette.bearish,
  tp1:   palette.bullish,
  tp2:   `${palette.bullish}B3`,   // 70% opacity
  tp3:   `${palette.bullish}80`,   // 50% opacity
} as const;

// ── Confidence tier colors ────────────────────────────
export const confidenceColor = (value: number): string => {
  if (value >= 80) return palette.bullish;
  if (value >= 60) return palette.accentBlue;
  return '#F59E0B'; // warning amber
};

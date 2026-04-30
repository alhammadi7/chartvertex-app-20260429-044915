/**
 * ChartVertex Design System — Colors
 * Meridian Glass visuals + Obsidian Pulse structure
 */

export const palette = {
  // ── Backgrounds ─────────────────────────────────
  bgBase: '#06080F',
  bgDeep: '#0D1B3E',
  bgViolet: '#1A0B2E',

  // ── Glass surfaces ───────────────────────────────
  glass04: 'rgba(255,255,255,0.04)',
  glass06: 'rgba(255,255,255,0.06)',
  glass08: 'rgba(255,255,255,0.08)',   // default card surface
  glass12: 'rgba(255,255,255,0.12)',   // elevated surface
  glass16: 'rgba(255,255,255,0.16)',   // pressed / hover

  // ── Glass borders ────────────────────────────────
  border10: 'rgba(255,255,255,0.10)',
  border14: 'rgba(255,255,255,0.14)',  // default border
  border20: 'rgba(255,255,255,0.20)',  // strong border

  // ── Accent ───────────────────────────────────────
  accentBlue:   '#4F8EF7',
  accentViolet: '#8B5CF6',
  accentGlow:   'rgba(79,142,247,0.40)',   // shadow/glow

  // ── Semantic ─────────────────────────────────────
  bullish:      '#34D399',
  bullishMuted: 'rgba(52,211,153,0.15)',
  bearish:      '#F87171',
  bearishMuted: 'rgba(248,113,113,0.15)',
  warning:      '#F59E0B',
  warningMuted: 'rgba(245,158,11,0.15)',
  neutral:      '#7A869A',

  // ── Text ─────────────────────────────────────────
  textPrimary: '#F0F4FF',
  textSecondary: '#A8B4C8',
  textMuted:   '#8B95A8',
  textDim:     '#4A5568',

  // ── Static ───────────────────────────────────────
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type PaletteKey = keyof typeof palette;

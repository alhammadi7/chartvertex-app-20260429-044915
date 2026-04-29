/**
 * ChartVertex Design System — Card Styles
 *
 * All cards use BlurView (intensity 20–40) + glass surface bg.
 * Never use solid opaque backgrounds inside cards.
 */

import { ViewStyle } from 'react-native';
import { palette } from './colors';
import { radius, space } from './spacing';

type CardStyle = {
  wrapper: ViewStyle;   // outer container — owns borderRadius + border
  inner: ViewStyle;     // BlurView child — owns bg + padding
};

// ── Base card — most common ─────────────────────────
export const cardBase: CardStyle = {
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border14,
  },
  inner: {
    padding: space.lg,
    backgroundColor: palette.glass08,
  },
};

// ── Hero card — weekly summary, lot size ─────────────
export const cardHero: CardStyle = {
  wrapper: {
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border14,
  },
  inner: {
    paddingVertical: space['2xl'],
    paddingHorizontal: space.xl,
    backgroundColor: palette.glass08,
    alignItems: 'center',
  },
};

// ── Compact card — grid cells, mini-stats ────────────
export const cardCompact: CardStyle = {
  wrapper: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border14,
  },
  inner: {
    padding: space.md,
    backgroundColor: palette.glass08,
  },
};

// ── Row card — breakdown rows, trade list ────────────
export const cardRow: CardStyle = {
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border14,
  },
  inner: {
    backgroundColor: palette.glass08,
  },
};

// ── Insight card — AI reasoning, accent left border ──
export const cardInsight: CardStyle = {
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border14,
  },
  inner: {
    flexDirection: 'row',
    backgroundColor: palette.glass08,
  },
};

// ── Accent card — best/worst highlights with tint ────
export const cardAccentBullish: CardStyle = {
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(52,211,153,0.20)',
  },
  inner: {
    padding: space.md,
    backgroundColor: 'rgba(52,211,153,0.05)',
  },
};

export const cardAccentBearish: CardStyle = {
  wrapper: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.20)',
  },
  inner: {
    padding: space.md,
    backgroundColor: 'rgba(248,113,113,0.05)',
  },
};

// ── Top bar ──────────────────────────────────────────
export const cardTopBar: CardStyle = {
  wrapper: {
    marginHorizontal: space.lg,
    marginTop: space.sm,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.border14,
  },
  inner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.lg,
    backgroundColor: palette.glass08,
  },
};

// ── Blur intensities per card tier ──────────────────
export const blurIntensity = {
  topBar:  40,
  hero:    25,
  base:    20,
  compact: 20,
  chip:    30,
  overlay: 25,
} as const;

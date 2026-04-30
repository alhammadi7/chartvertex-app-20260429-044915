/**
 * ChartVertex Design System — Typography
 *
 * Fonts used:
 *  - Inter          → body, labels, UI copy
 *  - JetBrains Mono → numbers, prices, data
 *
 * Scale follows a 4pt baseline grid.
 */

import { TextStyle } from 'react-native';
import { palette } from './colors';

// ── Font families ───────────────────────────────────
export const fontFamily = {
  sans:  'Inter',
  mono:  'JetBrainsMono',
  sansSystem: 'System',
} as const;

// ── Font weights ────────────────────────────────────
export const fontWeight = {
  regular:   '400',
  medium:    '500',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
} as const;

// ── Type scale ──────────────────────────────────────
export const typeScale = {
  /** 10px — micro labels, chart ticks, badges */
  micro: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: fontWeight.semibold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  } as TextStyle,

  /** 11px — section headers, captions */
  caption: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: fontWeight.semibold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,

  /** 12px — chip labels, sub-labels */
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.3,
  } as TextStyle,

  /** 13px — body copy, insight text */
  body: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: fontWeight.regular,
    letterSpacing: 0,
  } as TextStyle,

  /** 14px — row values, secondary headers */
  bodyStrong: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.2,
  } as TextStyle,

  /** 16px — screen titles, primary CTA labels */
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeight.semibold,
    letterSpacing: 0.3,
  } as TextStyle,

  /** 18px — card primary values */
  value: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.2,
  } as TextStyle,

  /** 24px — section hero numbers */
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: fontWeight.extrabold,
    letterSpacing: -0.5,
  } as TextStyle,

  /** 40px — screen hero P/L */
  heroLarge: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: fontWeight.extrabold,
    letterSpacing: -1.5,
  } as TextStyle,

  /** 48px — lot size hero */
  heroXL: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: fontWeight.extrabold,
    letterSpacing: -2,
  } as TextStyle,
} as const;

// ── Mono variants (prices, numbers) ─────────────────
export const monoScale = {
  sm:  { ...typeScale.label,      fontFamily: fontFamily.mono } as TextStyle,
  md:  { ...typeScale.bodyStrong, fontFamily: fontFamily.mono } as TextStyle,
  lg:  { ...typeScale.value,      fontFamily: fontFamily.mono } as TextStyle,
  xl:  { ...typeScale.heading,    fontFamily: fontFamily.mono } as TextStyle,
  hero:{ ...typeScale.heroLarge,  fontFamily: fontFamily.mono } as TextStyle,
} as const;

// ── Semantic text styles ─────────────────────────────
export const textStyles = {
  screenTitle:    { ...typeScale.title,    color: palette.textPrimary }   as TextStyle,
  sectionLabel:   { ...typeScale.caption,  color: palette.textMuted }     as TextStyle,
  cardLabel:      { ...typeScale.micro,    color: palette.textMuted }      as TextStyle,
  cardValue:      { ...typeScale.value,    color: palette.textPrimary }   as TextStyle,
  body:           { ...typeScale.body,     color: palette.textPrimary }   as TextStyle,
  muted:          { ...typeScale.body,     color: palette.textMuted }      as TextStyle,
  chipText:       { ...typeScale.label,    color: palette.textPrimary }   as TextStyle,
  pricePositive:  { ...monoScale.lg,       color: palette.bullish }        as TextStyle,
  priceNegative:  { ...monoScale.lg,       color: palette.bearish }        as TextStyle,
  priceNeutral:   { ...monoScale.lg,       color: palette.textPrimary }   as TextStyle,
  heroPositive:   { ...monoScale.hero,     color: palette.bullish }        as TextStyle,
  heroNegative:   { ...monoScale.hero,     color: palette.bearish }        as TextStyle,
} as const;

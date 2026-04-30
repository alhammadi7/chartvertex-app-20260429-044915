/**
 * ChartVertex Design System — Buttons
 *
 * Three variants: Primary (gradient), Secondary (glass), Ghost (text).
 * Two sizes:      Large (56px CTA), Medium (48px), Small (36px chip).
 */

import { ViewStyle, TextStyle } from 'react-native';
import { palette } from './colors';
import { radius, space } from './spacing';
import { typeScale, fontWeight } from './typography';

// ── Gradient colors (for LinearGradient) ────────────
export const buttonGradients = {
  primary:  [palette.accentBlue, palette.accentViolet] as const,
  bullish:  [palette.bullish, '#2DB87A'] as const,
  bearish:  [palette.bearish, '#E05555'] as const,
} as const;

// ── Shadow / glow ────────────────────────────────────
export const buttonShadows = {
  primary: {
    shadowColor: palette.accentBlue,
    shadowOpacity: 0.55,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  disabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
} as const;

// ── Size tokens ──────────────────────────────────────
export const buttonSizes = {
  lg: {
    height: 56,
    borderRadius: radius['2xl'],
    paddingHorizontal: space['2xl'],
    iconSize: 18,
    gap: 8,
    label: {
      fontSize: 16,
      fontWeight: fontWeight.semibold,
      letterSpacing: 0.5,
    } as TextStyle,
  },
  md: {
    height: 48,
    borderRadius: radius.xl,
    paddingHorizontal: space.xl,
    iconSize: 16,
    gap: 8,
    label: {
      fontSize: 14,
      fontWeight: fontWeight.semibold,
      letterSpacing: 0.3,
    } as TextStyle,
  },
  sm: {
    height: 36,
    borderRadius: radius.full,
    paddingHorizontal: space.md,
    iconSize: 14,
    gap: 6,
    label: {
      fontSize: 12,
      fontWeight: fontWeight.semibold,
      letterSpacing: 0.3,
    } as TextStyle,
  },
} as const;

// ── Variant tokens ───────────────────────────────────

/** Primary — gradient fill, glow shadow. Main CTA. */
export const buttonPrimary = {
  container: {
    // gradient applied via LinearGradient — borderRadius from size token
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  label: {
    color: palette.white,
  } as TextStyle,
};

/** Secondary — glass fill, border, no gradient. */
export const buttonSecondary = {
  container: {
    backgroundColor: palette.glass08,
    borderWidth: 1,
    borderColor: palette.border20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  } as ViewStyle,
  label: {
    color: palette.textPrimary,
  } as TextStyle,
};

/** Ghost — transparent, accent-colored text. No border. */
export const buttonGhost = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  } as ViewStyle,
  label: {
    color: palette.accentBlue,
  } as TextStyle,
};

/** Disabled state — applied on top of any variant. */
export const buttonDisabled = {
  container: {
    opacity: 0.38,
  } as ViewStyle,
};

// ── Chip / pill button (pair selector, timeframe, bias) ──
export const chipStyles = {
  default: {
    wrapper: {
      borderRadius: radius.full,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: palette.border14,
    } as ViewStyle,
    inner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: space.md,
      paddingVertical: space.sm,
      backgroundColor: palette.glass08,
    } as ViewStyle,
    label: {
      color: palette.textPrimary,
      fontSize: 12,
      fontWeight: fontWeight.semibold,
    } as TextStyle,
  },

  active: {
    wrapper: {
      borderRadius: radius.full,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: `${palette.accentBlue}66`,
    } as ViewStyle,
    inner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: space.md,
      paddingVertical: space.sm,
      backgroundColor: `${palette.accentBlue}22`,
    } as ViewStyle,
    label: {
      color: palette.accentBlue,
      fontSize: 12,
      fontWeight: fontWeight.semibold,
    } as TextStyle,
  },

  bullish: {
    borderColor: `${palette.bullish}66`,
    bgColor: `${palette.bullish}22`,
    textColor: palette.bullish,
  },

  bearish: {
    borderColor: `${palette.bearish}66`,
    bgColor: `${palette.bearish}22`,
    textColor: palette.bearish,
  },
} as const;

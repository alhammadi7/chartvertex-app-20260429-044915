/**
 * ChartVertex Design System — Spacing & Radius
 *
 * 4pt base grid.
 * All spacing values are multiples of 4.
 */

// ── Spacing ─────────────────────────────────────────
export const spacing = {
  px:  1,
  0.5: 2,
  1:   4,
  1.5: 6,
  2:   8,
  2.5: 10,
  3:   12,
  4:   16,
  5:   20,
  6:   24,
  7:   28,
  8:   32,
  9:   36,
  10:  40,
  12:  48,
  14:  56,
  16:  64,
  20:  80,
  24:  96,
} as const;

// ── Named semantic spacing ───────────────────────────
export const space = {
  /** 4px — tightest gap between inline elements */
  xs:    spacing[1],
  /** 8px — between icon and label, chip internal padding */
  sm:    spacing[2],
  /** 12px — internal card padding (compact) */
  md:    spacing[3],
  /** 16px — standard screen horizontal padding */
  lg:    spacing[4],
  /** 20px — section gap */
  xl:    spacing[5],
  /** 24px — between major sections */
  '2xl': spacing[6],
  /** 32px — screen-level gutters, CTA bottom offset */
  '3xl': spacing[8],
  /** 56px — top bar height */
  topBar: spacing[14],
  /** 48px — CTA button height */
  ctaHeight: spacing[12],
  /** 56px — primary CTA height */
  ctaHeightLg: spacing[14],
} as const;

// ── Border radius ────────────────────────────────────
export const radius = {
  /** 4px — micro badges */
  xs:    4,
  /** 8px — inline tags */
  sm:    8,
  /** 10px — small chips */
  md:    10,
  /** 12px — compact cards */
  lg:    12,
  /** 16px — standard cards, inputs */
  xl:    16,
  /** 20px — primary CTA, large cards */
  '2xl': 20,
  /** 24px — hero cards, chart canvas */
  '3xl': 24,
  /** 9999px — pill / fully rounded */
  full:  9999,
} as const;

// ── Z-index ──────────────────────────────────────────
export const zIndex = {
  base:    0,
  overlay: 10,
  chip:    20,
  modal:   30,
  toast:   40,
} as const;

# ChartVertex Design System

Meridian Glass visuals + Obsidian Pulse structure.

## Import

```ts
import { palette, space, radius, typeScale, cardBase, buttonSizes, gradients } from '@/design-system';
```

---

## Colors

| Token | Hex | Usage |
|---|---|---|
| `palette.bgBase` | `#06080F` | Screen background |
| `palette.bgDeep` | `#0D1B3E` | Gradient mid |
| `palette.bgViolet` | `#1A0B2E` | Gradient end |
| `palette.glass08` | `rgba(255,255,255,0.08)` | Card surface |
| `palette.glass12` | `rgba(255,255,255,0.12)` | Elevated surface |
| `palette.border14` | `rgba(255,255,255,0.14)` | Default border |
| `palette.border20` | `rgba(255,255,255,0.20)` | Strong border |
| `palette.accentBlue` | `#4F8EF7` | Primary accent |
| `palette.accentViolet` | `#8B5CF6` | Secondary accent, AI insight |
| `palette.bullish` | `#34D399` | Profit, long, TP levels |
| `palette.bearish` | `#F87171` | Loss, short, SL level |
| `palette.warning` | `#F59E0B` | Low confidence |
| `palette.textPrimary` | `#F0F4FF` | Body text |
| `palette.textMuted` | `#8B95A8` | Labels, captions |
| `palette.textDim` | `#4A5568` | Disabled, placeholders |

---

## Typography

| Token | Size | Weight | Use |
|---|---|---|---|
| `typeScale.micro` | 10px | 600 | Badge labels, chart ticks |
| `typeScale.caption` | 11px | 600 | Section headers |
| `typeScale.label` | 12px | 600 | Chip text |
| `typeScale.body` | 13px | 400 | AI insight, notes |
| `typeScale.bodyStrong` | 14px | 600 | Row values |
| `typeScale.title` | 16px | 600 | Screen titles, CTA labels |
| `typeScale.value` | 18px | 700 | Card primary values |
| `typeScale.heading` | 24px | 800 | Section hero numbers |
| `typeScale.heroLarge` | 40px | 800 | Weekly P/L |
| `typeScale.heroXL` | 48px | 800 | Lot size |

**Mono font** (`monoScale`) wraps any `typeScale` token with `fontFamily: 'JetBrainsMono'` for prices and numbers.

---

## Spacing (4pt grid)

| Token | px | Use |
|---|---|---|
| `space.xs` | 4 | Icon-to-label gap |
| `space.sm` | 8 | Chip padding |
| `space.md` | 12 | Compact card padding |
| `space.lg` | 16 | Screen horizontal margin |
| `space.xl` | 20 | Section gap |
| `space['2xl']` | 24 | Major section gap |
| `space['3xl']` | 32 | CTA bottom offset |
| `space.topBar` | 56 | Top bar height |
| `space.ctaHeight` | 48 | Medium CTA height |
| `space.ctaHeightLg` | 56 | Large CTA height |

---

## Border Radius

| Token | px | Use |
|---|---|---|
| `radius.xs` | 4 | Micro badges |
| `radius.sm` | 8 | Tags |
| `radius.lg` | 12 | Compact cards |
| `radius.xl` | 16 | Standard cards, inputs |
| `radius['2xl']` | 20 | Primary CTA, hero cards |
| `radius['3xl']` | 24 | Chart canvas |
| `radius.full` | 9999 | Pills, chips |

---

## Cards

All cards use `BlurView` + transparent glass background. Never use solid opaque backgrounds.

| Export | Blur | Padding | Use |
|---|---|---|---|
| `cardBase` | 20 | 16px | Standard info cards |
| `cardHero` | 25 | 24/20px | Weekly summary, lot size |
| `cardCompact` | 20 | 12px | Grid cells, mini-stats |
| `cardRow` | 20 | none | Trade list, breakdown rows |
| `cardInsight` | 20 | — | AI reasoning (left accent) |
| `cardAccentBullish` | 20 | 12px | Best trade highlight |
| `cardAccentBearish` | 20 | 12px | Worst trade highlight |
| `cardTopBar` | 40 | 16px | Navigation bar |

**Blur intensities:** `blurIntensity.topBar = 40`, `blurIntensity.hero = 25`, `blurIntensity.base = 20`

---

## Buttons

### Variants

| Variant | Style | Use |
|---|---|---|
| Primary | Gradient `#4F8EF7 → #8B5CF6` + glow shadow | Main CTA: Analyze, Save, Continue |
| Secondary | Glass border, no gradient | Supporting CTA: Save, Back |
| Ghost | Transparent, accent text | Read more, inline actions |

### Sizes

| Size | Height | Radius | Use |
|---|---|---|---|
| `lg` | 56px | 20px | Full-width primary CTA |
| `md` | 48px | 16px | Dual CTA row |
| `sm` | 36px | full | Chips, secondary pills |

### Chips

`chipStyles.default` — glass pill for selectors (pair, timeframe)
`chipStyles.active` — blue-tinted active state
`chipStyles.bullish` — green tint for Long bias
`chipStyles.bearish` — red tint for Short bias

---

## Effects

| Token | Use |
|---|---|
| `gradients.cosmos` | Full-screen background gradient |
| `gradients.cta` | Primary button gradient |
| `gradients.border` | Chart canvas 1px gradient border |
| `gradients.equityArea` | Equity chart area fill |
| `shadows.ctaGlow` | Blue glow on primary CTA |
| `shadows.badgeGlow(color)` | Color-matched badge shadow |
| `levelColors.entry` | `#4F8EF7` — entry line |
| `levelColors.sl` | `#F87171` — stop loss line |
| `levelColors.tp1/2/3` | `#34D399` at 100/70/50% |
| `confidenceColor(n)` | Green ≥80%, Blue ≥60%, Amber <60% |

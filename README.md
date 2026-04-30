# ChartVertex

AI-powered chart analysis app. Upload a chart image, get AI-driven entry, stop loss, take profit, and confidence rating.

**Stack:** React Native · Expo SDK 52 · expo-router · NativeWind v4 · TypeScript

**Design:** Meridian Glass visuals + Obsidian Pulse structure (premium dark glass UI).

## Setup

```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android, or scan the QR with Expo Go.

## Structure

```
app/
  _layout.tsx              # Root navigator
  index.tsx                # Redirect to /analyze
  (tabs)/
    _layout.tsx            # Tabs stack
    analyze.tsx            # Upload & Analyze screen

components/
  GlassTopBar.tsx          # Top navigation bar
  UploadDropzone.tsx       # Empty-state upload area
  ChartCanvas.tsx          # Uploaded image with gradient border
  OverlayChipsTop.tsx      # Pair / Timeframe / Remove chips
  OverlayChipsBottom.tsx   # Long / Short / Neutral bias chips
  FloatingCTA.tsx          # Analyze Chart button
  ui/
    GlassChip.tsx          # Reusable glass pill primitive

constants/
  theme.ts                 # Colors, gradients, radii, shadows
  types.ts                 # Bias, Timeframe types

global.css                 # NativeWind directives
tailwind.config.js         # Tailwind/NativeWind config
```

## Screen Spec

**State A — Empty:** dashed glass dropzone with Camera/Gallery buttons.
**State B — Uploaded:** chart image fills 70–80% of viewport, with floating glass chips overlaying top (pair, timeframe, remove) and bottom (Long/Short/Neutral).

CTA floats at bottom with gradient + glow; only enabled when image is present.

## Next steps

Wire `handleAnalyze()` in `app/(tabs)/analyze.tsx` to your AI backend.

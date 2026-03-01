# HabitForge Website Asset Plan

_Last updated: 2026-02-28_

## Goal
Create a consistent, premium screenshot and visual system across desktop, iPhone, and iPad views.

## Screenshot Priority Order (Website)
Use this exact order in marketing flows unless a page has a special purpose:

1. **Dashboard** (`03-dashboard.png`) — Hero + first impression
2. **Progress** (`04-progress.png`) — Benefits/proof of momentum
3. **Habit Detail** (`07-habit-detail.png`) — Depth + control
4. **Leaderboard** (`05-leaderboard.png`) — Accountability/social layer
5. **Settings** (`06-settings.png`) — Trust + customization
6. **Auth** (`01-auth.png`) — Onboarding / polish support

## Current Asset Inventory
Located in: `public/screenshots/`

- `01-auth.png`
- `02-onboarding.png`
- `03-dashboard.png`
- `04-progress.png`
- `05-leaderboard.png`
- `06-settings.png`
- `07-habit-detail.png`
- `08-progress-charts.png`

## Placement Map by Page

### Homepage (`/`)
- Hero device: `03-dashboard.png`
- Mid showcase desktop trio:
  - Left: `01-auth.png`
  - Center: `03-dashboard.png`
  - Right: `04-progress.png`
- Mobile showcase: center-only `03-dashboard.png`

### How It Works (`/how-it-works`)
Step sequence should prioritize:
1. `01-auth.png`
2. `02-onboarding.png`
3. `03-dashboard.png`
4. `04-progress.png`
5. `05-leaderboard.png`
6. `06-settings.png`
Highlight section: `07-habit-detail.png`

### Download (`/download`)
Primary stack:
- `03-dashboard.png`
- `04-progress.png`
- `07-habit-detail.png`
Secondary cards:
- `05-leaderboard.png`, `06-settings.png`

## Re-Capture Checklist (When app UI updates)
Before replacing screenshots, ensure each screenshot includes current UI capabilities where relevant:

- Achievement badges
- Streak/weekly review indicators
- Pause/resume state
- Routine/setup wizard elements
- New progress visualizations

### Capture Specs
- Device: iPhone (primary), iPad variants optional for section visuals
- Resolution target: >= 1170x2532 equivalent or current 1206x2622 source scale
- Format: PNG (master), optional WebP exports for performance
- Keep status bar consistent (time/battery style)
- Use same accent state/theme across set to avoid mismatch

## Style Guide for Supporting Photos (non-app UI)
Use minimal, premium, calm imagery:

- Neutral warm palette (stone/beige/soft charcoal)
- Real environments, low visual noise
- No cheesy stock smiles or fake medical scenes
- Prefer close, textural compositions over busy scenes
- Keep overlays subtle; screenshots stay the star

## Asset Folder Structure

```text
public/
  screenshots/
    01-auth.png
    02-onboarding.png
    03-dashboard.png
    04-progress.png
    05-leaderboard.png
    06-settings.png
    07-habit-detail.png
    08-progress-charts.png
  visuals/
    lifestyle/           # optional supporting photos
    textures/            # subtle background textures

docs/
  WEBSITE_ASSET_PLAN.md
  references/
    website-asset-notes.png
```

## QA Pass Before Deploy
- [ ] Desktop (1440px+): no clipping, clean spacing, crisp screenshots
- [ ] iPad (768–1024px): cards and mockups remain balanced
- [ ] iPhone (390px): no horizontal overflow, buttons full width where needed
- [ ] LCP image still first-render hero shot
- [ ] No duplicate/contradictory screenshot story across pages

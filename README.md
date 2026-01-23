# Existential Countdown — Next.js + MUI MVP

Build a desktop-first responsive Next.js app (App Router) using Material UI (MUI) as the design system.

## Pages
- Single page: `/` containing:
  - AppBar with actions: Assumptions, About, Theme toggle, Reset
  - 3 Counter Cards (Coffees left, Sundays remaining, “Next week I’ll start”)
  - Assumptions panel (right column on desktop, Drawer on mobile)
  - Details Drawer/Dialog when a card is clicked

## State
- Store assumptions in LocalStorage (client-side)
- Types:
  - age: number
  - lifeExpectancyMode: "short" | "average" | "optimistic"
  - coffeesPerDay: number (0..6)
  - optimism: number (0..10)
  - tone: "dry" | "bleak" | "bureaucratic" | "cosmic"

## Math (simple deterministic)
- Map lifeExpectancyMode to ages: short=72, average=82, optimistic=95
- daysLeft = max(0, (lifeExpectancyAge - age) * 365.25)
- coffeesLeft = floor(daysLeft * coffeesPerDay)
- sundaysLeft = floor(daysLeft / 7)
- nextWeekLeft = floor((lifeExpectancyAge - age) * 12 * (0.5 + optimism/10))  // intentionally fake

## UI rules
- No motivation, no streaks, no “you got this”.
- Typography: large numbers, muted assumptions.
- Use MUI Card, Typography, Grid, Slider, TextField, ToggleButtonGroup, Drawer, Dialog.
- Responsive: 2 columns on md+, stacked on xs.

## Components
- CounterCard: displays label, big number, subtext; onClick opens de

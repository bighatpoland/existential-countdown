# Existential Countdown — A Nerdy, Sarcastic Death Clock

Welcome to the app that counts down everything you *definitely* aren’t procrastinating about. It’s a Next.js + MUI MVP that turns life expectancy into tidy, spreadsheet-friendly numbers. Because nothing says “control” like rounding your existential dread to the nearest integer.

## What this is
- A single-page dashboard that estimates how many coffees, Sundays, and “next weeks” you have left.
- An assumptions panel where you tweak inputs to make reality more or less terrible.
- A details drawer/dialog so you can click things and feel like you’re “investigating.”

## What this is not
- A motivational app. No confetti. No “you got this.” You don’t.
- A medical device. It’s math. Bad math. On purpose.

## Features (aka glorified arithmetic)
- **Coffees left** based on your daily caffeine habit.
- **Sundays remaining** because weekends are a finite resource.
- **“Next week I’ll start”** counter, powered by optimistic delusion.
- **Tone switcher** for dry, bleak, bureaucratic, or cosmic vibes.
- **LocalStorage** so your assumptions survive reloads—like your regrets.

## The math (simple, deterministic, and emotionally questionable)
- lifeExpectancyMode → short=72, average=82, optimistic=95
- $daysLeft = \max(0, (lifeExpectancyAge - age) \times 365.25)$
- $coffeesLeft = \lfloor daysLeft \times coffeesPerDay \rfloor$
- $sundaysLeft = \lfloor daysLeft / 7 \rfloor$
- $nextWeekLeft = \lfloor (lifeExpectancyAge - age) \times 12 \times (0.5 + optimism/10) \rfloor$  
  *(yes, it’s fake; so is your calendar backlog)*

## Tech stack
- **Next.js (App Router)** for the “modern web framework” bingo card.
- **Material UI** because consistency is cheaper than creativity.
- **TypeScript** to reassure you that at least *something* has types.

## Run it
1. Install dependencies.
2. Start dev server.
3. Stare into the void, but in dark mode.

See [QUICKSTART.md](QUICKSTART.md) if you want actual commands instead of vibes.

## Project layout (for the curious and/or nosy)
- App UI lives in the Next.js app directory.
- Assumptions, counters, and utils are in the next-mui-mvp/ workspace.
- The Expo/React Native app also exists in the repo, because why have one framework when you can have two and a mild headache.

## Contributing
Sure, open a PR. I’ll merge it right after I update my “next week” counter.

## License
See [LICENSE](LICENSE) for legal bedtime reading.# Existential Countdown — Next.js + MUI MVP

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

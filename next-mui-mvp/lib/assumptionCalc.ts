import { Assumptions, LifeAssumption } from "../types";
import { getAdjustedLifeExpectancyAge, getWeeksRemaining } from "./calc";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getRemainingYears = (assumptions: Assumptions) => {
  const expectancy = getAdjustedLifeExpectancyAge(assumptions);
  return Math.max(0, expectancy - assumptions.age);
};

const getHealthConditionFactor = (assumptions: Assumptions) =>
  clamp(0.9 + (assumptions.healthCondition - 3) * 0.05, 0.75, 1.15);

const getEatingHabitsFactor = (assumptions: Assumptions) =>
  clamp(0.85 + (assumptions.eatingHabits - 3) * 0.06, 0.7, 1.2);

const getLifestyleFactor = (assumptions: Assumptions) =>
  clamp(
    (0.85 +
      (assumptions.workdaysPerWeek - 5) * 0.05 +
      (assumptions.coffeesPerDay - 2) * 0.04) *
      getHealthConditionFactor(assumptions),
    0.55,
    1.45
  );

const getHabitsFactor = (assumptions: Assumptions) =>
  clamp(
    (0.6 +
      (assumptions.coffeesPerDay / 6) * 0.5 +
      (assumptions.workdaysPerWeek / 7) * 0.3) *
      getEatingHabitsFactor(assumptions),
    0.45,
    1.5
  );

const getOptimismFactor = (assumptions: Assumptions) =>
  clamp(0.8 + (assumptions.optimism / 10) * 0.4, 0.8, 1.2);

const getAgeFactor = (assumptions: Assumptions) =>
  clamp(1.1 - (assumptions.age / 100) * 0.4, 0.75, 1.1);

const ASSUMPTION_RATES: Record<
  string,
  { perWeek?: number; perYear?: number }
> = {
  "matches-burned": { perWeek: 1.1 },
  "toothpicks-broken": { perWeek: 2.6 },
  "candles-forgotten": { perYear: 1.8 },
  "plastic-lids-lost": { perWeek: 0.7 },
  "pens-stop-mid-sentence": { perYear: 6.2 },
  "batteries-just-in-case": { perYear: 4.1 },
  "paper-towels-unnecessary": { perWeek: 4.0 },
  "coffee-cups-held-too-long": { perWeek: 5.0 },
  "receipts-kept-for-later": { perWeek: 3.1 },
  "plastic-bags-reused-once": { perWeek: 1.4 },
  "glasses-dishwasher-wrong": { perWeek: 1.1 },
  "chairs-temp-storage": { perWeek: 2.0 },
  "doors-closed-without-why": { perWeek: 3.2 },
  "switches-flipped-twice": { perWeek: 4.0 },
  "sockets-unplugged-emotionally": { perWeek: 1.0 },
  "keys-somewhere-safe": { perWeek: 0.8 },
  "drawers-opened-no-purpose": { perWeek: 2.2 },
  "shelves-dusted-incompletely": { perYear: 8.0 },
  "plants-killed-good-intentions": { perYear: 1.0 },
  "mugs-sentimental": { perYear: 1.6 },
  "minutes-doorways": { perWeek: 12.0 },
  "alarms-snoozed": { perWeek: 3.1 },
  "emails-reread": { perWeek: 5.0 },
  "lists-rewritten": { perWeek: 1.2 },
  "decisions-postponed": { perWeek: 0.9 },
  "moments-waiting-right-time": { perWeek: 4.2 },
  "evenings-scrolling": { perWeek: 1.5 },
  "plans-almost-made": { perWeek: 1.0 },
  "weekends-underestimated": { perYear: 20.0 },
  "mondays-anticipated": { perWeek: 1.0 },
  "conversations-ended-too-late": { perWeek: 2.2 },
  "goodbyes-too-long": { perWeek: 1.2 },
  "names-forgotten": { perWeek: 1.0 },
  "eye-contact-too-long": { perWeek: 3.0 },
  "laughs-politeness": { perWeek: 4.0 },
  "stories-nodded-through": { perWeek: 2.3 },
  "opinions-withheld": { perWeek: 2.8 },
  "apologies-preemptive": { perWeek: 1.3 },
  "messages-deleted": { perWeek: 2.5 },
  "clarity-ignored": { perWeek: 1.1 }
};

const getBaseCount = (assumptions: Assumptions, id: string) => {
  const rates = ASSUMPTION_RATES[id];
  if (!rates) return 0;
  const remainingWeeks = getWeeksRemaining(assumptions);
  const remainingYears = getRemainingYears(assumptions);
  if (rates.perWeek) {
    return remainingWeeks * rates.perWeek;
  }
  if (rates.perYear) {
    return remainingYears * rates.perYear;
  }
  return 0;
};

const getFactor = (assumptions: Assumptions, item: LifeAssumption) => {
  let factor = 1;
  if (item.affectedBy.includes("age")) {
    factor *= getAgeFactor(assumptions);
  }
  if (item.affectedBy.includes("lifestyle")) {
    factor *= getLifestyleFactor(assumptions);
  }
  if (item.affectedBy.includes("habits")) {
    factor *= getHabitsFactor(assumptions);
  }
  if (item.affectedBy.includes("optimism")) {
    factor *= getOptimismFactor(assumptions);
  }
  return factor;
};

export const getAssumptionValue = (
  assumptions: Assumptions,
  item: LifeAssumption
) => {
  const base = getBaseCount(assumptions, item.id);
  const value = Math.max(0, Math.floor(base * getFactor(assumptions, item)));
  return value;
};

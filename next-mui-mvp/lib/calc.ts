import { Assumptions, LifeExpectancy } from "../types";

const LIFE_EXPECTANCY_MAP: Record<LifeExpectancy, number> = {
  short: 70,
  average: 80,
  optimistic: 90
};

export const getLifeExpectancyAge = (lifeExpectancy: LifeExpectancy) =>
  LIFE_EXPECTANCY_MAP[lifeExpectancy];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getHealthDeltaYears = (healthCondition: number) => {
  const clamped = clamp(healthCondition, 1, 5);
  return (clamped - 3) * 2;
};

const getEatingHabitsDeltaYears = (eatingHabits: number) => {
  const clamped = clamp(eatingHabits, 1, 5);
  return (clamped - 3) * 1.5;
};

export const getAdjustedLifeExpectancyAge = (assumptions: Assumptions) => {
  const base = getLifeExpectancyAge(assumptions.lifeExpectancy);
  const adjusted =
    base +
    getHealthDeltaYears(assumptions.healthCondition) +
    getEatingHabitsDeltaYears(assumptions.eatingHabits);
  return clamp(Math.round(adjusted), 50, 105);
};

export const getHealthProfile = (assumptions: Assumptions) => {
  const score = Math.round(
    (assumptions.healthCondition + assumptions.eatingHabits) / 2
  );
  const profileMap: Record<
    number,
    { label: string; description: string }
  > = {
    1: {
      label: "fragile",
      description: "Expect lower stamina and slower recovery."
    },
    2: {
      label: "strained",
      description: "Functional, but with more bad days than good."
    },
    3: {
      label: "steady",
      description: "Average resilience with manageable dips."
    },
    4: {
      label: "strong",
      description: "Reliable energy with occasional wobble."
    },
    5: {
      label: "excellent",
      description: "High resilience and faster bounce-back."
    }
  };
  return profileMap[clamp(score, 1, 5)];
};

export const getWeeksRemaining = (assumptions: Assumptions) => {
  const expectancyAge = getAdjustedLifeExpectancyAge(assumptions);
  const remainingYears = Math.max(0, expectancyAge - assumptions.age);
  return Math.max(0, Math.floor(remainingYears * 52));
};

export const getSundaysRemaining = (assumptions: Assumptions) =>
  getWeeksRemaining(assumptions);

export const getCoffeesLeft = (assumptions: Assumptions) => {
  const weeksRemaining = getWeeksRemaining(assumptions);
  return Math.max(
    0,
    Math.floor(weeksRemaining * 7 * Math.max(0, assumptions.coffeesPerDay))
  );
};

export const getWorkdaysRemaining = (assumptions: Assumptions) => {
  const weeksRemaining = getWeeksRemaining(assumptions);
  return Math.max(
    0,
    Math.floor(weeksRemaining * Math.max(0, assumptions.workdaysPerWeek))
  );
};

export const getNextWeekStartRemaining = (assumptions: Assumptions) => {
  const weeksRemaining = getWeeksRemaining(assumptions);
  const optimismFactor = Math.min(1, Math.max(0, assumptions.optimism / 10));
  return Math.max(0, Math.floor(weeksRemaining * (1 - optimismFactor)));
};

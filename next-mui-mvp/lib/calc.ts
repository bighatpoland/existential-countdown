import { Assumptions, LifeExpectancy } from "../types";

const LIFE_EXPECTANCY_MAP: Record<LifeExpectancy, number> = {
  short: 70,
  average: 80,
  optimistic: 90
};

export const getLifeExpectancyAge = (lifeExpectancy: LifeExpectancy) =>
  LIFE_EXPECTANCY_MAP[lifeExpectancy];

export const getWeeksRemaining = (assumptions: Assumptions) => {
  const expectancyAge = getLifeExpectancyAge(assumptions.lifeExpectancy);
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

export const getNextWeekStartRemaining = (assumptions: Assumptions) => {
  const weeksRemaining = getWeeksRemaining(assumptions);
  const optimismFactor = Math.min(1, Math.max(0, assumptions.optimism / 10));
  return Math.max(0, Math.floor(weeksRemaining * (1 - optimismFactor)));
};

import { Assumptions, CounterKind } from "../types";
import {
  getCoffeesLeft,
  getAdjustedLifeExpectancyAge,
  getNextWeekStartRemaining,
  getSundaysRemaining,
  getWorkdaysRemaining
} from "./calc";

const tonePrefix = {
  dry: "Assuming",
  bleak: "Assuming, grimly,",
  bureaucratic: "Per current policy, assuming",
  cosmic: "Assuming the universe permits"
};

export const getSubtext = (kind: CounterKind, assumptions: Assumptions) => {
  const expectancyAge = getAdjustedLifeExpectancyAge(assumptions);
  switch (kind) {
    case "coffees":
      return `${tonePrefix[assumptions.tone]} ${assumptions.coffeesPerDay} coffees/day until age ${expectancyAge}.`;
    case "sundays":
      return `${tonePrefix[assumptions.tone]} weeks until age ${expectancyAge}, one Sunday each.`;
    case "workdays":
      return `${tonePrefix[assumptions.tone]} ${assumptions.workdaysPerWeek} workdays/week until age ${expectancyAge}.`;
    case "nextWeek":
      return `${tonePrefix[assumptions.tone]} optimism ${assumptions.optimism}/10 delays the start.`;
    default:
      return "";
  }
};

export const getHowCalculated = (kind: CounterKind) => {
  switch (kind) {
    case "coffees":
      return "Coffees left is the total remaining weeks (adjusted by health and eating habits) multiplied by 7 days and your coffees per day.";
    case "sundays":
      return "Sundays remaining is the number of weeks left until your adjusted life expectancy.";
    case "workdays":
      return "Workdays remaining is the adjusted remaining weeks multiplied by your workdays per week.";
    case "nextWeek":
      return "Next week I’ll start is the portion of adjusted remaining weeks postponed by your optimism score.";
    default:
      return "";
  }
};

export const getFormula = (kind: CounterKind) => {
  switch (kind) {
    case "coffees":
      return "(adjustedLifeExpectancyAge - age) × 52 × 7 × coffeesPerDay";
    case "sundays":
      return "(adjustedLifeExpectancyAge - age) × 52";
    case "workdays":
      return "(adjustedLifeExpectancyAge - age) × 52 × workdaysPerWeek";
    case "nextWeek":
      return "(adjustedLifeExpectancyAge - age) × 52 × (1 - optimism/10)";
    default:
      return "";
  }
};

export const getAssumptionsUsed = (assumptions: Assumptions) => [
  `Age: ${assumptions.age}`,
  `Life expectancy: ${assumptions.lifeExpectancy}`,
  `Health condition: ${assumptions.healthCondition}/5`,
  `Eating habits: ${assumptions.eatingHabits}/5`,
  `Coffees/day: ${assumptions.coffeesPerDay}`,
  `Workdays/week: ${assumptions.workdaysPerWeek}`,
  `Optimism: ${assumptions.optimism}/10`
];

export const getValueForKind = (kind: CounterKind, assumptions: Assumptions) => {
  switch (kind) {
    case "coffees":
      return getCoffeesLeft(assumptions);
    case "sundays":
      return getSundaysRemaining(assumptions);
    case "workdays":
      return getWorkdaysRemaining(assumptions);
    case "nextWeek":
      return getNextWeekStartRemaining(assumptions);
    default:
      return 0;
  }
};

export type LifeExpectancy = "short" | "average" | "optimistic";
export type AbsurdityTone = "dry" | "bleak" | "bureaucratic" | "cosmic";
export type CounterKind = "coffees" | "sundays" | "workdays" | "nextWeek";

export type AssumptionEffect =
  | "age"
  | "lifestyle"
  | "optimism"
  | "habits"
  | "health"
  | "nutrition";

export type Assumptions = {
  age: number;
  lifeExpectancy: LifeExpectancy;
  healthCondition: number;
  eatingHabits: number;
  coffeesPerDay: number;
  workdaysPerWeek: number;
  optimism: number;
  tone: AbsurdityTone;
};

export type Snapshot = {
  id: string;
  date: string;
  sundays: number;
  coffees: number;
};

export type LifeAssumption = {
  id: string;
  label: string;
  unit: string;
  description: string;
  calculationHint: string;
  affectedBy: AssumptionEffect[];
};

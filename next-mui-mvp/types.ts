export type LifeExpectancy = "short" | "average" | "optimistic";
export type AbsurdityTone = "dry" | "bleak" | "bureaucratic" | "cosmic";
export type CounterKind = "coffees" | "sundays" | "nextWeek";

export type Assumptions = {
  age: number;
  lifeExpectancy: LifeExpectancy;
  coffeesPerDay: number;
  optimism: number;
  tone: AbsurdityTone;
};

export type Snapshot = {
  id: string;
  date: string;
  sundays: number;
  coffees: number;
};

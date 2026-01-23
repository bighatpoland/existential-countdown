import { Assumptions, Snapshot } from "../types";

const ASSUMPTIONS_KEY = "existential-assumptions-v1";
const SNAPSHOTS_KEY = "existential-snapshots-v1";

const canUseStorage = () => typeof window !== "undefined";

export const loadAssumptions = (): Assumptions | null => {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(ASSUMPTIONS_KEY);
    return raw ? (JSON.parse(raw) as Assumptions) : null;
  } catch {
    return null;
  }
};

export const saveAssumptions = (assumptions: Assumptions) => {
  if (!canUseStorage()) return;
  localStorage.setItem(ASSUMPTIONS_KEY, JSON.stringify(assumptions));
};

export const clearAssumptions = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(ASSUMPTIONS_KEY);
};

export const loadSnapshots = (): Snapshot[] => {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(SNAPSHOTS_KEY);
    return raw ? (JSON.parse(raw) as Snapshot[]) : [];
  } catch {
    return [];
  }
};

export const saveSnapshots = (snapshots: Snapshot[]) => {
  if (!canUseStorage()) return;
  localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(snapshots));
};

import { LifeAssumption } from "../types";

export const assumptionsBase: LifeAssumption[] = [
  {
    id: "matches-burned",
    label: "Matches you will burn",
    unit: "matches",
    description: "Based on remaining weeks and routine friction.",
    calculationHint: "remainingWeeks × 1.1 × lifestyleFactor × habitsFactor",
    affectedBy: ["lifestyle", "habits"]
  },
  {
    id: "toothpicks-broken",
    label: "Toothpicks you will break",
    unit: "toothpicks",
    description: "Assuming average meals and moderate patience.",
    calculationHint: "remainingWeeks × 2.6 × habitsFactor",
    affectedBy: ["habits"]
  },
  {
    id: "candles-forgotten",
    label: "Candles you will forget about",
    unit: "candles",
    description: "Based on remaining years and household routines.",
    calculationHint: "remainingYears × 1.8 × lifestyleFactor",
    affectedBy: ["lifestyle", "age"]
  },
  {
    id: "plastic-lids-lost",
    label: "Plastic lids you will lose",
    unit: "lids",
    description: "Calculated from remaining weeks and everyday handling.",
    calculationHint: "remainingWeeks × 0.7 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "pens-stop-mid-sentence",
    label: "Pens that will stop working mid-sentence",
    unit: "pens",
    description: "Estimated across remaining years of routine writing.",
    calculationHint: "remainingYears × 6.2 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "batteries-just-in-case",
    label: "Batteries you’ll throw away \"just in case\"",
    unit: "batteries",
    description: "Based on remaining years and household drift.",
    calculationHint: "remainingYears × 4.1 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "paper-towels-unnecessary",
    label: "Paper towels used unnecessarily",
    unit: "sheets",
    description: "Projected from remaining weeks and daily habits.",
    calculationHint: "remainingWeeks × 4.0 × habitsFactor",
    affectedBy: ["habits"]
  },
  {
    id: "coffee-cups-held-too-long",
    label: "Coffee cups held too long while talking",
    unit: "cups",
    description: "Based on remaining weeks and conversational drift.",
    calculationHint: "remainingWeeks × 5.0 × habitsFactor × lifestyleFactor",
    affectedBy: ["habits", "lifestyle"]
  },
  {
    id: "receipts-kept-for-later",
    label: "Receipts kept \"for later\"",
    unit: "receipts",
    description: "Estimated from remaining weeks and routine purchases.",
    calculationHint: "remainingWeeks × 3.1 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "plastic-bags-reused-once",
    label: "Plastic bags reused exactly once",
    unit: "bags",
    description: "Based on remaining weeks and typical reuse patterns.",
    calculationHint: "remainingWeeks × 1.4 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "glasses-dishwasher-wrong",
    label: "Glasses you’ll put in the dishwasher incorrectly",
    unit: "glasses",
    description: "Projected across remaining weeks of routine chores.",
    calculationHint: "remainingWeeks × 1.1 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "chairs-temp-storage",
    label: "Chairs used as temporary storage",
    unit: "chairs",
    description: "Based on remaining weeks and household habits.",
    calculationHint: "remainingWeeks × 2.0 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "doors-closed-without-why",
    label: "Doors closed without realizing why",
    unit: "doors",
    description: "Estimated from remaining weeks and routine motion.",
    calculationHint: "remainingWeeks × 3.2 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "switches-flipped-twice",
    label: "Light switches flipped twice",
    unit: "switches",
    description: "Based on remaining weeks and minor corrections.",
    calculationHint: "remainingWeeks × 4.0 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "sockets-unplugged-emotionally",
    label: "Sockets you’ll unplug emotionally",
    unit: "sockets",
    description: "Projected from remaining weeks and routine resets.",
    calculationHint: "remainingWeeks × 1.0 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "keys-somewhere-safe",
    label: "Keys placed \"somewhere safe\"",
    unit: "key placements",
    description: "Estimated from remaining weeks and minor lapses.",
    calculationHint: "remainingWeeks × 0.8 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "drawers-opened-no-purpose",
    label: "Drawers opened without purpose",
    unit: "drawers",
    description: "Calculated from remaining weeks and idle moments.",
    calculationHint: "remainingWeeks × 2.2 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "shelves-dusted-incompletely",
    label: "Shelves dusted incompletely",
    unit: "shelves",
    description: "Based on remaining years and routine upkeep.",
    calculationHint: "remainingYears × 8.0 × lifestyleFactor",
    affectedBy: ["lifestyle", "age"]
  },
  {
    id: "plants-killed-good-intentions",
    label: "Plants slowly killed by good intentions",
    unit: "plants",
    description: "Projected from remaining years and household care.",
    calculationHint: "remainingYears × 1.0 × lifestyleFactor",
    affectedBy: ["lifestyle", "age"]
  },
  {
    id: "mugs-sentimental",
    label: "Mugs assigned sentimental value",
    unit: "mugs",
    description: "Estimated from remaining years and routine drift.",
    calculationHint: "remainingYears × 1.6 × lifestyleFactor",
    affectedBy: ["lifestyle", "age"]
  },
  {
    id: "minutes-doorways",
    label: "Minutes spent standing in doorways",
    unit: "minutes",
    description: "Based on remaining weeks and habitual pauses.",
    calculationHint: "remainingWeeks × 12 × habitsFactor",
    affectedBy: ["habits"]
  },
  {
    id: "alarms-snoozed",
    label: "Alarms snoozed with confidence",
    unit: "alarms",
    description: "Projected from remaining weeks and routine pacing.",
    calculationHint: "remainingWeeks × 3.1 × habitsFactor",
    affectedBy: ["habits"]
  },
  {
    id: "emails-reread",
    label: "Emails reread but not sent",
    unit: "emails",
    description: "Estimated from remaining weeks and cautious timing.",
    calculationHint: "remainingWeeks × 5.0 × optimismFactor × habitsFactor",
    affectedBy: ["optimism", "habits"]
  },
  {
    id: "lists-rewritten",
    label: "Lists rewritten instead of finished",
    unit: "lists",
    description: "Based on remaining weeks and incremental deferral.",
    calculationHint: "remainingWeeks × 1.2 × optimismFactor",
    affectedBy: ["optimism"]
  },
  {
    id: "decisions-postponed",
    label: "Decisions postponed by sleep",
    unit: "decisions",
    description: "Projected from remaining weeks and routine deferral.",
    calculationHint: "remainingWeeks × 0.9 × optimismFactor",
    affectedBy: ["optimism"]
  },
  {
    id: "moments-waiting-right-time",
    label: "Moments waiting for \"the right time\"",
    unit: "moments",
    description: "Estimated from remaining weeks and cautious timing.",
    calculationHint: "remainingWeeks × 4.2 × optimismFactor",
    affectedBy: ["optimism"]
  },
  {
    id: "evenings-scrolling",
    label: "Evenings lost to scrolling",
    unit: "evenings",
    description: "Based on remaining weeks and routine unwinding.",
    calculationHint: "remainingWeeks × 1.5 × habitsFactor",
    affectedBy: ["habits"]
  },
  {
    id: "plans-almost-made",
    label: "Plans almost made",
    unit: "plans",
    description: "Projected from remaining weeks and mild hesitation.",
    calculationHint: "remainingWeeks × 1.0 × optimismFactor",
    affectedBy: ["optimism"]
  },
  {
    id: "weekends-underestimated",
    label: "Weekends underestimated",
    unit: "weekends",
    description: "Estimated from remaining years and routine pacing.",
    calculationHint: "remainingYears × 20 × lifestyleFactor",
    affectedBy: ["lifestyle", "age"]
  },
  {
    id: "mondays-anticipated",
    label: "Mondays emotionally anticipated",
    unit: "mondays",
    description: "Based on remaining weeks and routine cadence.",
    calculationHint: "remainingWeeks × 1.0 × habitsFactor",
    affectedBy: ["habits"]
  },
  {
    id: "conversations-ended-too-late",
    label: "Conversations ended too late",
    unit: "conversations",
    description: "Projected from remaining weeks and social cadence.",
    calculationHint: "remainingWeeks × 2.2 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "goodbyes-too-long",
    label: "Goodbyes that lasted longer than necessary",
    unit: "goodbyes",
    description: "Estimated from remaining weeks and social pacing.",
    calculationHint: "remainingWeeks × 1.2 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "names-forgotten",
    label: "Names forgotten immediately",
    unit: "names",
    description: "Based on remaining weeks and routine social exposure.",
    calculationHint: "remainingWeeks × 1.0 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "eye-contact-too-long",
    label: "Eye contact held one second too long",
    unit: "seconds",
    description: "Projected from remaining weeks and social timing.",
    calculationHint: "remainingWeeks × 3.0 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "laughs-politeness",
    label: "Laughs given out of politeness",
    unit: "laughs",
    description: "Estimated from remaining weeks and social routine.",
    calculationHint: "remainingWeeks × 4.0 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "stories-nodded-through",
    label: "Stories nodded through",
    unit: "stories",
    description: "Based on remaining weeks and social endurance.",
    calculationHint: "remainingWeeks × 2.3 × lifestyleFactor",
    affectedBy: ["lifestyle"]
  },
  {
    id: "opinions-withheld",
    label: "Opinions withheld successfully",
    unit: "opinions",
    description: "Projected from remaining weeks and cautious tone.",
    calculationHint: "remainingWeeks × 2.8 × optimismFactor",
    affectedBy: ["optimism"]
  },
  {
    id: "apologies-preemptive",
    label: "Apologies issued preemptively",
    unit: "apologies",
    description: "Estimated from remaining weeks and social cadence.",
    calculationHint: "remainingWeeks × 1.3 × optimismFactor",
    affectedBy: ["optimism"]
  },
  {
    id: "messages-deleted",
    label: "Messages typed but deleted",
    unit: "messages",
    description: "Based on remaining weeks and cautious timing.",
    calculationHint: "remainingWeeks × 2.5 × optimismFactor",
    affectedBy: ["optimism"]
  },
  {
    id: "clarity-ignored",
    label: "Moments of sudden clarity ignored",
    unit: "moments",
    description: "Projected from remaining weeks and routine drift.",
    calculationHint: "remainingWeeks × 1.1 × optimismFactor",
    affectedBy: ["optimism"]
  }
];

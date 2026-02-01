"use client";

import React from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { Assumptions, AbsurdityTone, LifeExpectancy } from "../types";
import { getAdjustedLifeExpectancyAge, getHealthProfile } from "../lib/calc";

type AssumptionsPanelProps = {
  value: Assumptions;
  onChange: (next: Assumptions) => void;
};

const lifeExpectancyOptions: { value: LifeExpectancy; label: string }[] = [
  { value: "short", label: "Short" },
  { value: "average", label: "Average" },
  { value: "optimistic", label: "Optimistic" }
];

const toneOptions: { value: AbsurdityTone; label: string }[] = [
  { value: "dry", label: "Dry" },
  { value: "bleak", label: "Bleak" },
  { value: "bureaucratic", label: "Bureaucratic" },
  { value: "cosmic", label: "Cosmic" }
];

const healthMarks = [
  { value: 1, label: "Poor" },
  { value: 2, label: "Fair" },
  { value: 3, label: "OK" },
  { value: 4, label: "Good" },
  { value: 5, label: "Great" }
];

const eatingMarks = [
  { value: 1, label: "Ultra-processed" },
  { value: 2, label: "Convenience" },
  { value: 3, label: "Mixed" },
  { value: 4, label: "Mostly whole" },
  { value: 5, label: "Whole-food" }
];

export default function AssumptionsPanel({ value, onChange }: AssumptionsPanelProps) {
  const adjustedLifeExpectancy = getAdjustedLifeExpectancyAge(value);
  const healthProfile = getHealthProfile(value);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Settings</Typography>
      <TextField
        label="Age"
        type="number"
        inputProps={{ min: 0, max: 120 }}
        value={value.age}
        onChange={(event) =>
          onChange({ ...value, age: Number(event.target.value) || 0 })
        }
      />

      <Typography variant="subtitle2" color="text.secondary">
        Health condition (1–5)
      </Typography>
      <Slider
        value={value.healthCondition}
        min={1}
        max={5}
        step={1}
        marks={healthMarks}
        valueLabelDisplay="auto"
        onChange={(_, next) =>
          onChange({ ...value, healthCondition: Number(next) })
        }
      />

      <Typography variant="subtitle2" color="text.secondary">
        Eating habits
      </Typography>
      <Slider
        value={value.eatingHabits}
        min={1}
        max={5}
        step={1}
        marks={eatingMarks}
        valueLabelDisplay="auto"
        onChange={(_, next) =>
          onChange({ ...value, eatingHabits: Number(next) })
        }
      />

      <Typography variant="body2" color="text.secondary">
        Projected health: {healthProfile.label} — {healthProfile.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Adjusted life expectancy: {adjustedLifeExpectancy}
      </Typography>

      <Divider />

      <Typography variant="h6">Assumptions</Typography>

      <Typography variant="subtitle2" color="text.secondary">
        Life expectancy
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={value.lifeExpectancy}
        onChange={(_, next) =>
          next && onChange({ ...value, lifeExpectancy: next })
        }
        size="small"
      >
        {lifeExpectancyOptions.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Typography variant="subtitle2" color="text.secondary">
        Coffees/day
      </Typography>
      <Slider
        value={value.coffeesPerDay}
        min={0}
        max={6}
        step={1}
        marks
        valueLabelDisplay="auto"
        onChange={(_, next) =>
          onChange({ ...value, coffeesPerDay: Number(next) })
        }
      />

      <Typography variant="subtitle2" color="text.secondary">
        Workdays/week
      </Typography>
      <Slider
        value={value.workdaysPerWeek}
        min={0}
        max={7}
        step={1}
        marks
        valueLabelDisplay="auto"
        onChange={(_, next) =>
          onChange({ ...value, workdaysPerWeek: Number(next) })
        }
      />

      <Typography variant="subtitle2" color="text.secondary">
        Optimism
      </Typography>
      <Slider
        value={value.optimism}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        onChange={(_, next) => onChange({ ...value, optimism: Number(next) })}
      />

      <FormControl>
        <InputLabel id="tone-label">Absurdity tone</InputLabel>
        <Select
          labelId="tone-label"
          label="Absurdity tone"
          value={value.tone}
          onChange={(event) =>
            onChange({ ...value, tone: event.target.value as AbsurdityTone })
          }
        >
          {toneOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

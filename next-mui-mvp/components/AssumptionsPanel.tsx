"use client";

import React from "react";
import {
  Box,
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

export default function AssumptionsPanel({ value, onChange }: AssumptionsPanelProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Assumptions</Typography>
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

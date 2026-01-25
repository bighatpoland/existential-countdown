"use client";

import React from "react";
import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";

type AssumptionCardProps = {
  label: string;
  value: number;
  unit: string;
  description: string;
  onOpen?: () => void;
};

export default function AssumptionCard({
  label,
  value,
  unit,
  description,
  onOpen
}: AssumptionCardProps) {
  return (
    <Card variant="outlined">
      <CardActionArea onClick={onOpen} disabled={!onOpen}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            {label}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {value.toLocaleString("en-US")}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {unit}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

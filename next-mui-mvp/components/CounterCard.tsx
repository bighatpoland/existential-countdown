"use client";

import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

type CounterCardProps = {
  title: string;
  value: number;
  subtext: string;
  onOpen: () => void;
};

export default function CounterCard({
  title,
  value,
  subtext,
  onOpen
}: CounterCardProps) {
  return (
    <Card variant="outlined">
      <CardActionArea onClick={onOpen}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 600, mt: 1 }}>
            {value.toLocaleString("en-US")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {subtext}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

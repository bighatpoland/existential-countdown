"use client";

import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@mui/material";
import { Assumptions, CounterKind } from "../types";
import { getAssumptionsUsed, getFormula, getHowCalculated } from "../lib/copy";

type DetailsDrawerProps = {
  open: boolean;
  onClose: () => void;
  kind: CounterKind | null;
  assumptions: Assumptions;
  variant: "drawer" | "dialog";
};

const titleMap: Record<CounterKind, string> = {
  coffees: "Coffees left",
  sundays: "Sundays remaining",
  workdays: "Workdays remaining",
  nextWeek: "Next week I’ll start"
};

export default function DetailsDrawer({
  open,
  onClose,
  kind,
  assumptions,
  variant
}: DetailsDrawerProps) {
  if (!kind) return null;

  const content = (
    <Box sx={{ width: { xs: "100%", sm: 420 }, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        How it’s calculated
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {getHowCalculated(kind)}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" color="text.secondary">
        Formula
      </Typography>
      <Typography variant="body1" sx={{ mt: 0.5 }}>
        {getFormula(kind)}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Assumptions used
      </Typography>
      <List dense>
        {getAssumptionsUsed(assumptions).map((item) => (
          <ListItem key={item} disableGutters>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="text.secondary">
        Estimates are fictional. Feelings are real.
      </Typography>
    </Box>
  );

  if (variant === "dialog") {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{titleMap[kind]}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ p: 1, minWidth: 360 }}>
        <Typography variant="h6" sx={{ px: 2, pt: 1 }}>
          {titleMap[kind]}
        </Typography>
        {content}
      </Box>
    </Drawer>
  );
}

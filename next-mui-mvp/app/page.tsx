"use client";

import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CounterCard from "../components/CounterCard";
import AssumptionCard from "../components/AssumptionCard";
import AssumptionsPanel from "../components/AssumptionsPanel";
import DetailsDrawer from "../components/DetailsDrawer";
import { ColorModeContext } from "./providers";
import { Assumptions, CounterKind, LifeAssumption, Snapshot } from "../types";
import {
  getCoffeesLeft,
  getNextWeekStartRemaining,
  getSundaysRemaining,
  getWorkdaysRemaining
} from "../lib/calc";
import { getAssumptionValue } from "../lib/assumptionCalc";
import { getSubtext } from "../lib/copy";
import { assumptionsBase } from "../lib/assumptionsBase";
import {
  clearAssumptions,
  loadAssumptions,
  loadSnapshots,
  saveAssumptions,
  saveSnapshots
} from "../lib/storage";

const defaultAssumptions: Assumptions = {
  age: 30,
  lifeExpectancy: "average",
  coffeesPerDay: 2,
  workdaysPerWeek: 5,
  optimism: 5,
  tone: "dry"
};

const getRandomAssumptionSet = (count?: number) => {
  const size = count ?? 9;
  const shuffled = [...assumptionsBase].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, size);
};

export default function HomePage() {
  const theme = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);

  const [draftAssumptions, setDraftAssumptions] = React.useState<Assumptions>(
    defaultAssumptions
  );
  const [assumptions, setAssumptions] = React.useState<Assumptions>(
    defaultAssumptions
  );
  const [assumptionsOpen, setAssumptionsOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [detailsKind, setDetailsKind] = React.useState<CounterKind | null>(
    null
  );
  const [assumptionSet, setAssumptionSet] = React.useState<LifeAssumption[]>(
    []
  );
  const [assumptionMessage, setAssumptionMessage] = React.useState<
    string | null
  >(null);
  const [assumptionDetailsOpen, setAssumptionDetailsOpen] =
    React.useState(false);
  const [assumptionDetails, setAssumptionDetails] =
    React.useState<LifeAssumption | null>(null);
  const [snapshots, setSnapshots] = React.useState<Snapshot[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const saved = loadAssumptions();
    const savedSnapshots = loadSnapshots();
    if (saved) {
      const merged = { ...defaultAssumptions, ...saved };
      setAssumptions(merged);
      setDraftAssumptions(merged);
    }
    if (savedSnapshots.length) {
      setSnapshots(savedSnapshots);
    }
  }, []);

  React.useEffect(() => {
    setAssumptionSet(getRandomAssumptionSet());
  }, []);

  React.useEffect(() => {
    const handle = setTimeout(() => {
      setAssumptions(draftAssumptions);
    }, 150);
    return () => clearTimeout(handle);
  }, [draftAssumptions]);

  React.useEffect(() => {
    saveAssumptions(assumptions);
  }, [assumptions]);

  const handleReset = () => {
    setDraftAssumptions(defaultAssumptions);
    setAssumptions(defaultAssumptions);
    clearAssumptions();
  };

  const handleReloadAssumptions = () => {
    setAssumptionSet(getRandomAssumptionSet());
    setAssumptionMessage("Assumptions updated.");
    window.setTimeout(() => setAssumptionMessage(null), 2000);
  };

  const handleOpenDetails = (kind: CounterKind) => {
    setDetailsKind(kind);
    setDetailsOpen(true);
  };

  const handleOpenAssumptionDetails = (item: LifeAssumption) => {
    setAssumptionDetails(item);
    setAssumptionDetailsOpen(true);
  };

  const handleSaveSnapshot = () => {
    const next: Snapshot = {
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString(),
      sundays: getSundaysRemaining(assumptions),
      coffees: getCoffeesLeft(assumptions)
    };
    const updated = [next, ...snapshots].slice(0, 3);
    setSnapshots(updated);
    saveSnapshots(updated);
  };

  const coffeesLeft = getCoffeesLeft(assumptions);
  const sundaysRemaining = getSundaysRemaining(assumptions);
  const workdaysRemaining = getWorkdaysRemaining(assumptions);
  const nextWeekRemaining = getNextWeekStartRemaining(assumptions);

  if (!mounted) {
    return <Box sx={{ minHeight: "100vh" }} />;
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Existential Countdown
          </Typography>

          {!isDesktop && (
            <Tooltip title="Assumptions">
              <IconButton onClick={() => setAssumptionsOpen(true)}>
                <TuneIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="About">
            <IconButton onClick={() => setAboutOpen(true)}>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Toggle theme">
            <IconButton onClick={toggleColorMode}>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset">
            <IconButton onClick={handleReset}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container sx={{ flex: 1, py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={7}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" color="text.secondary">
                Set assumptions.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CounterCard
                    title="Coffees left"
                    value={coffeesLeft}
                    subtext={getSubtext("coffees", assumptions)}
                    onOpen={() => handleOpenDetails("coffees")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CounterCard
                    title="Sundays remaining"
                    value={sundaysRemaining}
                    subtext={getSubtext("sundays", assumptions)}
                    onOpen={() => handleOpenDetails("sundays")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CounterCard
                    title="Workdays remaining"
                    value={workdaysRemaining}
                    subtext={getSubtext("workdays", assumptions)}
                    onOpen={() => handleOpenDetails("workdays")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CounterCard
                    title="Next week I’ll start"
                    value={nextWeekRemaining}
                    subtext={getSubtext("nextWeek", assumptions)}
                    onOpen={() => handleOpenDetails("nextWeek")}
                  />
                </Grid>
              </Grid>

              <Divider />

              <Stack spacing={1}>
                <Typography variant="subtitle1" color="text.secondary">
                  Assumptions base
                </Typography>
                <Grid container spacing={2}>
                  {assumptionSet.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                      <AssumptionCard
                        label={item.label}
                        value={getAssumptionValue(assumptions, item)}
                        unit={item.unit}
                        description={item.description}
                        onOpen={() => handleOpenAssumptionDetails(item)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Snapshot
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Stack spacing={1.5}>
                    <Button variant="outlined" onClick={handleSaveSnapshot}>
                      Save snapshot
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AutorenewIcon />}
                      onClick={handleReloadAssumptions}
                    >
                      New set of assumptions
                    </Button>
                    {assumptionMessage && (
                      <Typography variant="caption" color="text.secondary">
                        {assumptionMessage}
                      </Typography>
                    )}
                  </Stack>
                  <Stack spacing={1}>
                    {snapshots.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        No snapshots yet.
                      </Typography>
                    ) : (
                      snapshots.map((snapshot) => (
                        <Typography key={snapshot.id} variant="body2">
                          {snapshot.date} — {snapshot.sundays} Sundays, {snapshot.coffees} coffees
                        </Typography>
                      ))
                    )}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {isDesktop && (
            <Grid item xs={12} md={4} lg={5}>
              <Box sx={{ position: "sticky", top: 88 }}>
                <AssumptionsPanel
                  value={draftAssumptions}
                  onChange={setDraftAssumptions}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {!isDesktop && (
        <Drawer
          anchor="right"
          open={assumptionsOpen}
          onClose={() => setAssumptionsOpen(false)}
        >
          <Box sx={{ width: 320, p: 2 }}>
            <AssumptionsPanel
              value={draftAssumptions}
              onChange={setDraftAssumptions}
            />
          </Box>
        </Drawer>
      )}

      <DetailsDrawer
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        kind={detailsKind}
        assumptions={assumptions}
        variant={isDesktop ? "drawer" : "dialog"}
      />

      <Dialog
        open={assumptionDetailsOpen}
        onClose={() => setAssumptionDetailsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{assumptionDetails?.label}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              {assumptionDetails?.description}
            </Typography>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Calculation
              </Typography>
              <Typography variant="body2">
                {assumptionDetails?.calculationHint}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Affected by
              </Typography>
              <Stack spacing={0.5}>
                {assumptionDetails?.affectedBy.map((item) => (
                  <Typography key={item} variant="body2">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssumptionDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            A one-page meditation on the arithmetic of ordinary habits. No tracking,
            no judgment. Just the numbers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

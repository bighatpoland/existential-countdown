import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SaveIcon from '@mui/icons-material/Save';
import { SpeedInsights } from '@vercel/speed-insights/next';

type LifeExpectancyMode = 'short' | 'average' | 'optimistic';
type UnitMode = 'weekly' | 'yearly';
type AbsurdityLevel = 'dry' | 'bleak' | 'bureaucratic' | 'cosmic';
type MetricId = 'coffees' | 'sundays' | 'next-week';

type Assumptions = {
  age: number;
  lifeExpectancyMode: LifeExpectancyMode;
  coffeesPerDay: number;
  optimism: number;
  unitMode: UnitMode;
  absurdity: AbsurdityLevel;
};

type Snapshot = {
  timestamp: string;
  coffeesLeft: number;
  sundaysRemaining: number;
  nextWeekStarts: number;
};

const STORAGE_KEY = 'existentialCountdown.settings.v1';
const SNAPSHOT_KEY = 'existentialCountdown.snapshots.v1';

const defaultAssumptions: Assumptions = {
  age: 30,
  lifeExpectancyMode: 'average',
  coffeesPerDay: 2,
  optimism: 6,
  unitMode: 'weekly',
  absurdity: 'dry',
};

const LIFE_EXPECTANCY: Record<LifeExpectancyMode, number> = {
  short: 70,
  average: 80,
  optimistic: 90,
};

const formatNumber = (value: number) => Math.floor(value).toLocaleString('en-US');

const getMicrocopy = (tone: AbsurdityLevel) => {
  const base = {
    prompt: 'Set your assumptions.',
    disclaimer: 'This is not advice. Just math.',
    about: 'No motivation. Just math.',
  };

  if (tone === 'bleak') {
    return {
      ...base,
      prompt: 'Set your assumptions. The numbers will comply.',
      disclaimer: 'This is not advice. It is arithmetic.',
      about: 'No motivation. Just arithmetic.',
    };
  }

  if (tone === 'bureaucratic') {
    return {
      ...base,
      prompt: 'Provide inputs to generate outputs.',
      disclaimer: 'This is not advice. It is a calculation.',
      about: 'No motivation. Just calculation.',
    };
  }

  if (tone === 'cosmic') {
    return {
      ...base,
      prompt: 'Set your assumptions. The ledger unfolds.',
      disclaimer: 'This is not advice. It is a ledger.',
      about: 'No motivation. Just a ledger.',
    };
  }

  return base;
};

const getCoffeesSubtext = (tone: AbsurdityLevel, coffeesPerDay: number, lifeExpectancy: number) => {
  const text = `Assuming ${coffeesPerDay} per day until age ${lifeExpectancy}.`;
  if (tone === 'bureaucratic') {
    return `Projected at ${coffeesPerDay} per day until age ${lifeExpectancy}.`;
  }
  if (tone === 'bleak') {
    return `Assuming ${coffeesPerDay}/day until age ${lifeExpectancy}.`;
  }
  return text;
};

const getSundaysSubtext = (tone: AbsurdityLevel, lifeExpectancy: number, unitMode: UnitMode) => {
  const unit = unitMode === 'weekly' ? 'Weeks' : 'Years';
  if (tone === 'bureaucratic') {
    return `${unit} remaining until age ${lifeExpectancy}.`;
  }
  return `${unit} until age ${lifeExpectancy}.`;
};

const getNextWeekSubtext = (tone: AbsurdityLevel) => {
  if (tone === 'bureaucratic') {
    return 'Computed from optimism and weekly habit frequency.';
  }
  if (tone === 'bleak') {
    return 'Based on optimism and habit frequency.';
  }
  if (tone === 'cosmic') {
    return 'Based on optimism and habit frequency.';
  }
  return 'Based on optimism and habit frequency.';
};

export default function App() {
  const [assumptions, setAssumptions] = useState<Assumptions>(defaultAssumptions);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricId | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const assumptionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { assumptions?: Assumptions; themeMode?: 'light' | 'dark' };
        if (parsed.assumptions) {
          setAssumptions({ ...defaultAssumptions, ...parsed.assumptions });
        }
        if (parsed.themeMode) {
          setThemeMode(parsed.themeMode);
        }
      }
      const storedSnapshots = localStorage.getItem(SNAPSHOT_KEY);
      if (storedSnapshots) {
        const parsedSnapshots = JSON.parse(storedSnapshots) as Snapshot[];
        setSnapshots(parsedSnapshots);
      }
    } catch (error) {
      console.error('Failed to load stored settings', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ assumptions, themeMode })
      );
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  }, [assumptions, themeMode]);

  useEffect(() => {
    try {
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots));
    } catch (error) {
      console.error('Failed to save snapshots', error);
    }
  }, [snapshots]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          background: {
            default: themeMode === 'dark' ? '#0b0b0b' : '#f5f5f5',
            paper: themeMode === 'dark' ? '#121212' : '#ffffff',
          },
        },
        typography: {
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        },
      }),
    [themeMode]
  );

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const toneCopy = getMicrocopy(assumptions.absurdity);

  const lifeExpectancy = LIFE_EXPECTANCY[assumptions.lifeExpectancyMode];
  const yearsRemaining = Math.max(0, lifeExpectancy - assumptions.age);
  const daysRemaining = yearsRemaining * 365.25;
  const weeksRemaining = yearsRemaining * 52.1429;

  const coffeesLeft = Math.max(0, Math.floor(daysRemaining * assumptions.coffeesPerDay));
  const sundaysRemaining = Math.max(0, Math.floor(weeksRemaining));
  const yearsRemainingRounded = Math.max(0, Math.floor(yearsRemaining));
  const nextWeekStarts = Math.max(0, Math.floor(sundaysRemaining * (assumptions.optimism / 10)));

  const displayedSundaysValue = assumptions.unitMode === 'weekly' ? sundaysRemaining : yearsRemainingRounded;

  const handleResetDefaults = () => {
    setAssumptions(defaultAssumptions);
  };

  const handleResetAll = () => {
    setAssumptions(defaultAssumptions);
    setThemeMode('dark');
    setSnapshots([]);
    setSelectedMetric(null);
    setDetailsOpen(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SNAPSHOT_KEY);
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  };

  const handleSelectMetric = (metric: MetricId) => {
    setSelectedMetric(metric);
    if (!isDesktop) {
      setDetailsOpen(true);
    }
  };

  const handleOpenAssumptions = () => {
    if (isDesktop) {
      assumptionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setAssumptionsOpen(true);
  };

  const handleSaveSnapshot = () => {
    const snapshot: Snapshot = {
      timestamp: new Date().toISOString(),
      coffeesLeft,
      sundaysRemaining: displayedSundaysValue,
      nextWeekStarts,
    };
    setSnapshots((prev) => [...prev, snapshot]);
  };

  const latestSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;

  const getMetricDetails = (metric: MetricId | null) => {
    if (!metric) {
      return {
        title: 'Select a counter',
        formula: 'Click a card to see its calculation.',
        assumptions: [],
      };
    }

    if (metric === 'coffees') {
      return {
        title: 'Coffees left',
        formula: 'coffeesLeft = max(0, floor((lifeExpectancy - age) × 365.25 × coffeesPerDay))',
        assumptions: [
          `Age: ${assumptions.age}`,
          `Life expectancy: ${lifeExpectancy}`,
          `Coffees per day: ${assumptions.coffeesPerDay}`,
          'Calendar year = 365.25 days',
          'No habit change modeled',
        ],
      };
    }

    if (metric === 'sundays') {
      return {
        title: 'Sundays remaining',
        formula: 'sundaysRemaining = max(0, floor((lifeExpectancy - age) × 52.1429))',
        assumptions: [
          `Age: ${assumptions.age}`,
          `Life expectancy: ${lifeExpectancy}`,
          '52.1429 weeks per year',
        ],
      };
    }

    return {
      title: '“Next week I’ll start” remaining',
      formula: 'nextWeekStarts = max(0, floor(sundaysRemaining × (optimism ÷ 10)))',
      assumptions: [
        `Optimism: ${assumptions.optimism}/10`,
        'Habit frequency: weekly',
        'Derived from remaining weeks',
      ],
    };
  };

  const details = getMetricDetails(selectedMetric);

  const renderAssumptionsPanel = () => (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Stack spacing={0.5}>
        <Typography variant="h6">Assumptions</Typography>
        <Typography variant="body2" color="text.secondary">
          Updates apply instantly.
        </Typography>
      </Stack>

      <TextField
        label="Age"
        type="number"
        value={assumptions.age}
        helperText="Years lived so far."
        onChange={(event) =>
          setAssumptions((prev) => ({
            ...prev,
            age: Math.max(0, Number.parseInt(event.target.value || '0', 10)),
          }))
        }
        fullWidth
      />

      <Stack spacing={1}>
        <Typography variant="subtitle2">Life expectancy</Typography>
        <ToggleButtonGroup
          value={assumptions.lifeExpectancyMode}
          exclusive
          onChange={(_, value) => value && setAssumptions((prev) => ({ ...prev, lifeExpectancyMode: value }))}
          size="small"
        >
          <ToggleButton value="short">Short</ToggleButton>
          <ToggleButton value="average">Average</ToggleButton>
          <ToggleButton value="optimistic">Optimistic</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="subtitle2">Coffees per day</Typography>
        <Slider
          value={assumptions.coffeesPerDay}
          min={0}
          max={6}
          step={1}
          marks
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            setAssumptions((prev) => ({
              ...prev,
              coffeesPerDay: Array.isArray(value) ? value[0] : value,
            }))
          }
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="subtitle2">Optimism</Typography>
        <Slider
          value={assumptions.optimism}
          min={0}
          max={10}
          step={1}
          marks
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            setAssumptions((prev) => ({
              ...prev,
              optimism: Array.isArray(value) ? value[0] : value,
            }))
          }
        />
      </Stack>

      <Stack spacing={1}>
        <Typography variant="subtitle2">Tone</Typography>
        <FormControl fullWidth size="small">
          <InputLabel id="absurdity-label">Absurdity</InputLabel>
          <Select
            labelId="absurdity-label"
            label="Absurdity"
            value={assumptions.absurdity}
            onChange={(event) =>
              setAssumptions((prev) => ({
                ...prev,
                absurdity: event.target.value as AbsurdityLevel,
              }))
            }
          >
            <MenuItem value="dry">Dry</MenuItem>
            <MenuItem value="bleak">Bleak</MenuItem>
            <MenuItem value="bureaucratic">Bureaucratic</MenuItem>
            <MenuItem value="cosmic">Cosmic</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <FormControlLabel
        control={
          <Switch
            checked={assumptions.unitMode === 'yearly'}
            onChange={(event) =>
              setAssumptions((prev) => ({
                ...prev,
                unitMode: event.target.checked ? 'yearly' : 'weekly',
              }))
            }
          />
        }
        label="Yearly phrasing"
      />

      <Typography variant="body2" color="text.secondary">
        Time zone: {Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local'}
      </Typography>

      <Stack direction="row" spacing={1}>
        <Button variant="outlined" onClick={handleResetDefaults} fullWidth>
          Reset to defaults
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Existential Countdown
          </Typography>
          <Tooltip title="Assumptions">
            <IconButton color="inherit" onClick={handleOpenAssumptions}>
              <TuneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="About">
            <IconButton color="inherit" onClick={() => setAboutOpen(true)}>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Theme">
            <IconButton color="inherit" onClick={() => setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}>
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton color="inherit" onClick={handleResetAll}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                {toneCopy.prompt}
              </Typography>

              <Card>
                <CardActionArea onClick={() => handleSelectMetric('coffees')}>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      Coffees left
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                      {formatNumber(coffeesLeft)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {getCoffeesSubtext(assumptions.absurdity, assumptions.coffeesPerDay, lifeExpectancy)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card>
                <CardActionArea onClick={() => handleSelectMetric('sundays')}>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      Sundays remaining
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                      {formatNumber(displayedSundaysValue)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {getSundaysSubtext(assumptions.absurdity, lifeExpectancy, assumptions.unitMode)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card>
                <CardActionArea onClick={() => handleSelectMetric('next-week')}>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      “Next week I’ll start” remaining
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mt: 1 }}>
                      {formatNumber(nextWeekStarts)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {getNextWeekSubtext(assumptions.absurdity)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Paper sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Typography variant="h6">Snapshot</Typography>
                  <Button startIcon={<SaveIcon />} variant="outlined" onClick={handleSaveSnapshot}>
                    Save snapshot
                  </Button>
                </Stack>
                <Divider sx={{ my: 2 }} />
                {latestSnapshot ? (
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Coffees left"
                        secondary={`Today: ${formatNumber(coffeesLeft)} | Last saved: ${formatNumber(latestSnapshot.coffeesLeft)} | Δ ${formatNumber(coffeesLeft - latestSnapshot.coffeesLeft)}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Sundays remaining"
                        secondary={`Today: ${formatNumber(displayedSundaysValue)} | Last saved: ${formatNumber(latestSnapshot.sundaysRemaining)} | Δ ${formatNumber(displayedSundaysValue - latestSnapshot.sundaysRemaining)}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Next week I’ll start"
                        secondary={`Today: ${formatNumber(nextWeekStarts)} | Last saved: ${formatNumber(latestSnapshot.nextWeekStarts)} | Δ ${formatNumber(nextWeekStarts - latestSnapshot.nextWeekStarts)}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Last snapshot"
                        secondary={new Date(latestSnapshot.timestamp).toLocaleString()}
                      />
                    </ListItem>
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No snapshots saved yet.
                  </Typography>
                )}
              </Paper>

              {!isDesktop && (
                <Paper sx={{ p: 3 }}>
                  <Stack spacing={1.5}>
                    <Typography variant="h6">Assumptions</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {assumptions.age} years old · {assumptions.coffeesPerDay} coffees/day · {lifeExpectancy} expectancy
                    </Typography>
                    <Button variant="contained" onClick={() => setAssumptionsOpen(true)}>
                      Open assumptions
                    </Button>
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Stack spacing={3}>
              <Paper ref={assumptionsRef}>{renderAssumptionsPanel()}</Paper>

              {isDesktop && (
                <Paper sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Typography variant="h6">How this is calculated</Typography>
                    <Typography variant="subtitle1">{details.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {details.formula}
                    </Typography>
                    {details.assumptions.length > 0 && (
                      <List dense>
                        {details.assumptions.map((item) => (
                          <ListItem key={item} sx={{ py: 0 }}>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {toneCopy.disclaimer}
                    </Typography>
                  </Stack>
                </Paper>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Drawer
        anchor="right"
        open={assumptionsOpen}
        onClose={() => setAssumptionsOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 340 }}>{renderAssumptionsPanel()}</Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 340, p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">How this is calculated</Typography>
            <Typography variant="subtitle1">{details.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {details.formula}
            </Typography>
            {details.assumptions.length > 0 && (
              <List dense>
                {details.assumptions.map((item) => (
                  <ListItem key={item} sx={{ py: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            )}
            <Typography variant="body2" color="text.secondary">
              {toneCopy.disclaimer}
            </Typography>
          </Stack>
        </Box>
      </Drawer>

      <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{toneCopy.about}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <SpeedInsights />
    </ThemeProvider>
  );
}

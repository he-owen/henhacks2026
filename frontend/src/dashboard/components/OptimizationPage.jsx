import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LocalLaundryServiceRoundedIcon from '@mui/icons-material/LocalLaundryServiceRounded';
import EvStationRoundedIcon from '@mui/icons-material/EvStationRounded';
import TvRoundedIcon from '@mui/icons-material/TvRounded';
import KitchenRoundedIcon from '@mui/icons-material/KitchenRounded';
import WaterRoundedIcon from '@mui/icons-material/WaterRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useAuth0 } from '@auth0/auth0-react';
import Copyright from '../internals/components/Copyright';
import { runDailyOptimizationMe, runWeeklyOptimizationMe, getUserPreferences } from '../../api';
import { usePage } from '../context/PageContext';

// ---------------------------------------------------------------------------
// Default 7×24 TOU pricing ($/kWh) — Mon–Sun
// ---------------------------------------------------------------------------
const DEFAULT_PRICES_BY_DAY = Array.from({ length: 7 }, (_, d) => {
  const weekend = d === 5 || d === 6;
  return Array.from({ length: 24 }, (__, h) => {
    if (h < 6)  return weekend ? 0.11 : 0.12; // super off-peak
    if (h < 9)  return weekend ? 0.14 : 0.15; // off-peak morning
    if (h < 14) return weekend ? 0.16 : 0.18; // shoulder
    if (h < 21) return weekend ? 0.17 : 0.28; // on-peak afternoon
    return weekend ? 0.13 : 0.15;             // off-peak evening
  });
});

const DEFAULT_USER_PREFERENCES = {
  availability: [0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23],
  // Hours the user is awake — TV and lights are only scheduled during these hours
  time_awake: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  thermostat_temp_home: 72,
  thermostat_temp_away: 78,
  hvac_lead_time: 1,
};

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function hourToTime(h) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function formatRunTimes(runTimes) {
  if (runTimes === 'continuous') return 'Running continuously';
  if (!runTimes || runTimes.length === 0) return 'Not scheduled today';
  const sorted = [...runTimes].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i <= sorted.length; i++) {
    if (i === sorted.length || sorted[i] !== prev + 1) {
      ranges.push(`${hourToTime(start)} – ${hourToTime(prev + 1)}`);
      if (i < sorted.length) { start = sorted[i]; prev = sorted[i]; }
    } else { prev = sorted[i]; }
  }
  return ranges.join(', ');
}

function applianceIcon(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('thermostat') || n.includes('hvac') || n.includes(' ac') || n.includes('air')) return <AcUnitRoundedIcon />;
  if (n.includes('ev') || n.includes('charger')) return <EvStationRoundedIcon />;
  if (n.includes('wash') || n.includes('dryer') || n.includes('laundry')) return <LocalLaundryServiceRoundedIcon />;
  if (n.includes('dish')) return <KitchenRoundedIcon />;
  if (n.includes('tv') || n.includes('television')) return <TvRoundedIcon />;
  if (n.includes('light') || n.includes('lamp')) return <LightbulbRoundedIcon />;
  if (n.includes('water heater') || n.includes('heater')) return <WaterRoundedIcon />;
  if (n.includes('fridge') || n.includes('refrigerator')) return <KitchenRoundedIcon />;
  return <BoltRoundedIcon />;
}

function runTimeChipColor(runTimes) {
  if (runTimes === 'continuous') return 'info';
  if (!runTimes || runTimes.length === 0) return 'default';
  const cheapest = Math.min(...runTimes);
  if (cheapest < 8 || cheapest >= 21) return 'success';
  if (cheapest < 14) return 'warning';
  return 'error';
}

// ---------------------------------------------------------------------------
// Device grouping
// ---------------------------------------------------------------------------
const DEVICE_GROUPS = [
  {
    key: 'climate',
    label: 'Climate',
    icon: <AcUnitRoundedIcon fontSize="small" />,
    matchType: (t) => ['ac', 'hvac', 'heat pump', 'heater', 'climate'].includes(t),
    matchName: (n) => n.includes('thermostat') || n.includes('hvac') || n.includes(' ac') || n.includes('air') || n.includes('heat'),
  },
  {
    key: 'laundry',
    label: 'Laundry',
    icon: <LocalLaundryServiceRoundedIcon fontSize="small" />,
    matchType: (t) => ['washer', 'dryer', 'laundry', 'washing machine'].includes(t),
    matchName: (n) => n.includes('wash') || n.includes('dryer') || n.includes('laundry'),
  },
  {
    key: 'kitchen',
    label: 'Kitchen',
    icon: <KitchenRoundedIcon fontSize="small" />,
    matchType: (t) => ['dishwasher', 'refrigerator', 'fridge', 'oven', 'microwave', 'kitchen appliance'].includes(t),
    matchName: (n) => n.includes('dish') || n.includes('fridge') || n.includes('refrigerator') || n.includes('oven') || n.includes('microwave'),
  },
  {
    key: 'ev',
    label: 'EV Charging',
    icon: <EvStationRoundedIcon fontSize="small" />,
    matchType: (t) => ['ev', 'electric vehicle', 'ev charger', 'charger'].includes(t),
    matchName: (n) => n.includes('ev') || n.includes('charger') || n.includes('electric vehicle'),
  },
  {
    key: 'water',
    label: 'Water Heating',
    icon: <WaterRoundedIcon fontSize="small" />,
    matchType: (t) => ['water heater', 'water heating', 'hot water'].includes(t),
    matchName: (n) => n.includes('water heater') || n.includes('water'),
  },
  {
    key: 'entertainment',
    label: 'Entertainment',
    icon: <TvRoundedIcon fontSize="small" />,
    matchType: (t) => ['tv', 'television', 'entertainment', 'media', 'speaker', 'display'].includes(t),
    matchName: (n) => n.includes('tv') || n.includes('television') || n.includes('speaker') || n.includes('entertainment'),
  },
  {
    key: 'lighting',
    label: 'Lighting',
    icon: <LightbulbRoundedIcon fontSize="small" />,
    matchType: (t) => ['light', 'lighting', 'lamp', 'bulb'].includes(t),
    matchName: (n) => n.includes('light') || n.includes('lamp') || n.includes('bulb'),
  },
];

// appliancesUsed: the appliances_used array from the API response (has device_type)
function groupSchedule(schedule, appliancesUsed = []) {
  // Build a name → device_type lookup from appliances_used
  const typeMap = {};
  appliancesUsed.forEach((a) => {
    if (a.name && a.device_type) typeMap[a.name] = a.device_type.toLowerCase().trim();
  });

  const grouped = {};
  DEVICE_GROUPS.forEach((g) => { grouped[g.key] = []; });
  grouped._other = [];

  schedule.forEach((item) => {
    const deviceType = typeMap[item.appliance] || '';
    const nameLower = (item.appliance || '').toLowerCase();
    // Try device_type first, then fall back to name
    const group = DEVICE_GROUPS.find((g) => g.matchType(deviceType)) ||
                  DEVICE_GROUPS.find((g) => g.matchName(nameLower));
    if (group) grouped[group.key].push(item);
    else grouped._other.push(item);
  });

  return grouped;
}

const STATIC_RECOMMENDATIONS = [
  {
    id: '1', icon: <AutoAwesomeRoundedIcon />, priority: 'high', savings: 'up to $30/mo',
    title: 'Run the daily optimizer',
    description: 'Click "Run Optimization" above to find the cheapest run windows for every device in your home based on today\'s time-of-use rates.',
  },
  {
    id: '2', icon: <AcUnitRoundedIcon />, priority: 'high', savings: '$15–25/mo',
    title: 'Pre-cool before on-peak hours',
    description: 'Set your thermostat to cool the home before 2 PM when rates spike. The optimizer automatically accounts for this if your HVAC is registered.',
  },
  {
    id: '3', icon: <LocalLaundryServiceRoundedIcon />, priority: 'high', savings: '$10–18/mo',
    title: 'Shift laundry to weekends',
    description: 'Weekend rates are typically 30–40% lower. Use "Find Best Days" below to pinpoint the cheapest day for your washing machine and dryer.',
  },
  {
    id: '4', icon: <EvStationRoundedIcon />, priority: 'high', savings: '$20–40/mo',
    title: 'Charge your EV overnight',
    description: 'Super off-peak rates between midnight and 6 AM are cheapest. The optimizer will slot EV charging into those windows automatically.',
  },
  {
    id: '5', icon: <KitchenRoundedIcon />, priority: 'medium', savings: '$5–10/mo',
    title: 'Delay the dishwasher',
    description: 'Use your dishwasher\'s delay-start feature to run after 9 PM. "Find Best Days" can also show which day of the week costs least.',
  },
  {
    id: '6', icon: <BoltRoundedIcon />, priority: 'low', savings: '$3–6/mo',
    title: 'Register all your devices',
    description: 'The more devices you add in the Devices tab, the more accurately the optimizer can schedule your home\'s full energy load.',
  },
];

const PRIORITY_COLOR = { high: 'error', medium: 'warning', low: 'default' };

// ---------------------------------------------------------------------------
// Convert saved preferences → optimizer user_preferences dict
// ---------------------------------------------------------------------------
function timeToHour(str) {
  return parseInt((str || '00:00').split(':')[0], 10);
}

function hoursInRange(start, end) {
  // Builds an array of hours [start .. end] handling midnight wrap (end < start)
  const hrs = [];
  if (end < start) {
    for (let h = start; h < 24; h++) hrs.push(h);
    for (let h = 0; h <= end; h++) hrs.push(h);
  } else {
    for (let h = start; h <= end; h++) hrs.push(h);
  }
  return hrs;
}

function buildOptimizerPrefs(savedPrefs, dayName) {
  if (!savedPrefs?.weeklySchedule) return DEFAULT_USER_PREFERENCES;
  const dayKey = (dayName || '').toLowerCase();
  const day = savedPrefs.weeklySchedule[dayKey] || {};

  const homeStart  = timeToHour(day.homeStart  ?? '17:00');
  const homeEnd    = timeToHour(day.homeEnd    ?? '08:00');
  const awakeStart = timeToHour(day.awakeStart ?? '06:00');
  const awakeEnd   = timeToHour(day.awakeEnd   ?? '23:00');

  return {
    availability:         hoursInRange(homeStart, homeEnd),
    time_awake:           hoursInRange(awakeStart, awakeEnd),
    thermostat_temp_home: savedPrefs.tempAwake   ?? 72,
    thermostat_temp_away: 78,   // keep default
    hvac_lead_time:       1,    // keep default
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const DAY_COLORS = {
  Monday: 'primary', Tuesday: 'primary', Wednesday: 'primary',
  Thursday: 'secondary', Friday: 'secondary',
  Saturday: 'success', Sunday: 'success',
};

// Map device_type / name → display icon for weekly cards
function weeklyIcon(name, deviceType) {
  const t = (deviceType || '').toLowerCase();
  const n = (name || '').toLowerCase();
  if (t === 'ev' || n.includes('ev') || n.includes('charger')) return <EvStationRoundedIcon />;
  if (t === 'tv' || t === 'television') return <TvRoundedIcon />;
  if (n.includes('wash') || n.includes('dryer') || n.includes('laundry')) return <LocalLaundryServiceRoundedIcon />;
  if (n.includes('dish')) return <KitchenRoundedIcon />;
  if (n.includes('light') || n.includes('lamp')) return <LightbulbRoundedIcon />;
  if (n.includes('water')) return <WaterRoundedIcon />;
  if (n.includes('heat') || n.includes('ac') || n.includes('hvac')) return <AcUnitRoundedIcon />;
  return <BoltRoundedIcon />;
}

export default function OptimizationPage() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const {
    optimizationResults: results, setOptimizationResults: setResults,
    weeklyScheduleResults, setWeeklyScheduleResults,
  } = usePage();
  const [running, setRunning] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [weeklyRunning, setWeeklyRunning] = React.useState(false);
  const [weeklyError, setWeeklyError] = React.useState(null);
  const [loadedPrefs, setLoadedPrefs] = React.useState(null);

  // Load the user's saved preferences once authenticated
  React.useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const prefs = await getUserPreferences(token);
        if (!cancelled && prefs) setLoadedPrefs(prefs);
      } catch {
        // Silently fall back to defaults if preferences can't be loaded
      }
    })();
    return () => { cancelled = true; };
  }, [isAuthenticated, getAccessTokenSilently]);

  const todayName = DAYS[new Date().getDay()];
  // Build optimizer prefs from saved preferences, falling back to defaults
  const userPreferences = React.useMemo(
    () => buildOptimizerPrefs(loadedPrefs, todayName),
    [loadedPrefs, todayName],
  );

  const handleRunWeeklySchedule = async () => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
      return;
    }
    setWeeklyRunning(true);
    setWeeklyError(null);
    try {
      const token = await getAccessTokenSilently();
      const data = await runWeeklyOptimizationMe(token, {
        pricesByDay: DEFAULT_PRICES_BY_DAY,
        userPreferences,
      });
      setWeeklyScheduleResults(data);
    } catch (err) {
      setWeeklyError(err.message || 'Weekly optimization failed');
    } finally {
      setWeeklyRunning(false);
    }
  };

  const handleRunOptimization = async () => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } });
      return;
    }
    setRunning(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const data = await runDailyOptimizationMe(token, {
        pricesByDay: DEFAULT_PRICES_BY_DAY,
        dayOfWeek: todayName,
        userPreferences,
      });
      setResults(data);
    } catch (err) {
      setError(err.message || 'Optimization failed');
    } finally {
      setRunning(false);
    }
  };

  const schedule = results?.schedule ?? [];
  const totalCost = results?.total_estimated_cost ?? null;
  const groupedSchedule = React.useMemo(
    () => groupSchedule(schedule, results?.appliances_used || []),
    [schedule, results],
  );

  const offPeakScore = React.useMemo(() => {
    if (!schedule.length) return 62;
    const cycleItems = schedule.filter(s => Array.isArray(s.run_times) && s.run_times.length > 0);
    if (!cycleItems.length) return 62;
    const offPeakCount = cycleItems.reduce(
      (acc, s) => acc + s.run_times.filter(h => h < 8 || h >= 21).length, 0
    );
    const totalCount = cycleItems.reduce((acc, s) => acc + s.run_times.length, 0);
    return totalCount ? Math.round((offPeakCount / totalCount) * 100) : 62;
  }, [schedule]);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* Header */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography component="h2" variant="h6">Optimization</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={running ? <CircularProgress size={14} color="inherit" /> : <AutoAwesomeRoundedIcon />}
          onClick={handleRunOptimization}
          disabled={running}
        >
          {running ? 'Analyzing…' : 'Run Optimization'}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Summary cards */}
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <SavingsRoundedIcon color="success" />
                <Typography variant="subtitle2" color="text.secondary">
                  Estimated daily cost
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ color: 'success.main' }}>
                {totalCost != null ? `$${totalCost.toFixed(2)}` : '$—'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {totalCost != null ? `Optimized for ${todayName}` : 'Run optimization to see your cost'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <AutoAwesomeRoundedIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">Off-peak score</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 0.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={results ? offPeakScore : 62}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
                />
                <Typography variant="h6">{results ? offPeakScore : 62}%</Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {results
                  ? 'Percentage of runtime scheduled in off-peak hours'
                  : 'Run optimization to calculate'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
          <Card variant="outlined" sx={{ height: '100%', bgcolor: results ? undefined : 'action.hover' }}>
            <CardContent>
              {results ? (
                <>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <CheckCircleRoundedIcon color="success" />
                    <Typography variant="subtitle2" fontWeight={600}>Schedule ready</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Optimal schedule computed for <strong>{todayName}</strong> across{' '}
                    <strong>{schedule.length}</strong> device{schedule.length !== 1 ? 's' : ''}.
                    Appliances are shifted to the cheapest available windows.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>How it works</Typography>
                  <Typography variant="body2" color="text.secondary">
                    The optimizer uses your registered devices, today's time-of-use rate schedule,
                    and your home availability to find the lowest-cost run times for every appliance.
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Schedule / Recommendations */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {results ? `Today's Schedule — ${todayName}` : 'Recommendations'}
      </Typography>

      {results ? (
        // ---------- Grouped accordion schedule ----------
        <Stack spacing={1}>
          {[...DEVICE_GROUPS, { key: '_other', label: 'Other', icon: <BoltRoundedIcon fontSize="small" /> }]
            .filter((g) => (groupedSchedule[g.key] || []).length > 0)
            .map((group) => {
              const items = groupedSchedule[group.key];
              const scheduledCount = items.filter(
                (i) => i.run_times === 'continuous' || (Array.isArray(i.run_times) && i.run_times.length > 0)
              ).length;
              return (
                <Accordion key={group.key} variant="outlined" defaultExpanded disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1, mr: 1 }}>
                      <Box sx={{ color: 'primary.main', display: 'flex' }}>{group.icon}</Box>
                      <Typography variant="subtitle2" fontWeight={600}>{group.label}</Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Chip
                        label={`${scheduledCount} / ${items.length} scheduled`}
                        size="small"
                        color={scheduledCount > 0 ? 'primary' : 'default'}
                        variant="outlined"
                      />
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    {items.map((item, idx) => {
                      const isScheduled =
                        item.run_times === 'continuous' ||
                        (Array.isArray(item.run_times) && item.run_times.length > 0);
                      return (
                        <React.Fragment key={item.appliance}>
                          {idx > 0 && <Divider />}
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ px: 2, py: 1.5 }}
                          >
                            <Box sx={{ color: 'text.secondary', display: 'flex', flexShrink: 0 }}>
                              {applianceIcon(item.appliance)}
                            </Box>
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {item.appliance}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {formatRunTimes(item.run_times)}
                              </Typography>
                            </Box>
                            <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
                              <Chip
                                icon={<ScheduleRoundedIcon />}
                                label={
                                  item.run_times === 'continuous'
                                    ? 'Continuous'
                                    : Array.isArray(item.run_times) && item.run_times.length
                                    ? `${item.run_times.length}h`
                                    : 'Skip'
                                }
                                size="small"
                                color={runTimeChipColor(item.run_times)}
                                variant="outlined"
                              />
                              {isScheduled && item.run_times !== 'continuous' && (
                                <Chip
                                  label="off-peak"
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                  sx={{ textTransform: 'none' }}
                                />
                              )}
                            </Stack>
                          </Stack>
                        </React.Fragment>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Stack>
      ) : (
        // ---------- Static recommendations ----------
        <Stack spacing={1.5}>
          {STATIC_RECOMMENDATIONS.map((rec) => (
            <Card key={rec.id} variant="outlined">
              <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ color: 'primary.main', display: 'flex' }}>{rec.icon}</Box>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight={600}>{rec.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{rec.description}</Typography>
                  </Box>
                  <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
                    <Chip label={rec.savings} size="small" color="success" variant="outlined" />
                    <Chip
                      label={rec.priority}
                      size="small"
                      color={PRIORITY_COLOR[rec.priority]}
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Best Day This Week section                                          */}
      {/* ------------------------------------------------------------------ */}
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}
      >
        <Box>
          <Typography component="h2" variant="h6">Best Day This Week</Typography>
          <Typography variant="body2" color="text.secondary">
            Cheapest day to run your high-wattage devices — laundry, dishes, EV, and more.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            weeklyRunning
              ? <CircularProgress size={14} color="inherit" />
              : <CalendarMonthRoundedIcon />
          }
          onClick={handleRunWeeklySchedule}
          disabled={weeklyRunning}
        >
          {weeklyRunning ? 'Analyzing…' : 'Find Best Days'}
        </Button>
      </Stack>

      {weeklyError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setWeeklyError(null)}>
          {weeklyError}
        </Alert>
      )}

      {weeklyScheduleResults ? (
        <Grid container spacing={2} columns={12}>
          {Object.entries(weeklyScheduleResults).map(([name, info]) => (
            <Grid key={name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent sx={{ pb: '16px !important' }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Box sx={{ color: 'primary.main', display: 'flex' }}>
                      {weeklyIcon(name)}
                    </Box>
                    <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ flexGrow: 1 }}>
                      {name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                    {info.best_day ? (
                      <Chip
                        icon={<CalendarMonthRoundedIcon />}
                        label={info.best_day}
                        size="small"
                        color={DAY_COLORS[info.best_day] || 'default'}
                        variant="filled"
                      />
                    ) : (
                      <Chip label="No window found" size="small" color="default" variant="outlined" />
                    )}
                    {info.estimated_cost != null && info.estimated_cost < Infinity && (
                      <Chip
                        icon={<SavingsRoundedIcon />}
                        label={`$${info.estimated_cost.toFixed(3)}`}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card variant="outlined" sx={{ bgcolor: 'action.hover' }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarMonthRoundedIcon color="disabled" sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>No weekly schedule yet</Typography>
                <Typography variant="body2" color="text.secondary">
                  Click "Find Best Days" to see which day of the week is cheapest for your devices.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

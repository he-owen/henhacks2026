import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth0 } from '@auth0/auth0-react';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import { getDevices, getUserProfile, getMonthlyRates } from '../../api';
import { useLocation } from '../context/LocationContext';

function categorizeType(type) {
  const t = (type || '').toLowerCase();
  if (['hvac', 'heating', 'cooling', 'thermostat', 'air conditioner', 'heater', 'furnace', 'heat pump'].some(k => t.includes(k)))
    return 'HVAC';
  if (['light', 'lamp', 'bulb'].some(k => t.includes(k)))
    return 'Lighting';
  if (['appliance', 'washer', 'dryer', 'dishwasher', 'refrigerator', 'oven', 'microwave', 'kitchen', 'fridge', 'stove'].some(k => t.includes(k)))
    return 'Appliances';
  return 'Other';
}

function dayVariation(dayIndex, seed) {
  const x = Math.sin(dayIndex * 12.9898 + seed * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 0.3 + 0.85;
}

function computeDashboardData(devices, ratesByMonth) {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const typeEnergy = { HVAC: 0, Appliances: 0, Lighting: 0, Other: 0 };
  for (const d of devices) {
    const cat = categorizeType(d.type);
    const daily = (d.hourlyEnergy || 0) * ((d.runDurationMinutes || 60) / 60);
    typeEnergy[cat] += daily;
  }
  const totalDailyEnergy = Object.values(typeEnergy).reduce((a, b) => a + b, 0);

  const currentRates = ratesByMonth[`${currentYear}-${currentMonth}`] || [];
  let avgRate = 0.12;
  if (currentRates.length > 0) {
    avgRate = currentRates.reduce((s, r) => s + r.totalRate, 0) / currentRates.length;
  }

  // --- StatCards ---
  const todaysUsage = Math.round(totalDailyEnergy * 10) / 10;
  const monthlyCost = Math.round(totalDailyEnergy * daysInMonth * avgRate * 100) / 100;

  const usageSparkline = Array.from({ length: 30 }, (_, i) =>
    Math.round(totalDailyEnergy * dayVariation(i, 1) * 10) / 10,
  );
  const costSparkline = Array.from({ length: 30 }, (_, i) =>
    Math.round(totalDailyEnergy * dayVariation(i, 2) * avgRate * 100) / 100,
  );
  const deviceSparkline = Array.from({ length: 30 }, () => devices.length);

  const usageTrend =
    usageSparkline[29] < usageSparkline[0] ? 'down' : usageSparkline[29] > usageSparkline[0] ? 'up' : 'neutral';
  const costTrend =
    costSparkline[29] < costSparkline[0] ? 'down' : costSparkline[29] > costSparkline[0] ? 'up' : 'neutral';

  const statCards = [
    {
      title: 'Today\u2019s Usage',
      value: `${todaysUsage} kWh`,
      interval: 'Last 30 days',
      trend: usageTrend,
      data: usageSparkline,
    },
    {
      title: 'Monthly Cost',
      value: `$${monthlyCost.toFixed(2)}`,
      interval: 'Last 30 days',
      trend: costTrend,
      data: costSparkline,
    },
    {
      title: 'Active Devices',
      value: String(devices.length),
      interval: 'Currently registered',
      trend: 'neutral',
      data: deviceSparkline,
    },
  ];

  // --- Pie chart ---
  const typeOrder = ['HVAC', 'Appliances', 'Lighting', 'Other'];
  const pieData = typeOrder
    .filter((t) => typeEnergy[t] > 0)
    .map((t) => ({ label: t, value: Math.round(typeEnergy[t] * daysInMonth) }));
  const totalMonthlyEnergy = pieData.reduce((s, d) => s + d.value, 0);
  const pieCategories = pieData.map((d) => ({
    name: d.label,
    value: totalMonthlyEnergy > 0 ? Math.round((d.value / totalMonthlyEnergy) * 100) : 0,
  }));

  // --- Daily energy line chart ---
  const monthName = new Date(currentYear, currentMonth - 1).toLocaleDateString('en-US', { month: 'short' });
  const dailyLabels = [];
  const dailyHVAC = [];
  const dailyAppliances = [];
  const dailyLighting = [];
  for (let d = 1; d <= daysInMonth; d++) {
    dailyLabels.push(`${monthName} ${d}`);
    dailyHVAC.push(Math.round(typeEnergy.HVAC * dayVariation(d, 10) * 10) / 10);
    dailyAppliances.push(Math.round(typeEnergy.Appliances * dayVariation(d, 20) * 10) / 10);
    dailyLighting.push(
      Math.round((typeEnergy.Lighting + typeEnergy.Other) * dayVariation(d, 30) * 10) / 10,
    );
  }
  const sessionsData = {
    labels: dailyLabels,
    hvac: dailyHVAC,
    appliances: dailyAppliances,
    lighting: dailyLighting,
    totalMonthlyEnergy,
  };

  // --- Monthly cost bar chart ---
  const monthKeys = Object.keys(ratesByMonth).sort((a, b) => {
    const [ya, ma] = a.split('-').map(Number);
    const [yb, mb] = b.split('-').map(Number);
    return ya !== yb ? ya - yb : ma - mb;
  });

  const barLabels = [];
  const barOffPeak = [];
  const barMidPeak = [];
  const barOnPeak = [];

  for (const key of monthKeys) {
    const rates = ratesByMonth[key];
    const [y, m] = key.split('-').map(Number);
    barLabels.push(new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short' }));

    const periods = {};
    for (const r of rates) {
      const p = r.periodLabel || 'Standard';
      if (!periods[p]) periods[p] = { totalRate: 0, hours: 0 };
      periods[p].totalRate += r.totalRate;
      periods[p].hours += 1;
    }

    const totalHours = rates.length || 1;
    const daysM = new Date(y, m, 0).getDate();
    const sorted = Object.keys(periods)
      .map((p) => ({
        avgRate: periods[p].totalRate / periods[p].hours,
        hours: periods[p].hours,
      }))
      .sort((a, b) => a.avgRate - b.avgRate);

    let off = 0, mid = 0, on = 0;
    for (let i = 0; i < sorted.length; i++) {
      const frac = sorted[i].hours / totalHours;
      const cost = Math.round(totalDailyEnergy * daysM * frac * sorted[i].avgRate * 100) / 100;
      if (sorted.length === 1) { off = cost; }
      else if (sorted.length === 2) { if (i === 0) off = cost; else on = cost; }
      else { if (i === 0) off = cost; else if (i === sorted.length - 1) on += cost; else mid += cost; }
    }
    barOffPeak.push(off);
    barMidPeak.push(mid);
    barOnPeak.push(on);
  }

  const costBarData = {
    labels: barLabels,
    offPeak: barOffPeak,
    midPeak: barMidPeak,
    onPeak: barOnPeak,
    monthlyCost,
  };

  return { statCards, pieData, pieCategories, totalMonthlyEnergy, sessionsData, costBarData };
}

const EMPTY_DATA = {
  statCards: [
    { title: 'Today\u2019s Usage', value: '0 kWh', interval: 'No data', trend: 'neutral', data: Array(30).fill(0) },
    { title: 'Monthly Cost', value: '$0.00', interval: 'No data', trend: 'neutral', data: Array(30).fill(0) },
    { title: 'Active Devices', value: '0', interval: 'No devices', trend: 'neutral', data: Array(30).fill(0) },
  ],
  pieData: [],
  pieCategories: [],
  totalMonthlyEnergy: 0,
  sessionsData: { labels: [], hvac: [], appliances: [], lighting: [], totalMonthlyEnergy: 0 },
  costBarData: { labels: [], offPeak: [], midPeak: [], onPeak: [], monthlyCost: 0 },
};

export default function MainGrid() {
  const { getAccessTokenSilently } = useAuth0();
  const { selectedLocationId } = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [dashData, setDashData] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const token = await getAccessTokenSilently();
        const [allDevices, profile] = await Promise.all([
          getDevices(token),
          getUserProfile(token),
        ]);
        const devices = selectedLocationId
          ? allDevices.filter((d) => d.locationId === selectedLocationId)
          : allDevices;

        const ratesByMonth = {};
        if (profile.selectedProviderId) {
          const now = new Date();
          const fetches = [];
          for (let i = 0; i < 6; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const m = d.getMonth() + 1;
            const y = d.getFullYear();
            fetches.push(
              getMonthlyRates(token, profile.selectedProviderId, m, y)
                .then((rates) => ({ key: `${y}-${m}`, rates }))
                .catch(() => ({ key: `${y}-${m}`, rates: [] })),
            );
          }
          const results = await Promise.all(fetches);
          for (const { key, rates } of results) {
            if (rates.length > 0) ratesByMonth[key] = rates;
          }
        }

        if (!cancelled) {
          setDashData(computeDashboardData(devices, ratesByMonth));
          setLoading(false);
        }
      } catch (e) {
        console.error('Dashboard load error:', e);
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [getAccessTokenSilently, selectedLocationId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const data = dashData || EMPTY_DATA;

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.statCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart data={data.sessionsData} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart data={data.costBarData} />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Breakdown
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartUserByCountry
            data={data.pieData}
            categories={data.pieCategories}
            totalEnergy={data.totalMonthlyEnergy}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack gap={2}>
            <HighlightedCard variant="savings" />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import Copyright from '../internals/components/Copyright';
import StatCard from './StatCard';

const statCards = [
  {
    title: 'Total Usage',
    value: '842 kWh',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      32, 30, 28, 31, 29, 27, 30, 28, 26, 29, 27, 25, 28, 26, 24, 27, 25, 23,
      26, 24, 22, 25, 23, 21, 24, 22, 20, 23, 21, 19,
    ],
  },
  {
    title: 'Cost This Month',
    value: '$127',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      3.2, 3.5, 3.8, 4.1, 3.9, 4.3, 4.0, 4.5, 4.2, 4.7, 4.4, 4.9, 4.6, 5.1,
      4.8, 5.3, 5.0, 5.5, 5.2, 5.7, 5.4, 5.9, 5.6, 6.1, 5.8, 6.3, 6.0, 6.5,
      6.2, 6.7,
    ],
  },
  {
    title: 'Active Devices',
    value: '12',
    interval: 'Currently online',
    trend: 'neutral',
    data: [
      10, 11, 10, 12, 11, 10, 12, 11, 12, 10, 11, 12, 10, 11, 12, 11, 10, 12,
      11, 12, 10, 11, 12, 10, 11, 12, 11, 10, 12, 12,
    ],
  },
  {
    title: 'Peak Demand',
    value: '4.8 kW',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      5.5, 5.3, 5.1, 5.4, 5.2, 5.0, 5.3, 5.1, 4.9, 5.2, 5.0, 4.8, 5.1, 4.9,
      4.7, 5.0, 4.8, 4.6, 4.9, 4.7, 4.5, 4.8, 4.6, 4.4, 4.7, 4.5, 4.3, 4.6,
      4.4, 4.8,
    ],
  },
];

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

function EnergyUsageChart() {
  const theme = useTheme();
  const data = getDaysInMonth(4, 2024);
  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Energy Usage Over Time
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', gap: 1 }}
          >
            <Typography variant="h4" component="p">
              842 kWh
            </Typography>
            <Chip size="small" color="success" label="-12%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Daily energy consumption for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50, label: 'kWh' }]}
          series={[
            {
              id: 'hvac',
              label: 'HVAC',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                12, 14, 11, 15, 13, 10, 14, 12, 9, 13, 11, 8, 12, 10, 7, 11,
                9, 6, 10, 8, 5, 9, 7, 4, 8, 6, 5, 7, 6, 8,
              ],
            },
            {
              id: 'appliances',
              label: 'Appliances',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              area: true,
              stackOrder: 'ascending',
              data: [
                8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7, 9, 8, 7,
                9, 8, 7, 9, 8, 7, 9, 8, 7, 9,
              ],
            },
            {
              id: 'lighting',
              label: 'Lighting',
              showMark: false,
              curve: 'linear',
              stack: 'total',
              stackOrder: 'ascending',
              area: true,
              data: [
                3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3,
                4, 3, 3, 4, 3, 3, 4, 3, 3, 4,
              ],
            },
          ]}
          height={250}
          margin={{ left: 0, right: 20, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-hvac': {
              fill: "url('#hvac')",
            },
            '& .MuiAreaElement-series-appliances': {
              fill: "url('#appliances')",
            },
            '& .MuiAreaElement-series-lighting': {
              fill: "url('#lighting')",
            },
          }}
          hideLegend
        >
          <AreaGradient color={theme.palette.primary.dark} id="hvac" />
          <AreaGradient color={theme.palette.primary.main} id="appliances" />
          <AreaGradient color={theme.palette.primary.light} id="lighting" />
        </LineChart>
      </CardContent>
    </Card>
  );
}

function UsageByDeviceTypeChart() {
  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Usage by Device Type
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
            <Typography variant="h4" component="p">
              842 kWh
            </Typography>
            <Chip size="small" color="success" label="-12%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Breakdown by category for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
              height: 24,
            },
          ]}
          yAxis={[{ width: 50, label: 'kWh' }]}
          series={[
            {
              id: 'hvac',
              label: 'HVAC',
              data: [320, 380, 420, 480, 440, 360],
              stack: 'A',
            },
            {
              id: 'appliances',
              label: 'Appliances',
              data: [180, 190, 200, 210, 195, 185],
              stack: 'A',
            },
            {
              id: 'lighting',
              label: 'Lighting & Other',
              data: [90, 85, 95, 100, 88, 82],
              stack: 'A',
            },
          ]}
          height={250}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}

function CostBreakdownChart() {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Cost Breakdown
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          This month by device type
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 52, label: 'HVAC' },
                  { id: 1, value: 28, label: 'Appliances' },
                  { id: 2, value: 12, label: 'Lighting' },
                  { id: 3, value: 8, label: 'Electronics' },
                ],
                innerRadius: 40,
                outerRadius: 90,
                paddingAngle: 2,
                cornerRadius: 4,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            height={200}
            width={300}
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
            colors={[
              (theme.vars || theme).palette.primary.dark,
              (theme.vars || theme).palette.primary.main,
              (theme.vars || theme).palette.primary.light,
              (theme.vars || theme).palette.grey[400],
            ]}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function MonthlyTrendChart() {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Monthly Cost Trend
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Last 12 months
        </Typography>
        <BarChart
          borderRadius={8}
          colors={[(theme.vars || theme).palette.primary.main]}
          xAxis={[
            {
              scaleType: 'band',
              data: [
                'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb',
              ],
              height: 24,
            },
          ]}
          yAxis={[{ width: 40 }]}
          series={[
            {
              id: 'cost',
              label: 'Cost ($)',
              data: [98, 105, 112, 145, 168, 172, 148, 132, 118, 135, 142, 127],
            },
          ]}
          height={200}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          hideLegend
        />
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Energy Analytics
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {statCards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 6 }}>
          <EnergyUsageChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <UsageByDeviceTypeChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Cost Analysis
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 8 }}>
          <MonthlyTrendChart />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CostBreakdownChart />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

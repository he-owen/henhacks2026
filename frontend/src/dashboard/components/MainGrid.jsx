import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';

const data = [
  {
    title: 'Today\u2019s Usage',
    value: '28.4 kWh',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      32, 30, 28, 31, 29, 27, 30, 28, 26, 29, 27, 25, 28, 26, 24, 27, 25, 23,
      26, 24, 22, 25, 23, 21, 24, 22, 20, 23, 21, 28,
    ],
  },
  {
    title: 'Monthly Cost',
    value: '$127.40',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      95, 98, 102, 108, 105, 112, 118, 115, 122, 125, 119, 128, 132, 129, 135,
      138, 131, 142, 145, 140, 148, 152, 146, 155, 158, 150, 160, 155, 148, 127,
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
];

export default function MainGrid() {
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
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Breakdown
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartUserByCountry />
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

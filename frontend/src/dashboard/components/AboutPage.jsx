import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';

const FEATURES = [
  {
    icon: <AutoAwesomeRoundedIcon />,
    color: 'success',
    title: 'AI-Powered Scheduling',
    body: `Uses mixed-integer linear programming (PuLP/CBC) to find the cheapest 24-hour run windows for every appliance based on your utility's real-time rate tiers.`,
  },
  {
    icon: <BoltRoundedIcon />,
    color: 'warning',
    title: 'Live Rate Awareness',
    body: 'Fetches hourly peak, mid-peak, and off-peak rates from your local utility provider by ZIP code and alerts you before expensive windows hit.',
  },
  {
    icon: <DevicesRoundedIcon />,
    color: 'primary',
    title: 'Device Management',
    body: `Register appliances like HVAC, EV chargers, dishwashers, and laundry. The optimizer respects each device's power, duration, and usage constraints.`,
  },
  {
    icon: <ReceiptLongRoundedIcon />,
    color: 'error',
    title: 'Bill Tracking',
    body: 'Log monthly electricity bills and visualize spending trends over time. Upload bills as images and let the app extract the numbers for you.',
  },
  {
    icon: <TuneRoundedIcon />,
    color: 'secondary',
    title: 'Personalized Preferences',
    body: 'Set your weekly availability, thermostat home/away temperatures, HVAC lead time, and time-of-use constraints so the schedule works around your life.',
  },
];

const TECH_STACK = [
  'React 18', 'Material UI v6', 'Vite', 'Auth0',
  'FastAPI', 'PostgreSQL', 'Supabase', 'PuLP / CBC',
  'Docker', 'Render', 'Vercel',
];

const TEAM = [
  'Owen He',
  'Brendon Uzoigwe',
  'Saaketh Pula',
  'Girish Sista',
];

export default function AboutPage() {
  return (
    <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', py: 4 }}>
      {/* Hero */}
      <Stack spacing={1.5} alignItems="center" sx={{ textAlign: 'center', mb: 5 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <BoltRoundedIcon sx={{ fontSize: 40, color: 'warning.main' }} />
          <Typography variant="h3" fontWeight={800} letterSpacing="-1px">
            PhasePlan
          </Typography>
        </Stack>
        <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ maxWidth: 580 }}>
          Smart home energy optimization — shift your appliances to the cheapest hours
          of the day, automatically.
        </Typography>
        </Stack>

      <Divider sx={{ mb: 5 }} />

      {/* What it does */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        What PhasePlan does
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {FEATURES.map((f) => (
          <Grid item xs={12} sm={6} key={f.title}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: `${f.color}.main`,
                      color: '#fff',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    {f.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                      {f.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {f.body}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tech stack */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Tech stack
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 6 }}>
        {TECH_STACK.map((t) => (
          <Chip key={t} label={t} size="small" variant="outlined" />
        ))}
      </Stack>

      {/* Team */}
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Team
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mb: 6 }}>
        {TEAM.map((name) => (
          <Chip
            key={name}
            avatar={<Avatar>{name[0]}</Avatar>}
            label={name}
            variant="outlined"
          />
        ))}
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Footer */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
        <Typography variant="caption" color="text.secondary">
          © 2026 PhasePlan
        </Typography>
        <Chip
          icon={<GitHubIcon />}
          label="View on GitHub"
          size="small"
          component={Link}
          href="https://github.com/he-owen/henhacks2026"
          target="_blank"
          clickable
          variant="outlined"
        />
      </Stack>
    </Box>
  );
}

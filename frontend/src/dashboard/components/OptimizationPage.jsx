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
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Copyright from '../internals/components/Copyright';

const recommendations = [
  {
    id: '1',
    icon: <AcUnitRoundedIcon />,
    title: 'Shift HVAC to off-peak hours',
    description: 'Pre-cool your home before on-peak rates start. Running AC during midday could cost 2\u20133\u00d7 more than at night.',
    savings: '$18/mo',
    priority: 'high',
  },
  {
    id: '2',
    icon: <ScheduleRoundedIcon />,
    title: 'Delay high-power appliances',
    description: 'Run dishwasher, laundry, and EV charging during off-peak or super-off-peak windows.',
    savings: '$12/mo',
    priority: 'high',
  },
  {
    id: '3',
    icon: <LightbulbRoundedIcon />,
    title: 'Replace remaining incandescent bulbs',
    description: 'You have 4 bulbs that could be switched to LED for roughly 80% less lighting energy.',
    savings: '$5/mo',
    priority: 'medium',
  },
  {
    id: '4',
    icon: <BoltRoundedIcon />,
    title: 'Reduce phantom load',
    description: 'Several devices draw power when \u201coff\u201d. Use smart strips or unplug rarely used electronics.',
    savings: '$3/mo',
    priority: 'low',
  },
];

const priorityColor = { high: 'error', medium: 'warning', low: 'default' };

export default function OptimizationPage() {
  const [running, setRunning] = React.useState(false);

  const handleRunOptimization = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 2000);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
      >
        <Typography component="h2" variant="h6">
          Optimization
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AutoAwesomeRoundedIcon />}
          onClick={handleRunOptimization}
          disabled={running}
        >
          {running ? 'Analyzing\u2026' : 'Run Optimization'}
        </Button>
      </Stack>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <SavingsRoundedIcon color="success" />
                <Typography variant="subtitle2" color="text.secondary">
                  Potential monthly savings
                </Typography>
              </Stack>
              <Typography variant="h4" sx={{ color: 'success.main' }}>
                $38.50
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Based on your usage and rate schedule
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <AutoAwesomeRoundedIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Optimization score
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 0.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={62}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
                />
                <Typography variant="h6">62%</Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Room to improve with the tips below
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
          <Card variant="outlined" sx={{ height: '100%', bgcolor: 'action.hover' }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                Coming next
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our optimization engine will use your utility rate structure, device
                usage, and bill history to suggest personalized schedules and track
                savings over time.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Recommendations
      </Typography>
      <Stack spacing={1.5}>
        {recommendations.map((rec) => (
          <Card key={rec.id} variant="outlined">
            <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ color: 'primary.main', display: 'flex' }}>{rec.icon}</Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {rec.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap={false}>
                    {rec.description}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
                  <Chip
                    label={rec.savings}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    label={rec.priority}
                    size="small"
                    color={priorityColor[rec.priority]}
                    variant="outlined"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

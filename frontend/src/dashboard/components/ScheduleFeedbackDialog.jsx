import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import Co2RoundedIcon from '@mui/icons-material/Co2Rounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useAuth0 } from '@auth0/auth0-react';
import { submitScheduleFeedback } from '../../api';

export default function ScheduleFeedbackDialog({ pendingSchedules, onComplete }) {
  const { getAccessTokenSilently } = useAuth0();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);

  const open = pendingSchedules && pendingSchedules.length > 0;
  const current = open ? pendingSchedules[currentIndex] : null;
  const total = pendingSchedules?.length || 0;

  const handleFeedback = async (followed) => {
    if (!current) return;
    setSubmitting(true);
    try {
      const token = await getAccessTokenSilently();
      await submitScheduleFeedback(token, current.id, followed);
    } catch (e) {
      console.error('Failed to submit feedback:', e);
    } finally {
      setSubmitting(false);
      if (currentIndex + 1 < total) {
        setCurrentIndex((i) => i + 1);
      } else {
        setCurrentIndex(0);
        onComplete?.();
      }
    }
  };

  if (!open || !current) return null;

  const savings = current.costSavings ?? (Number(current.typicalCost) - Number(current.optimizedCost));
  const carbonSaved = current.carbonSaved ?? (Number(current.carbonTypical) - Number(current.carbonOptimized));
  const scheduleDate = current.scheduleDate ? new Date(current.scheduleDate + 'T00:00:00') : null;
  const dateLabel = scheduleDate && !Number.isNaN(scheduleDate.getTime())
    ? scheduleDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    : (current.scheduleDate || 'Unknown date');

  return (
    <Dialog open maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <CalendarMonthRoundedIcon color="primary" />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="span">
              Did you follow your schedule?
            </Typography>
            {total > 1 && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                ({currentIndex + 1} of {total})
              </Typography>
            )}
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Schedule for
            </Typography>
            <Typography variant="h5" fontWeight={600}>
              {dateLabel}
            </Typography>
          </Box>

          <Divider />

          <Stack direction="row" spacing={3}>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                <SavingsRoundedIcon color="success" fontSize="small" />
                <Typography variant="subtitle2" color="text.secondary">
                  Potential savings
                </Typography>
              </Stack>
              <Typography variant="h4" color="success.main" fontWeight={700}>
                ${(Number(savings) || 0).toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ${current.optimizedCost?.toFixed(2)} optimized vs ${current.typicalCost?.toFixed(2)} typical
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                <Co2RoundedIcon color="info" fontSize="small" />
                <Typography variant="subtitle2" color="text.secondary">
                  Carbon reduction
                </Typography>
              </Stack>
              <Typography variant="h4" color="info.main" fontWeight={700}>
                {(Number(carbonSaved) || 0).toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                kg CO₂ saved by shifting to off-peak hours
              </Typography>
            </Box>
          </Stack>

          {total > 1 && (
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={((currentIndex + 1) / total) * 100}
                sx={{ height: 6, borderRadius: 1, mt: 0.5 }}
              />
            </Box>
          )}

          <Box sx={{ bgcolor: 'action.hover', borderRadius: 1, p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              If you followed the optimized schedule, we'll count the savings toward your total.
              This helps us track your real impact on energy costs and carbon emissions.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<CancelRoundedIcon />}
          onClick={() => handleFeedback(false)}
          disabled={submitting}
          sx={{ flex: 1 }}
        >
          No, I didn't
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircleRoundedIcon />}
          onClick={() => handleFeedback(true)}
          disabled={submitting}
          sx={{ flex: 1 }}
        >
          Yes, I followed it
        </Button>
      </DialogActions>
    </Dialog>
  );
}

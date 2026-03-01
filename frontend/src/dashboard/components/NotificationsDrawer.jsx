import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { useAuth0 } from '@auth0/auth0-react';
import { usePage } from '../context/PageContext';
import { getBills, getUserProfile, getMonthlyRates } from '../../api';

function hourLabel(h) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

/** Build notifications from all available data sources. */
function buildNotifications({ schedule, bills, todayRates, now }) {
  const notes = [];
  const nowHour = now.getHours();

  // ── 1. Upcoming run windows (devices running in the next 2 hours) ─────────
  if (schedule.length > 0) {
    const upcoming = schedule.filter((s) => {
      if (!Array.isArray(s.run_times)) return false;
      return s.run_times.some((h) => h >= nowHour && h <= nowHour + 2);
    });

    if (upcoming.length > 0) {
      upcoming.slice(0, 4).forEach((s) => {
        const soonHour = s.run_times.find((h) => h >= nowHour && h <= nowHour + 2);
        notes.push({
          id: `upcoming-${s.appliance}`,
          type: 'upcoming',
          icon: <AccessAlarmRoundedIcon />,
          color: 'primary',
          title: `${s.appliance} starting soon`,
          body: `Optimal window begins at ${hourLabel(soonHour)}`,
        });
      });
    }

    // ── 2. Schedule summary (always show if optimization has run) ────────────
    const scheduled = schedule.filter(
      (s) => s.run_times === 'continuous' || (Array.isArray(s.run_times) && s.run_times.length > 0),
    );
    const totalSavings = schedule.reduce((acc, s) => acc + (s.cost_today ?? 0), 0);

    notes.push({
      id: 'opt-summary',
      type: 'optimization',
      icon: <AutoAwesomeRoundedIcon />,
      color: 'success',
      title: `Schedule ready — ${scheduled.length} of ${schedule.length} devices optimized`,
      body: totalSavings > 0
        ? `Estimated cost today: $${totalSavings.toFixed(2)}`
        : 'Run the optimizer to see daily cost totals',
    });
  } else {
    notes.push({
      id: 'opt-cta',
      type: 'optimization',
      icon: <AutoAwesomeRoundedIcon />,
      color: 'default',
      title: 'Optimization not run yet',
      body: 'Head to the Optimization page to find the cheapest windows for your devices.',
    });
  }

  // ── 3. Rate spike alert — peak hours coming up today ─────────────────────
  if (todayRates.length > 0) {
    const peakAhead = todayRates.filter(
      (r) => r.periodLabel === 'peak' && r.hour >= nowHour,
    );
    if (peakAhead.length > 0) {
      const first = peakAhead[0];
      const last = peakAhead[peakAhead.length - 1];
      notes.push({
        id: 'peak-alert',
        type: 'rate',
        icon: <ElectricBoltRoundedIcon />,
        color: 'error',
        title: `Peak rates from ${hourLabel(first.hour)}–${hourLabel(last.hour + 1)}`,
        body: `Avoid running major appliances during these ${peakAhead.length} peak hour${peakAhead.length > 1 ? 's' : ''} to save money.`,
      });
    }

    const offPeakAhead = todayRates.filter(
      (r) => r.periodLabel === 'off-peak' && r.hour >= nowHour,
    );
    if (offPeakAhead.length > 0) {
      const cheapest = offPeakAhead.reduce((a, b) =>
        (a.totalRate ?? 9) < (b.totalRate ?? 9) ? a : b,
      );
      notes.push({
        id: 'offpeak-tip',
        type: 'rate',
        icon: <ScheduleRoundedIcon />,
        color: 'success',
        title: `Cheapest hour today: ${hourLabel(cheapest.hour)}`,
        body: `Rate: $${Number(cheapest.totalRate).toFixed(4)}/kWh — great time for laundry, EV charging, or the dishwasher.`,
      });
    }
  }

  // ── 4. Bill reminder — no entry for the current month ────────────────────
  if (bills !== null) {
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();
    const hasBill = bills.some(
      (b) => b.month === thisMonth && b.year === thisYear,
    );
    if (!hasBill) {
      const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      notes.push({
        id: 'bill-reminder',
        type: 'bill',
        icon: <ReceiptLongRoundedIcon />,
        color: 'warning',
        title: `No bill logged for ${MONTHS[thisMonth - 1]} ${thisYear}`,
        body: 'Add your electricity bill in Billing to track your monthly spending.',
      });
    }
  }

  return notes;
}

const TYPE_COLORS = {
  upcoming: 'primary',
  optimization: 'success',
  rate: 'error',
  bill: 'warning',
};

export default function NotificationsDrawer() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { notificationsOpen, setNotificationsOpen, optimizationResults, setCurrentPage, setNotificationCount } = usePage();

  const [loading, setLoading] = React.useState(false);
  const [bills, setBills] = React.useState(null);
  const [todayRates, setTodayRates] = React.useState([]);
  const [dismissedIds, setDismissedIds] = React.useState(() => new Set());
  const [hasLoaded, setHasLoaded] = React.useState(false);

  // Load bills + today's rates whenever the drawer opens
  React.useEffect(() => {
    if (!notificationsOpen || !isAuthenticated) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const token = await getAccessTokenSilently();
        const [billList, profile] = await Promise.all([
          getBills(token).catch(() => []),
          getUserProfile(token).catch(() => null),
        ]);

        if (!cancelled) setBills(billList || []);

        if (profile?.selectedProviderId) {
          const now = new Date();
          const rates = await getMonthlyRates(
            token,
            profile.selectedProviderId,
            now.getMonth() + 1,
            now.getFullYear(),
          ).catch(() => []);

          if (!cancelled) {
            const todayStr = now.toISOString().slice(0, 10);
            setTodayRates(
              (rates || []).filter((r) => {
                const d = r.date ? new Date(r.date).toISOString().slice(0, 10) : '';
                return d === todayStr;
              }),
            );
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setHasLoaded(true);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [notificationsOpen, isAuthenticated, getAccessTokenSilently]);

  const schedule = optimizationResults?.schedule ?? [];
  const now = new Date();

  const notifications = React.useMemo(
    () => buildNotifications({ schedule, bills, todayRates, now }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [schedule, bills, todayRates],
  );

  const unreadCount = notifications.filter((n) => !dismissedIds.has(n.id)).length;

  // Keep bell badge in sync — only after the first open/load
  React.useEffect(() => {
    if (hasLoaded) setNotificationCount(unreadCount);
  }, [unreadCount, hasLoaded, setNotificationCount]);

  const toggleDismiss = (id) =>
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  const navigate = (page, id) => {
    toggleDismiss(id);
    setCurrentPage(page);
    setNotificationsOpen(false);
  };

  const PAGE_FOR_TYPE = {
    upcoming: 'Optimization',
    optimization: 'Optimization',
    rate: 'Billing',
    bill: 'Billing',
  };

  return (
    <Drawer
      anchor="right"
      open={notificationsOpen}
      onClose={() => setNotificationsOpen(false)}
      PaperProps={{ sx: { width: { xs: '100vw', sm: 380 }, maxWidth: '100vw' } }}
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <NotificationsNoneRoundedIcon fontSize="small" />
          <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
          {unreadCount > 0 && (
            <Chip label={unreadCount} size="small" color="primary" />
          )}
        </Stack>
        <IconButton size="small" onClick={() => setNotificationsOpen(false)}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* Body */}
      {loading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }}>
          <CircularProgress />
        </Stack>
      ) : !isAuthenticated ? (
        <Box sx={{ px: 3, py: 4, textAlign: 'center' }}>
          <Typography color="text.secondary" variant="body2">Sign in to see notifications.</Typography>
        </Box>
      ) : (
        <List disablePadding sx={{ overflowY: 'auto', flexGrow: 1 }}>
          {notifications.map((n, idx) => (
            <React.Fragment key={n.id}>
              <ListItem
                alignItems="flex-start"
                onClick={() => navigate(PAGE_FOR_TYPE[n.type], n.id)}
                sx={{
                  cursor: 'pointer',
                  px: 2,
                  py: 1.5,
                  opacity: dismissedIds.has(n.id) ? 0.4 : 1,
                  transition: 'opacity 0.2s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ListItemAvatar sx={{ minWidth: 44 }}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: `${TYPE_COLORS[n.type] || 'primary'}.main`,
                      color: '#fff',
                    }}
                  >
                    {n.icon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.4 }}>
                      {n.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {n.body}
                    </Typography>
                  }
                />
              </ListItem>
              {idx < notifications.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Drawer>
  );
}

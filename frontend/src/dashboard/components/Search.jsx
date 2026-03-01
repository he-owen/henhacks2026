import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
/* page icons */
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
/* section icons */
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useAuth0 } from '@auth0/auth0-react';
import { usePage } from '../context/PageContext';
import { getDevices } from '../../api';

/**
 * Deep-link index — each entry navigates to a page AND scrolls to a specific
 * section (identified by the `id` attribute added to that element).
 * Entries with scrollToId = null just navigate to the page.
 */
const DEEP_LINKS = [
  // ── Home ──────────────────────────────────────────────────────────────────
  { label: 'Home',              description: 'Dashboard overview',                         page: 'Home',         scrollToId: null,                icon: <HomeRoundedIcon fontSize="small" /> },
  // ── Optimization ──────────────────────────────────────────────────────────
  { label: 'Run Optimization',  description: 'Find cheapest windows for all devices',       page: 'Optimization', scrollToId: 'opt-header',         icon: <AutoAwesomeRoundedIcon fontSize="small" /> },
  { label: 'Optimization Summary', description: 'Daily cost & off-peak score cards',        page: 'Optimization', scrollToId: 'opt-summary',        icon: <SavingsRoundedIcon fontSize="small" /> },
  { label: "Today's Schedule",  description: 'Optimized run times for your appliances',     page: 'Optimization', scrollToId: 'opt-schedule',       icon: <ScheduleRoundedIcon fontSize="small" /> },
  // ── Devices ───────────────────────────────────────────────────────────────
  { label: 'Device List',       description: 'All registered devices',                      page: 'Devices',      scrollToId: 'devices-header',     icon: <DevicesRoundedIcon fontSize="small" /> },
  { label: 'Add Device',        description: 'Register a new device',                       page: 'Devices',      scrollToId: 'devices-header',     icon: <AddCircleRoundedIcon fontSize="small" /> },
  // ── Billing ───────────────────────────────────────────────────────────────
  { label: 'Utility Rates',     description: 'TOU rate schedule and provider settings',     page: 'Billing',      scrollToId: 'billing-rates',      icon: <ElectricBoltRoundedIcon fontSize="small" /> },
  { label: 'Bill History',      description: 'View and manage your electricity bills',      page: 'Billing',      scrollToId: 'billing-history',    icon: <HistoryRoundedIcon fontSize="small" /> },
  { label: 'Billing',           description: 'Bills, rates, and utility provider',          page: 'Billing',      scrollToId: null,                 icon: <ReceiptLongRoundedIcon fontSize="small" /> },
  // ── Preferences ───────────────────────────────────────────────────────────
  { label: 'Weekly Schedule',   description: 'Set your home hours by day of week',          page: 'Preferences',  scrollToId: 'prefs-schedule',     icon: <CalendarMonthRoundedIcon fontSize="small" /> },
  { label: 'Thermostat',        description: 'Temperature preferences for home and away',   page: 'Preferences',  scrollToId: 'prefs-thermostat',   icon: <ThermostatRoundedIcon fontSize="small" /> },
  { label: 'Preferences',       description: 'Account, schedule, and thermostat settings',  page: 'Preferences',  scrollToId: null,                 icon: <TuneRoundedIcon fontSize="small" /> },
  // ── Tools ─────────────────────────────────────────────────────────────────
  { label: 'Tools',             description: 'Google Home script generator and utilities',  page: 'Tools',        scrollToId: null,                 icon: <BuildRoundedIcon fontSize="small" /> },
];

function hourLabel(h) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function SectionLabel({ children }) {
  return (
    <Typography
      variant="caption"
      color="text.disabled"
      sx={{ px: 2, pt: 1.5, pb: 0.5, display: 'block', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, fontSize: '0.65rem' }}
    >
      {children}
    </Typography>
  );
}

export default function Search() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { setCurrentPage, setSearchHighlight, optimizationResults } = usePage();

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [devices, setDevices] = React.useState([]);
  const [devicesLoaded, setDevicesLoaded] = React.useState(false);
  const dialogInputRef = React.useRef(null);
  const listRef = React.useRef(null);

  // Open palette on Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Reset + focus when dialog opens
  React.useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => dialogInputRef.current?.focus(), 50);
      loadDevices();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const loadDevices = React.useCallback(async () => {
    if (devicesLoaded || !isAuthenticated) return;
    try {
      const token = await getAccessTokenSilently();
      const rows = await getDevices(token);
      setDevices(rows || []);
    } catch { /* non-fatal */ } finally {
      setDevicesLoaded(true);
    }
  }, [devicesLoaded, isAuthenticated, getAccessTokenSilently]);

  /** Navigate to a page and optionally scroll + highlight a section */
  const handleSelect = React.useCallback((page, scrollToId = null) => {
    setCurrentPage(page);
    if (scrollToId) {
      setSearchHighlight({ scrollToId, query: query.trim() });
    }
    setOpen(false);
  }, [setCurrentPage, setSearchHighlight, query]);

  const q = query.trim().toLowerCase();

  // Filter deep-link entries
  const linkResults = DEEP_LINKS.filter((l) =>
    !q ||
    l.label.toLowerCase().includes(q) ||
    l.description.toLowerCase().includes(q) ||
    l.page.toLowerCase().includes(q),
  );

  // Filter devices
  const deviceResults = q
    ? devices.filter((d) =>
        [d.name, d.type, d.brand, d.model]
          .filter(Boolean)
          .some((f) => f.toLowerCase().includes(q)),
      )
    : [];

  // Filter schedule items (dynamic, from context)
  const schedule = optimizationResults?.schedule ?? [];
  const scheduleResults = q
    ? schedule.filter((s) => (s.appliance || '').toLowerCase().includes(q))
    : [];

  // Flat list for keyboard navigation
  const allItems = React.useMemo(() => {
    const items = [];
    linkResults.forEach((l) => items.push({ type: 'link', data: l }));
    deviceResults.slice(0, 6).forEach((d) => items.push({ type: 'device', data: d }));
    scheduleResults.forEach((s) => items.push({ type: 'schedule', data: s }));
    return items;
  }, [linkResults, deviceResults, scheduleResults]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && allItems[activeIdx]) {
      const item = allItems[activeIdx];
      if (item.type === 'link') handleSelect(item.data.page, item.data.scrollToId);
      else if (item.type === 'device') handleSelect('Devices', 'devices-header');
      else if (item.type === 'schedule') handleSelect('Optimization', 'opt-schedule');
    }
  };

  React.useEffect(() => { setActiveIdx(0); }, [q]);

  React.useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const noResults = q && allItems.length === 0;

  return (
    <>
      {/* Trigger button */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          width: { xs: '100%', md: '25ch' },
          color: 'text.secondary',
          bgcolor: 'background.paper',
          '&:hover': { borderColor: 'primary.main', color: 'text.primary' },
          transition: 'border-color 0.15s, color 0.15s',
        }}
      >
        <SearchRoundedIcon fontSize="small" />
        <Typography variant="body2" sx={{ flexGrow: 1, userSelect: 'none' }}>Search…</Typography>
        <Chip label="⌘K" size="small" sx={{ height: 20, fontSize: '0.65rem', fontFamily: 'monospace', pointerEvents: 'none' }} />
      </Box>

      {/* Command-palette dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3, mt: { xs: 6, sm: '12vh' }, verticalAlign: 'top', overflow: 'hidden' } }}
        sx={{ alignItems: 'flex-start' }}
      >
        {/* Search input */}
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              inputRef={dialogInputRef}
              placeholder="Search pages, sections, devices, schedule…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              startAdornment={<InputAdornment position="start"><SearchRoundedIcon /></InputAdornment>}
              sx={{ borderRadius: 2, fontSize: '1rem' }}
              inputProps={{ 'aria-label': 'palette search' }}
            />
          </FormControl>
        </Box>

        <Divider />

        {/* Results */}
        <Box ref={listRef} sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {noResults ? (
            <Box sx={{ px: 3, py: 3, textAlign: 'center' }}>
              <Typography color="text.secondary" variant="body2">No results for "{query}"</Typography>
            </Box>
          ) : (
            <>
              {/* Deep links — pages + named sections */}
              {linkResults.length > 0 && (
                <>
                  <SectionLabel>Jump to</SectionLabel>
                  <List dense disablePadding>
                    {linkResults.map((l, i) => (
                      <ListItemButton
                        key={`${l.page}-${l.label}`}
                        data-idx={i}
                        selected={activeIdx === i}
                        onClick={() => handleSelect(l.page, l.scrollToId)}
                        sx={{ px: 2, py: 0.875, mx: 1, mb: 0.25, borderRadius: 1.5 }}
                      >
                        <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>{l.icon}</ListItemIcon>
                        <ListItemText
                          primary={l.label}
                          secondary={l.description}
                          primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                        <Chip
                          label={l.page}
                          size="small"
                          sx={{ height: 18, fontSize: '0.6rem', ml: 1, flexShrink: 0 }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </>
              )}

              {/* Devices */}
              {deviceResults.length > 0 && (
                <>
                  {linkResults.length > 0 && <Divider sx={{ my: 0.5 }} />}
                  <SectionLabel>Devices</SectionLabel>
                  <List dense disablePadding>
                    {deviceResults.slice(0, 6).map((d, i) => {
                      const idx = linkResults.length + i;
                      return (
                        <ListItemButton
                          key={d.id}
                          data-idx={idx}
                          selected={activeIdx === idx}
                          onClick={() => handleSelect('Devices', 'devices-header')}
                          sx={{ px: 2, py: 0.875, mx: 1, mb: 0.25, borderRadius: 1.5 }}
                        >
                          <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                            <DevicesRoundedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={d.name}
                            secondary={[d.type, d.brand].filter(Boolean).join(' · ')}
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                          <Chip label="Devices" size="small" sx={{ height: 18, fontSize: '0.6rem', ml: 1, flexShrink: 0 }} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </>
              )}

              {/* Schedule items */}
              {scheduleResults.length > 0 && (
                <>
                  {(linkResults.length > 0 || deviceResults.length > 0) && <Divider sx={{ my: 0.5 }} />}
                  <SectionLabel>Today's Schedule</SectionLabel>
                  <List dense disablePadding>
                    {scheduleResults.map((s, i) => {
                      const idx = linkResults.length + Math.min(deviceResults.length, 6) + i;
                      const times = Array.isArray(s.run_times) && s.run_times.length
                        ? `${hourLabel(Math.min(...s.run_times))}–${hourLabel(Math.max(...s.run_times) + 1)}`
                        : s.run_times === 'continuous' ? 'Continuous' : 'Not scheduled';
                      return (
                        <ListItemButton
                          key={s.appliance}
                          data-idx={idx}
                          selected={activeIdx === idx}
                          onClick={() => handleSelect('Optimization', 'opt-schedule')}
                          sx={{ px: 2, py: 0.875, mx: 1, mb: 0.25, borderRadius: 1.5 }}
                        >
                          <ListItemIcon sx={{ minWidth: 36, color: 'success.main' }}>
                            <ScheduleRoundedIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={s.appliance}
                            secondary={times}
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                          <Chip label="Schedule" size="small" sx={{ height: 18, fontSize: '0.6rem', ml: 1, flexShrink: 0 }} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </>
              )}

            </>
          )}
        </Box>
      </Dialog>
    </>
  );
}

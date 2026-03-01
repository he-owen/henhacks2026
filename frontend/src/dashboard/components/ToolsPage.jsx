import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useAuth0 } from '@auth0/auth0-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Copyright from '../internals/components/Copyright';
import {
  fetchRateProviders,
  generateMonthlyRates,
  getMonthlyRates,
  setUserProvider,
} from '../../api';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatHour(h) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

function periodChip(label) {
  const colorMap = {
    peak: 'error',
    'mid-peak': 'warning',
    'off-peak': 'success',
    flat: 'default',
  };
  return (
    <Chip
      label={label}
      color={colorMap[label] || 'default'}
      size="small"
      variant="outlined"
    />
  );
}

function groupRatesByDay(rates) {
  const map = {};
  for (const r of rates) {
    const key = r.date;
    if (!map[key]) map[key] = { date: key, hours: [] };
    map[key].hours.push(r);
  }
  return Object.values(map)
    .map((day) => {
      const hrs = day.hours;
      const avg = hrs.reduce((s, h) => s + h.totalRate, 0) / hrs.length;
      const min = Math.min(...hrs.map((h) => h.totalRate));
      const max = Math.max(...hrs.map((h) => h.totalRate));
      const peakCount = hrs.filter((h) => h.periodLabel === 'peak').length;
      const d = new Date(day.date + 'T00:00:00');
      return {
        id: day.date,
        date: day.date,
        dayOfWeek: DAY_NAMES[d.getUTCDay()],
        dayNum: d.getUTCDate(),
        avgRate: avg,
        minRate: min,
        maxRate: max,
        peakHours: peakCount,
        hours: hrs.sort((a, b) => a.hour - b.hour),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

function HourlyBreakdown({ hours }) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mt: 1, mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Hour</TableCell>
            <TableCell align="right">Base Rate ($/kWh)</TableCell>
            <TableCell align="right">Delivery Cost ($/kWh)</TableCell>
            <TableCell align="right">Total Rate ($/kWh)</TableCell>
            <TableCell align="center">Period</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hours.map((h) => (
            <TableRow
              key={h.hour}
              sx={{
                bgcolor:
                  h.periodLabel === 'peak'
                    ? 'error.50'
                    : h.periodLabel === 'off-peak'
                      ? 'success.50'
                      : undefined,
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>{formatHour(h.hour)}</TableCell>
              <TableCell align="right">${h.baseRate.toFixed(4)}</TableCell>
              <TableCell align="right">${h.deliveryCost.toFixed(4)}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                ${h.totalRate.toFixed(4)}
              </TableCell>
              <TableCell align="center">{periodChip(h.periodLabel)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ExpandableRateRow({ row, expanded, onToggle }) {
  return (
    <>
      <TableRow
        hover
        onClick={onToggle}
        sx={{ cursor: 'pointer', '& > *': { borderBottom: expanded ? 'unset' : undefined } }}
      >
        <TableCell>
          <IconButton size="small">
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.dayOfWeek}</TableCell>
        <TableCell align="right">${row.avgRate.toFixed(4)}</TableCell>
        <TableCell align="right">${row.minRate.toFixed(4)}</TableCell>
        <TableCell align="right">${row.maxRate.toFixed(4)}</TableCell>
        <TableCell align="center">
          <Chip
            label={row.peakHours}
            color={row.peakHours > 0 ? 'error' : 'success'}
            size="small"
            variant="outlined"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7} sx={{ p: 0 }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ px: 4, pb: 2 }}>
              <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5 }}>
                Hourly Breakdown — {row.date} ({row.dayOfWeek})
              </Typography>
              <HourlyBreakdown hours={row.hours} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ToolsPage() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [zipCode, setZipCode] = React.useState('');
  const [providers, setProviders] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState('');
  const [rateMonth, setRateMonth] = React.useState(new Date().getMonth() + 1);
  const [rateYear, setRateYear] = React.useState(new Date().getFullYear());

  const [fetchingProviders, setFetchingProviders] = React.useState(false);
  const [generatingRates, setGeneratingRates] = React.useState(false);
  const [loadingRates, setLoadingRates] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [successMsg, setSuccessMsg] = React.useState(null);

  const [dailyRows, setDailyRows] = React.useState([]);
  const [expandedDay, setExpandedDay] = React.useState(null);

  const handleFetchProviders = async () => {
    if (!zipCode.trim()) return;
    setFetchingProviders(true);
    setError(null);
    setSuccessMsg(null);
    setProviders([]);
    setSelectedProvider('');
    setDailyRows([]);
    try {
      const token = await getAccessTokenSilently();
      const list = await fetchRateProviders(token, zipCode.trim());
      setProviders(list);
      if (list.length > 0) setSelectedProvider(list[0].id);
    } catch (e) {
      setError(e?.message ?? 'Failed to fetch providers');
    } finally {
      setFetchingProviders(false);
    }
  };

  const handleGenerateAndLoad = async () => {
    if (!selectedProvider) return;
    setGeneratingRates(true);
    setError(null);
    setSuccessMsg(null);
    setDailyRows([]);
    try {
      const token = await getAccessTokenSilently();
      await setUserProvider(token, selectedProvider);
      await generateMonthlyRates(token, selectedProvider, rateMonth, rateYear);
      setLoadingRates(true);
      const rates = await getMonthlyRates(token, selectedProvider, rateMonth, rateYear);
      setDailyRows(groupRatesByDay(rates));
      setSuccessMsg(`Rates generated for ${MONTHS[rateMonth - 1]} ${rateYear}. This data is now available in Billing.`);
    } catch (e) {
      setError(e?.message ?? 'Failed to generate rates');
    } finally {
      setGeneratingRates(false);
      setLoadingRates(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Alert severity="info">Sign in to use tools.</Alert>
        <Copyright sx={{ my: 4 }} />
      </Box>
    );
  }

  const busy = fetchingProviders || generatingRates || loadingRates;

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Tools
      </Typography>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Utility Provider Lookup
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Search for utility providers by zip code, select a rate plan, and generate monthly rate data.
            Generated rates will be available on the Billing page.
          </Typography>

          {error && (
            <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {successMsg && (
            <Alert severity="success" onClose={() => setSuccessMsg(null)} sx={{ mb: 2 }}>
              {successMsg}
            </Alert>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'flex-end' }}>
            <TextField
              label="Zip Code"
              size="small"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g. 19805"
              sx={{ width: 160 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleFetchProviders();
              }}
            />
            <Button
              variant="outlined"
              size="medium"
              startIcon={fetchingProviders ? <CircularProgress size={16} /> : <SearchRoundedIcon />}
              onClick={handleFetchProviders}
              disabled={busy || !zipCode.trim()}
            >
              Find Providers
            </Button>
          </Stack>

          {providers.length > 0 && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'flex-end' }}>
              <TextField
                select
                label="Utility Provider / Rate Plan"
                size="small"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                sx={{ minWidth: 320 }}
              >
                {providers.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.utilityName} — {p.rateName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Month"
                size="small"
                value={rateMonth}
                onChange={(e) => setRateMonth(Number(e.target.value))}
                sx={{ width: 140 }}
              >
                {MONTHS.map((m, i) => (
                  <MenuItem key={m} value={i + 1}>{m}</MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                label="Year"
                size="small"
                value={rateYear}
                onChange={(e) => setRateYear(Number(e.target.value))}
                inputProps={{ min: 2020, max: 2035 }}
                sx={{ width: 100 }}
              />
              <Button
                variant="contained"
                size="medium"
                onClick={handleGenerateAndLoad}
                disabled={busy || !selectedProvider}
              >
                {generatingRates ? <CircularProgress size={20} /> : 'Generate Rates'}
              </Button>
            </Stack>
          )}

          {(generatingRates || loadingRates) && (
            <Stack alignItems="center" sx={{ py: 3 }}>
              <CircularProgress />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {generatingRates ? 'Fetching rates from OpenEI...' : 'Loading rate data...'}
              </Typography>
            </Stack>
          )}

          {dailyRows.length > 0 && (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={50} />
                    <TableCell>Date</TableCell>
                    <TableCell>Day</TableCell>
                    <TableCell align="right">Avg Rate ($/kWh)</TableCell>
                    <TableCell align="right">Min</TableCell>
                    <TableCell align="right">Max</TableCell>
                    <TableCell align="center">Peak Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dailyRows.map((row) => (
                    <ExpandableRateRow
                      key={row.id}
                      row={row}
                      expanded={expandedDay === row.date}
                      onToggle={() => setExpandedDay((prev) => (prev === row.date ? null : row.date))}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

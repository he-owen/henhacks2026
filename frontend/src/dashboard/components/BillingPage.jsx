import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth0 } from '@auth0/auth0-react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Copyright from '../internals/components/Copyright';
import {
  getUserProfile,
  getMonthlyRates,
} from '../../api';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initialHistory = [
  { id: '1', month: 1, year: 2025, totalAmount: 127.40, usageKwh: 842, utility: 'Local Electric Co' },
  { id: '2', month: 12, year: 2024, totalAmount: 118.20, usageKwh: 785, utility: 'Local Electric Co' },
  { id: '3', month: 11, year: 2024, totalAmount: 142.80, usageKwh: 920, utility: 'Local Electric Co' },
  { id: '4', month: 10, year: 2024, totalAmount: 98.50, usageKwh: 652, utility: 'Local Electric Co' },
  { id: '5', month: 9, year: 2024, totalAmount: 135.00, usageKwh: 891, utility: 'Local Electric Co' },
  { id: '6', month: 8, year: 2024, totalAmount: 168.90, usageKwh: 1102, utility: 'Local Electric Co' },
  { id: '7', month: 7, year: 2024, totalAmount: 172.30, usageKwh: 1145, utility: 'Local Electric Co' },
  { id: '8', month: 6, year: 2024, totalAmount: 145.60, usageKwh: 958, utility: 'Local Electric Co' },
];

function renderAmount(params) {
  if (params.value == null) return '—';
  return `$${params.value.toFixed(2)}`;
}

function renderUsage(params) {
  if (params.value == null) return '—';
  return `${params.value.toLocaleString()} kWh`;
}

function renderPeriod(params) {
  return `${MONTHS[params.row.month - 1]} ${params.row.year}`;
}

function renderTrend(params) {
  if (params.value == null) return null;
  const val = params.value;
  if (val > 150) return <Chip label="High" color="error" size="small" variant="outlined" />;
  if (val > 120) return <Chip label="Average" color="warning" size="small" variant="outlined" />;
  return <Chip label="Low" color="success" size="small" variant="outlined" />;
}

function a11yProps(index) {
  return {
    id: `billing-tab-${index}`,
    'aria-controls': `billing-tabpanel-${index}`,
  };
}

const emptyForm = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  totalAmount: '',
  usageKwh: '',
  utility: '',
  notes: '',
};

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

function UtilityRatesView() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [providerId, setProviderId] = React.useState(null);
  const [rateMonth, setRateMonth] = React.useState(new Date().getMonth() + 1);
  const [rateYear, setRateYear] = React.useState(new Date().getFullYear());
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [dailyRows, setDailyRows] = React.useState([]);
  const [expandedDay, setExpandedDay] = React.useState(null);
  const [noProvider, setNoProvider] = React.useState(false);

  const loadRates = React.useCallback(async (pid, month, year) => {
    setLoading(true);
    setError(null);
    setDailyRows([]);
    try {
      const token = await getAccessTokenSilently();
      const rates = await getMonthlyRates(token, pid, month, year);
      if (rates.length > 0) {
        setDailyRows(groupRatesByDay(rates));
      }
    } catch (e) {
      setError(e?.message ?? 'Failed to load rates');
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently]);

  React.useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;

    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const profile = await getUserProfile(token);
        if (cancelled) return;
        if (!profile.selectedProviderId) {
          setNoProvider(true);
          setLoading(false);
          return;
        }
        setProviderId(profile.selectedProviderId);
        await loadRates(profile.selectedProviderId, rateMonth, rateYear);
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleMonthChange = (month, year) => {
    setRateMonth(month);
    setRateYear(year);
    if (providerId) loadRates(providerId, month, year);
  };

  if (!isAuthenticated) return null;

  if (noProvider) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No utility provider selected. Complete onboarding or go to Tools to set up your provider.
      </Alert>
    );
  }

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Utility Rates
          </Typography>
          <Stack direction="row" spacing={1} alignItems="flex-end">
            <TextField
              select
              label="Month"
              size="small"
              value={rateMonth}
              onChange={(e) => handleMonthChange(Number(e.target.value), rateYear)}
              sx={{ width: 130 }}
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
              onChange={(e) => handleMonthChange(rateMonth, Number(e.target.value))}
              inputProps={{ min: 2020, max: 2035 }}
              sx={{ width: 90 }}
            />
          </Stack>
        </Stack>

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Stack alignItems="center" sx={{ py: 3 }}>
            <CircularProgress />
          </Stack>
        )}

        {!loading && dailyRows.length === 0 && !error && (
          <Alert severity="info">
            No rate data for {MONTHS[rateMonth - 1]} {rateYear}. Go to Tools to generate rates for this month.
          </Alert>
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
  );
}

export default function BillingPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [history, setHistory] = React.useState(initialHistory);
  const [form, setForm] = React.useState(emptyForm);
  const [uploadPreview, setUploadPreview] = React.useState(null);
  const [uploadFile, setUploadFile] = React.useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setTab(0);
    setForm(emptyForm);
    setUploadPreview(null);
    setUploadFile(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setUploadPreview(null);
    setUploadFile(null);
  };

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setUploadPreview(null);
    setUploadFile(null);
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmitManual = (e) => {
    e.preventDefault();
    const newBill = {
      id: crypto.randomUUID(),
      month: Number(form.month),
      year: Number(form.year),
      totalAmount: parseFloat(form.totalAmount) || 0,
      usageKwh: parseInt(form.usageKwh, 10) || 0,
      utility: form.utility || '—',
    };
    setHistory((prev) => [newBill, ...prev]);
    handleCloseDialog();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = () => setUploadPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
      const reader = new FileReader();
      reader.onload = () => setUploadPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddFromUpload = () => {
    if (!uploadFile) return;
    const newBill = {
      id: crypto.randomUUID(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      totalAmount: null,
      usageKwh: null,
      utility: 'From upload',
    };
    setHistory((prev) => [newBill, ...prev]);
    handleCloseDialog();
  };

  const handleDeleteBill = (id) => {
    setHistory((prev) => prev.filter((b) => b.id !== id));
  };

  const columns = [
    {
      field: 'period',
      headerName: 'Period',
      flex: 1.2,
      minWidth: 150,
      renderCell: renderPeriod,
      sortComparator: (a, b, paramA, paramB) => {
        const rowA = paramA.api.getRow(paramA.id);
        const rowB = paramB.api.getRow(paramB.id);
        return (rowA.year * 12 + rowA.month) - (rowB.year * 12 + rowB.month);
      },
    },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      flex: 0.8,
      minWidth: 100,
      headerAlign: 'right',
      align: 'right',
      renderCell: renderAmount,
    },
    {
      field: 'usageKwh',
      headerName: 'Usage',
      flex: 0.8,
      minWidth: 110,
      headerAlign: 'right',
      align: 'right',
      renderCell: renderUsage,
    },
    {
      field: 'trend',
      headerName: 'Level',
      flex: 0.6,
      minWidth: 90,
      valueGetter: (value, row) => row.totalAmount,
      renderCell: renderTrend,
      sortable: false,
    },
    { field: 'utility', headerName: 'Utility', flex: 1, minWidth: 140 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      minWidth: 70,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteBill(params.row.id)}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Billing
      </Typography>

      <UtilityRatesView />

      <Divider sx={{ my: 3 }} />

      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
      >
        <Typography component="h3" variant="subtitle1" fontWeight={600}>
          Bill History
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddRoundedIcon />}
          onClick={handleOpenDialog}
        >
          Add Bill
        </Button>
      </Stack>
      <DataGrid
        rows={history}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
          sorting: { sortModel: [{ field: 'period', sort: 'desc' }] },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        disableRowSelectionOnClick
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: { variant: 'outlined', size: 'small' },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: { variant: 'outlined', size: 'small' },
              },
            },
          },
        }}
      />

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add utility bill</DialogTitle>
        <Tabs value={tab} onChange={handleTabChange} aria-label="Add bill method" sx={{ px: 2 }}>
          <Tab label="Enter manually" {...a11yProps(0)} />
          <Tab label="Upload image" {...a11yProps(1)} />
        </Tabs>
        <DialogContent>
          {tab === 0 && (
            <Box component="form" id="bill-form" onSubmit={handleSubmitManual}>
              <Stack spacing={2} sx={{ pt: 1 }}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Month"
                    value={form.month}
                    onChange={handleFormChange('month')}
                  >
                    {MONTHS.map((m, i) => (
                      <MenuItem key={m} value={i + 1}>{m}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    type="number"
                    label="Year"
                    value={form.year}
                    onChange={handleFormChange('year')}
                    inputProps={{ min: 2020, max: 2030 }}
                    sx={{ width: 120 }}
                  />
                </Stack>
                <TextField
                  type="number"
                  label="Total amount ($)"
                  value={form.totalAmount}
                  onChange={handleFormChange('totalAmount')}
                  inputProps={{ min: 0, step: 0.01 }}
                  placeholder="e.g. 127.40"
                />
                <TextField
                  type="number"
                  label="Usage (kWh)"
                  value={form.usageKwh}
                  onChange={handleFormChange('usageKwh')}
                  inputProps={{ min: 0 }}
                  placeholder="e.g. 842"
                />
                <TextField
                  label="Utility company"
                  value={form.utility}
                  onChange={handleFormChange('utility')}
                  placeholder="e.g. Local Electric Co"
                />
                <TextField
                  label="Notes (optional)"
                  value={form.notes}
                  onChange={handleFormChange('notes')}
                  multiline
                  rows={2}
                  placeholder="Meter reading, plan name, etc."
                />
              </Stack>
            </Box>
          )}
          {tab === 1 && (
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Box
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'action.hover',
                  cursor: 'pointer',
                }}
                onClick={() => document.getElementById('bill-file-input').click()}
              >
                <input
                  id="bill-file-input"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
                {uploadPreview ? (
                  <Stack alignItems="center" spacing={1}>
                    <Box
                      component="img"
                      src={uploadPreview}
                      alt="Bill preview"
                      sx={{ maxHeight: 180, maxWidth: '100%', borderRadius: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {uploadFile?.name}
                    </Typography>
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadPreview(null);
                        setUploadFile(null);
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                ) : (
                  <>
                    <AddPhotoAlternateRoundedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Drag and drop or click to browse
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      PNG, JPG
                    </Typography>
                  </>
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                Bill data can be extracted later. This saves the entry to your history.
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {tab === 0 ? (
            <Button type="submit" form="bill-form" variant="contained">
              Add to history
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={!uploadFile}
              onClick={handleAddFromUpload}
            >
              Save to history
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

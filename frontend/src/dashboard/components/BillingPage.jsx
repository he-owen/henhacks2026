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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth0 } from '@auth0/auth0-react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Copyright from '../internals/components/Copyright';
import {
  getUserProfile,
  getMonthlyRates,
  getBills,
  createBill,
  updateBill,
  extractBillFromPdf,
  deleteBill,
} from '../../api';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function renderAmount(params) {
  if (params.value == null) return '—';
  return `$${params.value.toFixed(2)}`;
}

function renderPeriod(params) {
  return `${MONTHS[params.row.month - 1]} ${params.row.year}`;
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
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [isAuthenticated, getAccessTokenSilently]);

  React.useEffect(() => {
    if (!providerId) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setDailyRows([]);
      try {
        const token = await getAccessTokenSilently();
        const rates = await getMonthlyRates(token, providerId, rateMonth, rateYear);
        if (cancelled) return;
        if (rates.length > 0) {
          setDailyRows(groupRatesByDay(rates));
        }
      } catch (e) {
        if (!cancelled) setError(e?.message ?? 'Failed to load rates');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [providerId, rateMonth, rateYear, getAccessTokenSilently]);

  if (!isAuthenticated) return null;

  if (noProvider) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No utility provider selected. Complete onboarding or go to Tools to set up your provider.
      </Alert>
    );
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <TextField
            select
            label="Month"
            size="small"
            value={rateMonth}
            onChange={(e) => setRateMonth(Number(e.target.value))}
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
            onChange={(e) => setRateYear(Number(e.target.value))}
            inputProps={{ min: 2020, max: 2035 }}
            sx={{ width: 90 }}
          />
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
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingBill, setEditingBill] = React.useState(null);
  const [tab, setTab] = React.useState(0);
  const [history, setHistory] = React.useState([]);
  const [form, setForm] = React.useState(emptyForm);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [extracting, setExtracting] = React.useState(false);
  const [extractedData, setExtractedData] = React.useState(null);
  const [extractError, setExtractError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);

  const loadBills = React.useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const token = await getAccessTokenSilently();
      const bills = await getBills(token);
      setHistory(bills);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  React.useEffect(() => {
    loadBills();
  }, [loadBills]);

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setEditingBill(null);
    setTab(0);
    setForm(emptyForm);
    setUploadFile(null);
    setExtractedData(null);
    setExtractError(null);
    setExtracting(false);
  };

  const handleEditBill = (bill) => {
    setDialogOpen(true);
    setEditingBill(bill);
    setTab(0);
    setForm({
      month: bill.month,
      year: bill.year,
      totalAmount: bill.totalAmount ?? '',
    });
    setUploadFile(null);
    setExtractedData(null);
    setExtractError(null);
    setExtracting(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingBill(null);
    setUploadFile(null);
    setExtractedData(null);
    setExtractError(null);
    setExtracting(false);
  };

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setUploadFile(null);
    setExtractedData(null);
    setExtractError(null);
    setExtracting(false);
  };

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmitManual = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = await getAccessTokenSilently();
      const payload = {
        month: Number(form.month),
        year: Number(form.year),
        totalAmount: parseFloat(form.totalAmount) || 0,
      };
      if (editingBill) {
        const updated = await updateBill(token, editingBill.id, payload);
        setHistory((prev) => prev.map((b) => (b.id === editingBill.id ? updated : b)));
      } else {
        const bill = await createBill(token, payload);
        setHistory((prev) => [bill, ...prev]);
      }
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadFile(file);
      setExtractedData(null);
      setExtractError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadFile(file);
      setExtractedData(null);
      setExtractError(null);
    }
  };

  const handleExtract = async () => {
    if (!uploadFile) return;
    setExtracting(true);
    setExtractError(null);
    try {
      const token = await getAccessTokenSilently();
      const data = await extractBillFromPdf(token, uploadFile);
      setExtractedData(data);
    } catch (err) {
      setExtractError(err.message);
    } finally {
      setExtracting(false);
    }
  };

  const handleExtractedFormChange = (field) => (e) => {
    setExtractedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveExtracted = async () => {
    if (!extractedData) return;
    setSaving(true);
    try {
      const token = await getAccessTokenSilently();
      const bill = await createBill(token, {
        month: Number(extractedData.month),
        year: Number(extractedData.year),
        totalAmount: parseFloat(extractedData.totalAmount) || 0,
      });
      setHistory((prev) => [bill, ...prev]);
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteBill(token, id);
      setHistory((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    {
      field: 'period',
      headerName: 'Month',
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
      headerName: 'Price',
      flex: 1,
      minWidth: 120,
      headerAlign: 'right',
      align: 'right',
      renderCell: renderAmount,
    },
    {
      field: 'actions',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', height: '100%' }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => handleEditBill(params.row)}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteBill(params.row.id)}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Billing
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
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

      {loading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      ) : (
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
      )}

      <Accordion defaultExpanded={false} sx={{ mt: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight={600}>
            Utility Rates
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0 }}>
          <UtilityRatesView />
        </AccordionDetails>
      </Accordion>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingBill ? 'Edit bill' : 'Add utility bill'}</DialogTitle>
        {!editingBill && (
          <Tabs value={tab} onChange={handleTabChange} aria-label="Add bill method" sx={{ px: 2 }}>
            <Tab label="Enter manually" {...a11yProps(0)} />
            <Tab label="Upload PDF" {...a11yProps(1)} />
          </Tabs>
        )}
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
              </Stack>
            </Box>
          )}
          {tab === 1 && !editingBill && (
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Box
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                sx={{
                  border: '2px dashed',
                  borderColor: uploadFile ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'action.hover',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onClick={() => document.getElementById('bill-file-input').click()}
              >
                <input
                  id="bill-file-input"
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={handleFileChange}
                />
                {uploadFile ? (
                  <Stack alignItems="center" spacing={1}>
                    <UploadFileRoundedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="body2" fontWeight={500}>
                      {uploadFile.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(uploadFile.size / 1024).toFixed(0)} KB
                    </Typography>
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadFile(null);
                        setExtractedData(null);
                        setExtractError(null);
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                ) : (
                  <>
                    <UploadFileRoundedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Drag and drop or click to browse
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      PDF files only
                    </Typography>
                  </>
                )}
              </Box>

              {uploadFile && !extractedData && !extracting && (
                <Button
                  variant="outlined"
                  onClick={handleExtract}
                  startIcon={<UploadFileRoundedIcon />}
                >
                  Extract bill data with AI
                </Button>
              )}

              {extracting && (
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Analyzing your bill with AI...
                  </Typography>
                  <LinearProgress />
                </Stack>
              )}

              {extractError && (
                <Alert severity="error" onClose={() => setExtractError(null)}>
                  {extractError}
                </Alert>
              )}

              {extractedData && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={600}>
                      Extracted Data — Review & Save
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          select
                          fullWidth
                          label="Month"
                          value={extractedData.month}
                          onChange={handleExtractedFormChange('month')}
                        >
                          {MONTHS.map((m, i) => (
                            <MenuItem key={m} value={i + 1}>{m}</MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          type="number"
                          label="Year"
                          value={extractedData.year}
                          onChange={handleExtractedFormChange('year')}
                          inputProps={{ min: 2020, max: 2035 }}
                          sx={{ width: 120 }}
                        />
                      </Stack>
                      <TextField
                        type="number"
                        label="Total amount ($)"
                        value={extractedData.totalAmount ?? ''}
                        onChange={handleExtractedFormChange('totalAmount')}
                        inputProps={{ min: 0, step: 0.01 }}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {tab === 0 || editingBill ? (
            <Button type="submit" form="bill-form" variant="contained" disabled={saving}>
              {saving ? 'Saving...' : editingBill ? 'Update' : 'Add to history'}
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={!extractedData || saving}
              onClick={handleSaveExtracted}
            >
              {saving ? 'Saving...' : 'Save to history'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

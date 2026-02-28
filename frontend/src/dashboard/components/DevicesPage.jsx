import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth0 } from '@auth0/auth0-react';
import Copyright from '../internals/components/Copyright';
import DeviceFormDialog from './DeviceFormDialog';
import { getDevices, createDevice, updateDevice, deleteDevice } from '../../api';

function renderSmartChip(params) {
  return (
    <Chip
      label={params.value ? 'Smart' : 'Standard'}
      color={params.value ? 'success' : 'default'}
      size="small"
      variant="outlined"
    />
  );
}

function formatEnergy(params) {
  if (params.value == null) return '—';
  return `${params.value} kWh`;
}

function formatDuration(params) {
  if (params.value == null) return '—';
  const hours = Math.floor(params.value / 60);
  const mins = params.value % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export default function DevicesPage() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [devices, setDevices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingDevice, setEditingDevice] = React.useState(null);
  const [saving, setSaving] = React.useState(false);

  const fetchDevices = React.useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const list = await getDevices(token);
      setDevices(list);
    } catch (e) {
      setError(e?.message ?? 'Failed to load devices');
      setDevices([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  React.useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handleAdd = () => {
    setEditingDevice(null);
    setDialogOpen(true);
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteDevice(token, id);
      setDevices((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      setError(e?.message ?? 'Failed to delete device');
    }
  };

  const handleSave = async (formData) => {
    setSaving(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      if (editingDevice) {
        const updated = await updateDevice(token, editingDevice.id, formData);
        setDevices((prev) =>
          prev.map((d) => (d.id === editingDevice.id ? updated : d)),
        );
      } else {
        const created = await createDevice(token, formData);
        setDevices((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } catch (e) {
      setError(e?.message ?? 'Failed to save device');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Device Name', flex: 1.5, minWidth: 160 },
    { field: 'type', headerName: 'Type', flex: 0.8, minWidth: 100 },
    { field: 'brand', headerName: 'Brand', flex: 0.8, minWidth: 100 },
    { field: 'model', headerName: 'Model', flex: 1, minWidth: 120 },
    {
      field: 'hourlyEnergy',
      headerName: 'Hourly Energy',
      flex: 0.8,
      minWidth: 110,
      headerAlign: 'right',
      align: 'right',
      renderCell: formatEnergy,
    },
    {
      field: 'isSmart',
      headerName: 'Smart',
      flex: 0.6,
      minWidth: 90,
      renderCell: renderSmartChip,
    },
    {
      field: 'runDurationMinutes',
      headerName: 'Daily Run Time',
      flex: 0.8,
      minWidth: 110,
      headerAlign: 'right',
      align: 'right',
      renderCell: formatDuration,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.6,
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  if (!isAuthenticated) {
    return (
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Alert severity="info">Sign in to view and manage your devices.</Alert>
        <Copyright sx={{ my: 4 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
      >
        <Typography component="h2" variant="h6">
          Devices
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddRoundedIcon />}
          onClick={handleAdd}
          disabled={loading}
        >
          Add Device
        </Button>
      </Stack>
      {loading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress />
        </Stack>
      ) : (
      <DataGrid
        rows={devices}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
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
      <DeviceFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        device={editingDevice}
        saving={saving}
      />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

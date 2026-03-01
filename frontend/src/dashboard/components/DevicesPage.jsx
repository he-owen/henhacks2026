import * as React from 'react';
import { flushSync } from 'react-dom';
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
import { getDevices, createDevice, createDeviceBatch, updateDevice, deleteDevice } from '../../api';
import { useLocation } from '../context/LocationContext';
import { useScrollHighlight } from '../hooks/useScrollHighlight';

const PENDING_SPINNER = (
  <Box
    sx={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress size={18} />
  </Box>
);
const PENDING_CELL_WRAPPER_SX = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: 40,
  display: 'block',
};

function renderSmartChip(params) {
  if (params.row._pending) return <Box sx={PENDING_CELL_WRAPPER_SX}>{PENDING_SPINNER}</Box>;
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
  if (params.row._pending) return <Box sx={PENDING_CELL_WRAPPER_SX}>{PENDING_SPINNER}</Box>;
  if (params.value == null) return '—';
  return `${params.value} kWh`;
}

function formatDuration(params) {
  if (params.row._pending) return <Box sx={PENDING_CELL_WRAPPER_SX}>{PENDING_SPINNER}</Box>;
  if (params.value == null) return '—';
  const hours = Math.floor(params.value / 60);
  const mins = params.value % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function renderType(params) {
  if (params.row._pending) return <Box sx={PENDING_CELL_WRAPPER_SX}>{PENDING_SPINNER}</Box>;
  return params.value || '—';
}

const SESSION_EXPIRED_MESSAGE = 'Session expired or invalid. Please sign in again.';

export default function DevicesPage() {
  useScrollHighlight();
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const { locations, selectedLocationId } = useLocation();
  const [allDevices, setAllDevices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingDevice, setEditingDevice] = React.useState(null);
  const [saving, setSaving] = React.useState(false);

  const fetchingRef = React.useRef(false);

  const handleRelogin = () => {
    setError(null);
    loginWithRedirect({ appState: { returnTo: window.location.pathname } });
  };

  const fetchDevices = React.useCallback(async () => {
    if (!isAuthenticated) return;
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const list = await getDevices(token);
      setAllDevices(list);
    } catch (e) {
      setError(e?.isUnauthorized ? SESSION_EXPIRED_MESSAGE : (e?.message ?? 'Failed to load devices'));
      setAllDevices([]);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchDevices();
  }, [isAuthenticated, fetchDevices]);

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
      setAllDevices((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      setError(e?.isUnauthorized ? SESSION_EXPIRED_MESSAGE : (e?.message ?? 'Failed to delete device'));
    }
  };

  const handleSave = async (formData) => {
    setError(null);
    if (editingDevice) {
      setSaving(true);
      try {
        const token = await getAccessTokenSilently();
        const updated = await updateDevice(token, editingDevice.id, formData);
        const updatedLoc = locations.find((l) => l.id === updated.locationId);
        updated.locationName = updatedLoc?.name || null;
        setAllDevices((prev) =>
          prev.map((d) => (d.id === editingDevice.id ? updated : d)),
        );
        setDialogOpen(false);
      } catch (e) {
        setError(e?.isUnauthorized ? SESSION_EXPIRED_MESSAGE : (e?.message ?? 'Failed to save device'));
      } finally {
        setSaving(false);
      }
      return;
    }

    const quantity = formData.quantity || 1;
    const effectiveLocationId = formData.locationId || selectedLocationId || null;
    const matchedLoc = locations.find((l) => l.id === effectiveLocationId);

    const pendingIds = [];
    const optimisticRows = [];
    for (let i = 0; i < quantity; i++) {
      const pid = `pending-${Date.now()}-${i}`;
      pendingIds.push(pid);
      optimisticRows.push({
        id: pid,
        name: quantity > 1 ? `${formData.name} (${i + 1})` : formData.name,
        brand: formData.brand,
        model: formData.model,
        locationId: effectiveLocationId,
        locationName: matchedLoc?.name || null,
        type: '',
        hourlyEnergy: 0,
        isSmart: formData.isSmart ?? false,
        runDurationMinutes: 0,
        _pending: true,
      });
    }

    flushSync(() => {
      setAllDevices((prev) => [...prev, ...optimisticRows]);
      setDialogOpen(false);
      setSaving(true);
    });

    try {
      const token = await getAccessTokenSilently();
      const extraFields = {};
      if (formData.hourlyEnergy != null) extraFields.hourlyEnergy = formData.hourlyEnergy;
      if (formData.runDurationMinutes != null) extraFields.runDurationMinutes = formData.runDurationMinutes;

      if (quantity > 1) {
        const createdDevices = await createDeviceBatch(token, {
          name: formData.name,
          brand: formData.brand,
          model: formData.model,
          locationId: effectiveLocationId,
          isSmart: formData.isSmart,
          quantity,
          ...extraFields,
        });
        setAllDevices((prev) => {
          let updated = [...prev];
          createdDevices.forEach((created, i) => {
            created.locationName = matchedLoc?.name || null;
            updated = updated.map((d) => (d.id === pendingIds[i] ? created : d));
          });
          return updated;
        });
      } else {
        const created = await createDevice(token, {
          name: formData.name,
          brand: formData.brand,
          model: formData.model,
          locationId: effectiveLocationId,
          isSmart: formData.isSmart,
          ...extraFields,
        });
        created.locationName = matchedLoc?.name || null;
        setAllDevices((prev) =>
          prev.map((d) => (d.id === pendingIds[0] ? created : d)),
        );
      }
    } catch (e) {
      setAllDevices((prev) => prev.filter((d) => !pendingIds.includes(d.id)));
      setError(e?.isUnauthorized ? SESSION_EXPIRED_MESSAGE : (e?.message ?? 'Failed to add devices'));
    } finally {
      setSaving(false);
    }
  };

  const processRowUpdate = React.useCallback(async (newRow) => {
    const token = await getAccessTokenSilently();
    const payload = {
      name: newRow.name,
      brand: newRow.brand,
      model: newRow.model,
      type: newRow.type,
      locationId: newRow.locationId || null,
      isSmart: newRow.isSmart,
      hourlyEnergy: newRow.hourlyEnergy != null ? parseFloat(newRow.hourlyEnergy) : null,
      runDurationMinutes: newRow.runDurationMinutes != null ? parseInt(newRow.runDurationMinutes, 10) : null,
    };
    const updated = await updateDevice(token, newRow.id, payload);
    const loc = locations.find((l) => l.id === updated.locationId);
    updated.locationName = loc?.name || null;
    setAllDevices((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    return updated;
  }, [getAccessTokenSilently, locations]);

  const handleProcessRowUpdateError = React.useCallback((error) => {
    setError(error?.isUnauthorized ? SESSION_EXPIRED_MESSAGE : (error?.message ?? 'Failed to update device'));
  }, []);

  const devices = selectedLocationId
    ? allDevices.filter((d) => d.locationId === selectedLocationId)
    : allDevices;

  const isAllView = !selectedLocationId;
  const selectedLocName = selectedLocationId
    ? locations.find((l) => l.id === selectedLocationId)?.name
    : null;

  const columns = [
    {
      field: 'name',
      headerName: 'Device Name',
      flex: 1.5,
      minWidth: 160,
      headerAlign: 'center',
      align: 'center',
    },
    ...(isAllView
      ? [
          {
            field: 'locationId',
            headerName: 'Location',
            flex: 0.8,
            minWidth: 120,
            headerAlign: 'center',
            align: 'center',
            editable: true,
            type: 'singleSelect',
            valueOptions: [
              { value: '', label: 'No location' },
              ...locations.map((l) => ({ value: l.id, label: `${l.name} — ${l.zip}` })),
            ],
            valueGetter: (value) => value || '',
            renderCell: (params) => {
              if (params.row._pending) return <Box sx={PENDING_CELL_WRAPPER_SX}>{PENDING_SPINNER}</Box>;
              const loc = locations.find((l) => l.id === params.row.locationId);
              return loc ? loc.name : '—';
            },
          },
        ]
      : []),
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.8,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: renderType,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex: 0.8,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'model',
      headerName: 'Model',
      flex: 1,
      minWidth: 120,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'hourlyEnergy',
      headerName: 'Energy (kWh)',
      flex: 0.8,
      minWidth: 110,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'number',
      renderCell: formatEnergy,
    },
    {
      field: 'isSmart',
      headerName: 'Smart',
      flex: 0.6,
      minWidth: 90,
      headerAlign: 'center',
      align: 'center',
      renderCell: renderSmartChip,
    },
    {
      field: 'runDurationMinutes',
      headerName: 'Run Time (min)',
      flex: 0.8,
      minWidth: 110,
      headerAlign: 'center',
      align: 'center',
      editable: true,
      type: 'number',
      renderCell: formatDuration,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.6,
      minWidth: 100,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        if (params.row._pending) {
          return (
            <Typography variant="caption" color="text.secondary">
              Adding…
            </Typography>
          );
        }
        const actionBtnSx = {
          width: 28,
          height: 28,
          minWidth: 24,
          minHeight: 24,
          padding: 0,
          '& .MuiSvgIcon-root': { fontSize: 14 },
        };
        return (
          <Stack direction="row" spacing={0} justifyContent="center">
            <Tooltip title="Edit">
              <IconButton sx={actionBtnSx} onClick={() => handleEdit(params.row)}>
                <EditRoundedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" sx={actionBtnSx} onClick={() => handleDelete(params.row.id)}>
                <DeleteRoundedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
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
        <Alert
          severity="error"
          onClose={() => setError(null)}
          action={
            error === SESSION_EXPIRED_MESSAGE ? (
              <Button color="inherit" size="small" onClick={handleRelogin}>
                Sign in again
              </Button>
            ) : null
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}
      <Stack
        id="devices-header"
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
      >
        <Typography component="h2" variant="h6">
          {selectedLocName ? `Devices — ${selectedLocName}` : 'All Devices'}
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
        getRowId={(row) => row.id}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        isCellEditable={(params) => !params.row._pending}
        sx={{
          '& .MuiDataGrid-cell': { position: 'relative' },
          '& .MuiDataGrid-cellContent': { height: '100%', width: '100%' },
          '& .MuiDataGrid-cell--editable': {
            cursor: 'pointer',
            '&:hover': { bgcolor: 'action.hover' },
          },
        }}
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
        locations={locations}
        defaultLocationId={selectedLocationId}
      />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

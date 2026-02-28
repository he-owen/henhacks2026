import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { DataGrid } from '@mui/x-data-grid';
import Copyright from '../internals/components/Copyright';
import DeviceFormDialog from './DeviceFormDialog';

const sampleDevices = [
  {
    id: '1',
    name: 'Living Room AC',
    type: 'HVAC',
    brand: 'Samsung',
    model: 'WindFree 2.0',
    hourlyEnergy: 1.2,
    isSmart: true,
    runDurationMinutes: 480,
  },
  {
    id: '2',
    name: 'Kitchen Refrigerator',
    type: 'Appliance',
    brand: 'LG',
    model: 'InstaView',
    hourlyEnergy: 0.15,
    isSmart: true,
    runDurationMinutes: 1440,
  },
  {
    id: '3',
    name: 'Bedroom Lights',
    type: 'Lighting',
    brand: 'Philips',
    model: 'Hue A19',
    hourlyEnergy: 0.06,
    isSmart: true,
    runDurationMinutes: 300,
  },
  {
    id: '4',
    name: 'Water Heater',
    type: 'Water Heater',
    brand: 'Rheem',
    model: 'ProTerra',
    hourlyEnergy: 4.5,
    isSmart: false,
    runDurationMinutes: 120,
  },
  {
    id: '5',
    name: 'Garage EV Charger',
    type: 'EV Charger',
    brand: 'ChargePoint',
    model: 'Home Flex',
    hourlyEnergy: 9.6,
    isSmart: true,
    runDurationMinutes: 240,
  },
  {
    id: '6',
    name: 'Office Desktop',
    type: 'Electronics',
    brand: 'Dell',
    model: 'OptiPlex 7090',
    hourlyEnergy: 0.2,
    isSmart: false,
    runDurationMinutes: 480,
  },
  {
    id: '7',
    name: 'Washing Machine',
    type: 'Appliance',
    brand: 'Whirlpool',
    model: 'WFW9620',
    hourlyEnergy: 0.5,
    isSmart: false,
    runDurationMinutes: 60,
  },
  {
    id: '8',
    name: 'Rooftop Solar',
    type: 'Solar',
    brand: 'SunPower',
    model: 'Maxeon 6',
    hourlyEnergy: -3.2,
    isSmart: true,
    runDurationMinutes: 600,
  },
];

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
  const [devices, setDevices] = React.useState(sampleDevices);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingDevice, setEditingDevice] = React.useState(null);

  const handleAdd = () => {
    setEditingDevice(null);
    setDialogOpen(true);
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSave = (formData) => {
    if (editingDevice) {
      setDevices((prev) =>
        prev.map((d) =>
          d.id === editingDevice.id ? { ...d, ...formData } : d,
        ),
      );
    } else {
      setDevices((prev) => [
        ...prev,
        { ...formData, id: crypto.randomUUID() },
      ]);
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

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
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
        >
          Add Device
        </Button>
      </Stack>
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
      <DeviceFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        device={editingDevice}
      />
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

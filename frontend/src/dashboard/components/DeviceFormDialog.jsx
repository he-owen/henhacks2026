import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

const DEVICE_TYPES = [
  'HVAC',
  'Lighting',
  'Appliance',
  'Electronics',
  'Water Heater',
  'EV Charger',
  'Solar',
  'Other',
];

const emptyDevice = {
  name: '',
  type: '',
  brand: '',
  model: '',
  hourlyEnergy: '',
  isSmart: false,
  runDurationMinutes: '',
};

export default function DeviceFormDialog({ open, onClose, onSave, device, saving = false }) {
  const [form, setForm] = React.useState(emptyDevice);
  const isEdit = Boolean(device);

  React.useEffect(() => {
    if (device) {
      setForm({
        name: device.name || '',
        type: device.type || '',
        brand: device.brand || '',
        model: device.model || '',
        hourlyEnergy: device.hourlyEnergy ?? '',
        isSmart: device.isSmart || false,
        runDurationMinutes: device.runDurationMinutes ?? '',
      });
    } else {
      setForm(emptyDevice);
    }
  }, [device, open]);

  const handleChange = (field) => (e) => {
    const value = field === 'isSmart' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      hourlyEnergy: form.hourlyEnergy !== '' ? parseFloat(form.hourlyEnergy) : null,
      runDurationMinutes:
        form.runDurationMinutes !== '' ? parseInt(form.runDurationMinutes, 10) : null,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { component: 'form', onSubmit: handleSubmit },
      }}
    >
      <DialogTitle>{isEdit ? 'Edit Device' : 'Add Device'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            required
            label="Device Name"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
            placeholder="e.g. Living Room AC"
          />
          <TextField
            required
            select
            label="Type"
            value={form.type}
            onChange={handleChange('type')}
            fullWidth
          >
            {DEVICE_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Brand"
              value={form.brand}
              onChange={handleChange('brand')}
              fullWidth
              placeholder="e.g. Samsung"
            />
            <TextField
              label="Model"
              value={form.model}
              onChange={handleChange('model')}
              fullWidth
              placeholder="e.g. WindFree 2.0"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Hourly Energy (kWh)"
              type="number"
              value={form.hourlyEnergy}
              onChange={handleChange('hourlyEnergy')}
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              label="Run Duration (min/day)"
              type="number"
              value={form.runDurationMinutes}
              onChange={handleChange('runDurationMinutes')}
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Stack>
          <FormControlLabel
            control={
              <Switch
                checked={form.isSmart}
                onChange={handleChange('isSmart')}
              />
            }
            label="Smart Device"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={saving}>
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Device'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeviceFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  device: PropTypes.object,
  saving: PropTypes.bool,
};

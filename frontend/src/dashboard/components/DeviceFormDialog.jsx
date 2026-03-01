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

const emptyDevice = {
  name: '',
  brand: '',
  model: '',
  locationId: '',
  isSmart: false,
  hourlyEnergy: '',
  runDurationMinutes: '',
  quantity: 1,
};

export default function DeviceFormDialog({ open, onClose, onSave, device, saving = false, locations = [], defaultLocationId = null }) {
  const [form, setForm] = React.useState(emptyDevice);
  const isEdit = Boolean(device);

  React.useEffect(() => {
    if (device) {
      setForm({
        name: device.name || '',
        brand: device.brand || '',
        model: device.model || '',
        locationId: device.locationId || '',
        isSmart: device.isSmart ?? false,
        hourlyEnergy: device.hourlyEnergy ?? '',
        runDurationMinutes: device.runDurationMinutes ?? '',
        quantity: 1,
      });
    } else {
      setForm({
        ...emptyDevice,
        locationId: defaultLocationId || (locations.length === 1 ? locations[0].id : ''),
      });
    }
  }, [device, open, locations, defaultLocationId]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      model: form.model.trim(),
      locationId: form.locationId || null,
      isSmart: form.isSmart,
      quantity: isEdit ? 1 : Math.max(1, parseInt(form.quantity, 10) || 1),
    };
    if (form.hourlyEnergy !== '' && form.hourlyEnergy != null) {
      payload.hourlyEnergy = parseFloat(form.hourlyEnergy);
    }
    if (form.runDurationMinutes !== '' && form.runDurationMinutes != null) {
      payload.runDurationMinutes = parseInt(form.runDurationMinutes, 10);
    }
    onSave(payload);
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
            label="Brand"
            value={form.brand}
            onChange={handleChange('brand')}
            fullWidth
            placeholder="e.g. Samsung"
          />
          <TextField
            required
            label="Model"
            value={form.model}
            onChange={handleChange('model')}
            fullWidth
            placeholder="e.g. WindFree 2.0"
          />
          <FormControlLabel
            control={
              <Switch
                checked={form.isSmart}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, isSmart: e.target.checked }))
                }
              />
            }
            label="Smart Device"
          />
          <TextField
            type="number"
            label="Hourly Energy (kWh)"
            value={form.hourlyEnergy}
            onChange={handleChange('hourlyEnergy')}
            inputProps={{ min: 0, step: 0.01 }}
            fullWidth
            helperText="Leave blank to auto-detect via AI"
          />
          <TextField
            type="number"
            label="Daily Run Time (minutes)"
            value={form.runDurationMinutes}
            onChange={handleChange('runDurationMinutes')}
            inputProps={{ min: 0, step: 1 }}
            fullWidth
            helperText="Leave blank to auto-detect via AI"
          />
          {!isEdit && (
            <TextField
              type="number"
              label="Quantity"
              value={form.quantity}
              onChange={handleChange('quantity')}
              inputProps={{ min: 1, max: 50 }}
              fullWidth
              helperText="Number of this device to add"
            />
          )}
          {locations.length > 0 && (
            <TextField
              select
              label="Location"
              value={form.locationId}
              onChange={handleChange('locationId')}
              fullWidth
              helperText="Which address is this device at?"
            >
              <MenuItem value="">
                <em>No location</em>
              </MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.name} — {loc.zip}
                </MenuItem>
              ))}
            </TextField>
          )}
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
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      zip: PropTypes.string,
    }),
  ),
  defaultLocationId: PropTypes.string,
};

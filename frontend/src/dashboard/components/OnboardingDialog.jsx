import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useAuth0 } from '@auth0/auth0-react';
import {
  fetchRateProviders,
  setUserProvider,
  generateMonthlyRates,
} from '../../api';

const STEPS = ['Enter your zip code', 'Select your utility provider'];

export default function OnboardingDialog({ open, onComplete }) {
  const { getAccessTokenSilently } = useAuth0();

  const [step, setStep] = React.useState(0);
  const [zipCode, setZipCode] = React.useState('');
  const [providers, setProviders] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleFetchProviders = async () => {
    if (!zipCode.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const list = await fetchRateProviders(token, zipCode.trim());
      if (list.length === 0) {
        setError('No utility providers found for this zip code. Try another.');
        return;
      }
      setProviders(list);
      setSelectedProvider(list[0].id);
      setStep(1);
    } catch (e) {
      setError(e?.message ?? 'Failed to fetch providers');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedProvider) return;
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      await setUserProvider(token, selectedProvider);
      const now = new Date();
      await generateMonthlyRates(token, selectedProvider, now.getMonth() + 1, now.getFullYear());
      onComplete();
    } catch (e) {
      setError(e?.message ?? 'Failed to save provider');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(0);
    setProviders([]);
    setSelectedProvider('');
    setError(null);
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
      onClose={(_, reason) => {
        if (reason === 'backdropClick') return;
      }}
    >
      <DialogTitle>Welcome! Let's set up your utility provider</DialogTitle>
      <DialogContent>
        <Stepper activeStep={step} sx={{ mt: 1, mb: 3 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {step === 0 && (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Enter your home zip code so we can find available utility providers and rate plans in your area.
            </Typography>
            <TextField
              label="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="e.g. 19805"
              fullWidth
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleFetchProviders();
              }}
            />
          </Stack>
        )}

        {step === 1 && (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              We found {providers.length} rate plan(s) for zip code {zipCode}. Select the one that matches your utility bill.
            </Typography>
            <TextField
              select
              label="Utility Provider / Rate Plan"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              fullWidth
            >
              {providers.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.utilityName} — {p.rateName}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {step === 1 && (
          <Button onClick={handleBack} disabled={loading}>
            Back
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        {step === 0 ? (
          <Button
            variant="contained"
            onClick={handleFetchProviders}
            disabled={loading || !zipCode.trim()}
            startIcon={loading ? <CircularProgress size={16} /> : undefined}
          >
            Find Providers
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={loading || !selectedProvider}
            startIcon={loading ? <CircularProgress size={16} /> : undefined}
          >
            Confirm & Continue
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}


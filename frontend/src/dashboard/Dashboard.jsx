import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import DevicesPage from './components/DevicesPage';
import BillingPage from './components/BillingPage';
import OptimizationPage from './components/OptimizationPage';
import ToolsPage from './components/ToolsPage';
import PreferencesPage from './components/PreferencesPage';
import AboutPage from './components/AboutPage';
import OnboardingDialog from './components/OnboardingDialog';
import ScheduleFeedbackDialog from './components/ScheduleFeedbackDialog';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { PageProvider, usePage } from './context/PageContext';
import { LocationProvider } from './context/LocationContext';
import { getUserProfile, generateTodaySchedule, getPendingSchedules, getSavingsSummary } from '../api';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function ScheduleAutoLoader({ children }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const {
    setTodaySchedule, setSavingsSummary,
    pendingSchedules, setPendingSchedules,
  } = usePage();
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated || loaded) return;
    let cancelled = false;

    (async () => {
      try {
        const token = await getAccessTokenSilently();

        const [schedule, pending, savings] = await Promise.allSettled([
          generateTodaySchedule(token),
          getPendingSchedules(token),
          getSavingsSummary(token),
        ]);

        if (cancelled) return;
        setLoaded(true);

        if (schedule.status === 'fulfilled' && schedule.value) {
          setTodaySchedule(schedule.value);
        }
        if (savings.status === 'fulfilled' && savings.value) {
          setSavingsSummary(savings.value);
        }
        if (pending.status === 'fulfilled' && pending.value?.length > 0) {
          setPendingSchedules(pending.value);
          setShowFeedback(true);
        }
      } catch {
        if (!cancelled) setLoaded(true);
      }
    })();

    return () => { cancelled = true; };
  }, [isAuthenticated, loaded, getAccessTokenSilently, setTodaySchedule, setSavingsSummary, setPendingSchedules]);

  const handleFeedbackComplete = React.useCallback(async () => {
    setShowFeedback(false);
    setPendingSchedules([]);
    try {
      const token = await getAccessTokenSilently();
      const savings = await getSavingsSummary(token);
      setSavingsSummary(savings);
    } catch { /* ignore */ }
  }, [getAccessTokenSilently, setSavingsSummary, setPendingSchedules]);

  return (
    <>
      {showFeedback && (
        <ScheduleFeedbackDialog
          pendingSchedules={pendingSchedules}
          onComplete={handleFeedbackComplete}
        />
      )}
      {children}
    </>
  );
}

function OnboardingGate({ children }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [needsOnboarding, setNeedsOnboarding] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;

    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const profile = await getUserProfile(token);
        if (!cancelled) {
          setNeedsOnboarding(!profile.selectedProviderId || !profile.hasPreferences);
          setChecked(true);
        }
      } catch {
        if (!cancelled) setChecked(true);
      }
    })();

    return () => { cancelled = true; };
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!checked) return null;

  return (
    <>
      <OnboardingDialog
        open={needsOnboarding}
        onComplete={() => setNeedsOnboarding(false)}
      />
      {children}
    </>
  );
}

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <PageProvider>
        <LocationProvider>
          <OnboardingGate>
            <ScheduleAutoLoader>
              <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                <Box
                  component="main"
                  sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                      ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                      : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                  })}
                >
                  <Stack
                    spacing={2}
                    sx={{
                      alignItems: 'center',
                      mx: 3,
                      pb: 5,
                      mt: { xs: 8, md: 0 },
                    }}
                  >
                    <Header />
                    <Routes>
                      <Route index element={<MainGrid />} />
                      <Route path="devices" element={<DevicesPage />} />
                      <Route path="billing" element={<BillingPage />} />
                      <Route path="optimization" element={<OptimizationPage />} />
                      <Route path="tools" element={<ToolsPage />} />
                      <Route path="preferences" element={<PreferencesPage />} />
                      <Route path="about" element={<AboutPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Stack>
                </Box>
              </Box>
            </ScheduleAutoLoader>
          </OnboardingGate>
        </LocationProvider>
      </PageProvider>
    </AppTheme>
  );
}

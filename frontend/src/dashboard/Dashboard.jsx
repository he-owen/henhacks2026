import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useAuth0 } from '@auth0/auth0-react';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import DevicesPage from './components/DevicesPage';
import BillingPage from './components/BillingPage';
import OptimizationPage from './components/OptimizationPage';
import ToolsPage from './components/ToolsPage';
import PreferencesPage from './components/PreferencesPage';
import OnboardingDialog from './components/OnboardingDialog';
import SideMenu from './components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { PageProvider, usePage } from './context/PageContext';
import { LocationProvider } from './context/LocationContext';
import { getUserProfile } from '../api';
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

function PageContent() {
  const { currentPage } = usePage();

  switch (currentPage) {
    case 'Devices':
      return <DevicesPage />;
    case 'Billing':
      return <BillingPage />;
    case 'Optimization':
      return <OptimizationPage />;
    case 'Tools':
      return <ToolsPage />;
    case 'Preferences':
      return <PreferencesPage />;
    default:
      return <MainGrid />;
  }
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
                  <PageContent />
                </Stack>
              </Box>
            </Box>
          </OnboardingGate>
        </LocationProvider>
      </PageProvider>
    </AppTheme>
  );
}

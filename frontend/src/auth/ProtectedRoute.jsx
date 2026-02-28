import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/** True when Auth0 has redirected back with code/state (callback in progress). */
function isAuth0Callback() {
  const params = new URLSearchParams(window.location.search);
  const hash = window.location.hash ? new URLSearchParams(window.location.hash.slice(1)) : null;
  return (
    (params.has('code') && params.has('state')) ||
    (hash && hash.has('code') && hash.has('state'))
  );
}

/**
 * Renders children only when the user is authenticated with Auth0.
 * Otherwise redirects to Auth0 login, then back to the current path.
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const isCallback = isAuth0Callback();

  useEffect(() => {
    if (isLoading) return;
    // Don't redirect to login while we're on the callback URL — let the SDK process it first.
    if (isCallback) return;
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: location.pathname + location.search },
      });
    }
  }, [isAuthenticated, isLoading, isCallback, loginWithRedirect, location.pathname, location.search]);

  // Show loading while Auth0 SDK is loading or while we're on the callback URL (SDK processing code/state).
  if (isLoading || isCallback) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          {isCallback ? 'Completing sign in…' : 'Loading…'}
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getLocations } from '../../api';

const LocationContext = React.createContext({
  locations: [],
  selectedLocationId: null,
  setSelectedLocationId: () => {},
  locationsLoading: true,
  refreshLocations: () => {},
});

export function LocationProvider({ children }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [locations, setLocations] = React.useState([]);
  const [selectedLocationId, setSelectedLocationId] = React.useState(null);
  const [locationsLoading, setLocationsLoading] = React.useState(true);

  const refreshLocations = React.useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const token = await getAccessTokenSilently();
      const locs = await getLocations(token);
      setLocations(locs);
      if (locs.length === 1 && selectedLocationId === null) {
        setSelectedLocationId(locs[0].id);
      }
    } catch (e) {
      console.error('Failed to load locations:', e);
    } finally {
      setLocationsLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently, selectedLocationId]);

  React.useEffect(() => {
    if (!isAuthenticated) {
      setLocationsLoading(false);
      return;
    }
    refreshLocations();
  }, [isAuthenticated, refreshLocations]);

  const value = React.useMemo(
    () => ({
      locations,
      selectedLocationId,
      setSelectedLocationId,
      locationsLoading,
      refreshLocations,
    }),
    [locations, selectedLocationId, locationsLoading, refreshLocations],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  return React.useContext(LocationContext);
}

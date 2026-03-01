import { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://henhacks2026.onrender.com').trim();

/**
 * When the user is authenticated with Auth0, syncs their profile to the backend users table
 * so they exist in the DB. Runs once per session when the user is logged in.
 */
export default function SyncUserToBackend() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const synced = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || synced.current) return;

    let cancelled = false;
    let retryCount = 0;
    const maxRetries = 3;

    const doSync = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (cancelled) return;
        const res = await fetch(`${API_BASE}/api/users/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (cancelled) return;
        if (res.ok) {
          synced.current = true;
          return;
        }
        const err = await res.json().catch(() => ({}));
        if (import.meta.env.DEV) {
          console.warn('[SyncUser] backend sync failed:', res.status, err);
        }
      } catch (e) {
        if (import.meta.env.DEV) {
          console.warn('[SyncUser] getAccessTokenSilently or fetch failed:', e?.message ?? e);
        }
        if (retryCount < maxRetries) {
          retryCount += 1;
          setTimeout(() => {
            if (!cancelled) doSync();
          }, 1000 * retryCount);
        }
      }
    };

    doSync();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

function authHeaders(accessToken) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function getStatus() {
  const res = await fetch(`${API_BASE}/api/status`);
  if (!res.ok) throw new Error("Backend not reachable");
  return res.json();
}

/** List devices for the current user. Requires accessToken. Throws with isUnauthorized: true on 401. */
export async function getDevices(accessToken) {
  const res = await fetch(`${API_BASE}/api/devices`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = err.detail || "Failed to load devices";
    const e = new Error(message);
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/** Create a device. Requires accessToken. Throws with isUnauthorized: true on 401. */
export async function createDevice(accessToken, data) {
  const res = await fetch(`${API_BASE}/api/devices`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Failed to create device");
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/** Update a device. Requires accessToken. Throws with isUnauthorized: true on 401. */
export async function updateDevice(accessToken, deviceId, data) {
  const res = await fetch(`${API_BASE}/api/devices/${encodeURIComponent(deviceId)}`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Failed to update device");
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/** Delete a device. Requires accessToken. Throws with isUnauthorized: true on 401. */
export async function deleteDevice(accessToken, deviceId) {
  const res = await fetch(`${API_BASE}/api/devices/${encodeURIComponent(deviceId)}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Failed to delete device");
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/**
 * Run the daily optimizer for the authenticated user's devices.
 * pricesByDay: number[7][24], dayOfWeek: string, userPreferences: object
 */
export async function runDailyOptimizationMe(accessToken, { pricesByDay, dayOfWeek, userPreferences }) {
  const res = await fetch(`${API_BASE}/api/optimize/daily/me`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify({
      prices_by_day: pricesByDay,
      day_of_week: dayOfWeek,
      user_preferences: userPreferences,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Optimization failed");
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/**
 * Run the weekly scheduler for the authenticated user's devices.
 * pricesByDay: number[7][24], userPreferences: object
 */
export async function runWeeklyOptimizationMe(accessToken, { pricesByDay, userPreferences }) {
  const res = await fetch(`${API_BASE}/api/optimize/weekly/me`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify({
      prices_by_day: pricesByDay,
      user_preferences: userPreferences,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Weekly optimization failed");
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/** Get the current user's profile (selectedProviderId, zip, etc.). */
export async function getUserProfile(accessToken) {
  const res = await fetch(`${API_BASE}/api/users/me/profile`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get profile");
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Utility rates
// ---------------------------------------------------------------------------

/** Fetch utility providers from OpenEI for a zip code. */
export async function fetchRateProviders(accessToken, zip) {
  const res = await fetch(`${API_BASE}/api/rates/fetch`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ zip }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to fetch providers");
  }
  return res.json();
}

/** Get cached utility providers for a zip code. */
export async function getRateProviders(accessToken, zip) {
  const res = await fetch(
    `${API_BASE}/api/rates/providers?zip=${encodeURIComponent(zip)}`,
    { headers: authHeaders(accessToken) },
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get providers");
  }
  return res.json();
}

/** Generate hourly rates for a provider/month/year. */
export async function generateMonthlyRates(accessToken, providerId, month, year) {
  const res = await fetch(`${API_BASE}/api/rates/generate`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ provider_id: providerId, month, year }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to generate rates");
  }
  return res.json();
}

/** Get hourly rates for a provider/month/year. */
export async function getMonthlyRates(accessToken, providerId, month, year) {
  const qs = new URLSearchParams({
    provider_id: providerId,
    month: String(month),
    year: String(year),
  });
  const res = await fetch(`${API_BASE}/api/rates/monthly?${qs}`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get monthly rates");
  }
  return res.json();
}

/** Set the user's selected utility provider. */
export async function setUserProvider(accessToken, providerId) {
  const res = await fetch(`${API_BASE}/api/users/me/provider`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ provider_id: providerId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to set provider");
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// User preferences
// ---------------------------------------------------------------------------

/** Get the current user's preferences. */
export async function getUserPreferences(accessToken) {
  const res = await fetch(`${API_BASE}/api/users/me/preferences`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get preferences");
  }
  return res.json();
}

/** Create or update the user's preferences. */
export async function saveUserPreferences(accessToken, data) {
  const res = await fetch(`${API_BASE}/api/users/me/preferences`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to save preferences");
  }
  return res.json();
}

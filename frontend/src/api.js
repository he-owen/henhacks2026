const API_BASE = (import.meta.env.VITE_API_URL || "https://henhacks2026.onrender.com").trim();

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

/** Create multiple identical devices in one call (Gemini enrichment happens once). Returns array. */
export async function createDeviceBatch(accessToken, data) {
  const res = await fetch(`${API_BASE}/api/devices/batch`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Failed to create devices");
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

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------

/** List locations for the current user. */
export async function getLocations(accessToken) {
  const res = await fetch(`${API_BASE}/api/locations`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Failed to load locations");
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/** Create a location. */
export async function createLocation(accessToken, data) {
  const res = await fetch(`${API_BASE}/api/locations`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create location");
  }
  return res.json();
}

/** Update a location. */
export async function updateLocation(accessToken, locationId, data) {
  const res = await fetch(`${API_BASE}/api/locations/${encodeURIComponent(locationId)}`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to update location");
  }
  return res.json();
}

/** Delete a location. */
export async function deleteLocation(accessToken, locationId) {
  const res = await fetch(`${API_BASE}/api/locations/${encodeURIComponent(locationId)}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to delete location");
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Bills
// ---------------------------------------------------------------------------

/** List bills for the current user. */
export async function getBills(accessToken) {
  const res = await fetch(`${API_BASE}/api/bills`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to load bills");
  }
  return res.json();
}

/** Create a bill manually. */
export async function createBill(accessToken, data) {
  const res = await fetch(`${API_BASE}/api/bills`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create bill");
  }
  return res.json();
}

/** Update a bill. */
export async function updateBill(accessToken, billId, data) {
  const res = await fetch(`${API_BASE}/api/bills/${encodeURIComponent(billId)}`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to update bill");
  }
  return res.json();
}

/** Upload a PDF bill and extract data via Gemini. Returns extracted fields (not saved yet). */
export async function extractBillFromPdf(accessToken, file) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}/api/bills/extract`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to extract bill data");
  }
  return res.json();
}

/** Delete a bill. */
export async function deleteBill(accessToken, billId) {
  const res = await fetch(`${API_BASE}/api/bills/${encodeURIComponent(billId)}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to delete bill");
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

// ---------------------------------------------------------------------------
// Saved schedules
// ---------------------------------------------------------------------------

/** Auto-generate today's optimized schedule (or return existing). Pass force: true to re-generate. */
export async function generateTodaySchedule(accessToken, { force = false } = {}) {
  const res = await fetch(`${API_BASE}/api/schedules/generate`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ force }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const e = new Error(err.detail || "Failed to generate schedule");
    if (res.status === 401) e.isUnauthorized = true;
    throw e;
  }
  return res.json();
}

/** Get today's saved schedule (may return null). */
export async function getTodaySchedule(accessToken) {
  const res = await fetch(`${API_BASE}/api/schedules/today`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get today's schedule");
  }
  return res.json();
}

/** Get schedules awaiting user feedback (before today). */
export async function getPendingSchedules(accessToken) {
  const res = await fetch(`${API_BASE}/api/schedules/pending`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get pending schedules");
  }
  return res.json();
}

/** Submit feedback on whether the user followed a schedule. */
export async function submitScheduleFeedback(accessToken, scheduleId, followed) {
  const res = await fetch(`${API_BASE}/api/schedules/${encodeURIComponent(scheduleId)}/feedback`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify({ followed }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to submit feedback");
  }
  return res.json();
}

/** Get schedule history. */
export async function getScheduleHistory(accessToken, limit = 30) {
  const res = await fetch(`${API_BASE}/api/schedules/history?limit=${limit}`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get schedule history");
  }
  return res.json();
}

/** Get aggregate savings summary. */
export async function getSavingsSummary(accessToken) {
  const res = await fetch(`${API_BASE}/api/schedules/savings`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to get savings summary");
  }
  return res.json();
}

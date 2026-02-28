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

/** List devices for the current user. Requires accessToken. */
export async function getDevices(accessToken) {
  const res = await fetch(`${API_BASE}/api/devices`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to load devices");
  }
  return res.json();
}

/** Create a device. Requires accessToken. */
export async function createDevice(accessToken, data) {
  const res = await fetch(`${API_BASE}/api/devices`, {
    method: "POST",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create device");
  }
  return res.json();
}

/** Update a device. Requires accessToken. */
export async function updateDevice(accessToken, deviceId, data) {
  const res = await fetch(`${API_BASE}/api/devices/${encodeURIComponent(deviceId)}`, {
    method: "PUT",
    headers: authHeaders(accessToken),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to update device");
  }
  return res.json();
}

/** Delete a device. Requires accessToken. */
export async function deleteDevice(accessToken, deviceId) {
  const res = await fetch(`${API_BASE}/api/devices/${encodeURIComponent(deviceId)}`, {
    method: "DELETE",
    headers: authHeaders(accessToken),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to delete device");
  }
  return res.json();
}

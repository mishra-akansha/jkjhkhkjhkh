const API_URL = "https://6a6afe86e64fad7400e4835e-api-capstone.myanatomy.ai";

export function loginUser(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export function signupUser(params) {
  return request("/auth/signup", {
    method: "POST",
    body: params,
  });
}

export function googleAuthUser() {
  return request("/auth/google", { method: "POST" });
}

export function resetPasswordUser(email) {
  return request("/auth/reset-password", {
    method: "POST",
    body: { email },
  });
}

export async function fetchCurrentUser(token) {
  const response = await request("/auth/me", { token });
  return response.user;
}

async function request(path, { method = "GET", body, token } = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach the API. Make sure the backend and MongoDB are running.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "The request could not be completed.");
  }

  return data;
}

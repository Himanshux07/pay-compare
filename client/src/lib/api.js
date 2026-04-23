const API_BASE = (
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost" ? "/api" : "https://pay-compare.onrender.com/api")
).replace(/\/+$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const paymentApi = {
  list: () => request("/payment-methods"),
  compare: (methods) => request(`/compare?methods=${methods.join(",")}`),
  recommendation: (priorities) => {
    const query = new URLSearchParams(priorities).toString();
    return request(`/recommendation?${query}`);
  },
  stats: () => request("/stats"),
  detail: (id) => request(`/payment-methods/${id}`)
};

import {
  paymentMethods,
  getComparisonSnapshot,
  getAnalyticsData,
  updatePaymentMethod
} from "../data/paymentMethods";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
const useBackendInDev = import.meta.env.VITE_USE_BACKEND === "true";
const useLocalFallbackFirst = import.meta.env.DEV && !useBackendInDev;

let localStore = paymentMethods.map((method) => ({
  ...method,
  pros: [...method.pros],
  cons: [...method.cons],
  idealFor: [...method.idealFor],
  security: [...method.security]
}));

function syncLocalStoreFrom(methods) {
  localStore = methods.map((method) => ({
    ...method,
    pros: [...method.pros],
    cons: [...method.cons],
    idealFor: [...method.idealFor],
    security: [...method.security]
  }));
}

function readLocalMethod(id) {
  return localStore.find((method) => method.id === id);
}

function calculateWeightedScore(method, priorities = {}) {
  const feeWeight = priorities.lowFee ?? 1;
  const speedWeight = priorities.speed ?? 1;
  const securityWeight = priorities.security ?? 1;
  const availabilityWeight = priorities.availability ?? 1;
  const reliabilityWeight = priorities.reliability ?? 1;

  const feeScore = 100 - Math.min(100, method.avgFee * 40);
  const normalizedScore =
    feeScore * feeWeight +
    method.speedScore * speedWeight +
    method.securityScore * securityWeight +
    method.availabilityScore * availabilityWeight +
    method.reliabilityScore * reliabilityWeight;

  const weightTotal = feeWeight + speedWeight + securityWeight + availabilityWeight + reliabilityWeight;
  return Math.round(normalizedScore / weightTotal);
}

function localRecommendation(priorities = {}) {
  const ranked = localStore
    .map((method) => ({
      ...method,
      score: calculateWeightedScore(method, priorities)
    }))
    .sort((left, right) => right.score - left.score);

  return {
    bestMatch: ranked[0],
    ranked
  };
}

function localStats() {
  return {
    paymentMethods: getComparisonSnapshot(),
    analytics: getAnalyticsData(),
    featured: localRecommendation().ranked.map((method) => ({
      id: method.id,
      name: method.name,
      feeLabel: method.feeLabel,
      score: method.score
    }))
  };
}

async function request(path, options = {}) {
  if (useLocalFallbackFirst) {
    if (path === "/payment-methods") {
      return { data: localStore };
    }

    if (path.startsWith("/payment-methods/")) {
      const id = path.split("/").pop();
      const method = readLocalMethod(id);
      if (!method) {
        throw new Error("Payment method not found");
      }

      return { data: method };
    }

    if (path.startsWith("/compare")) {
      const query = new URLSearchParams(path.split("?")[1] || "");
      const selected = String(query.get("methods") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const data = selected.length ? localStore.filter((method) => selected.includes(method.id)) : localStore;
      return { data, selected };
    }

    if (path.startsWith("/recommendation")) {
      const query = new URLSearchParams(path.split("?")[1] || "");
      const priorities = {
        lowFee: Number(query.get("lowFee") ?? 1),
        speed: Number(query.get("speed") ?? 1),
        security: Number(query.get("security") ?? 1),
        availability: Number(query.get("availability") ?? 1),
        reliability: Number(query.get("reliability") ?? 1)
      };

      return { data: localRecommendation(priorities), priorities };
    }

    if (path === "/stats") {
      return { data: localStats() };
    }

    if (path.startsWith("/admin")) {
      throw new Error("Admin actions require the backend API and a valid admin key.");
    }
  }

  try {
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
  } catch (_error) {
    if (path === "/payment-methods") {
      return { data: localStore };
    }

    if (path.startsWith("/payment-methods/")) {
      const id = path.split("/").pop();
      const method = readLocalMethod(id);
      if (!method) {
        throw new Error("Payment method not found");
      }

      return { data: method };
    }

    if (path.startsWith("/compare")) {
      const query = new URLSearchParams(path.split("?")[1] || "");
      const selected = String(query.get("methods") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const data = selected.length ? localStore.filter((method) => selected.includes(method.id)) : localStore;
      return { data, selected };
    }

    if (path.startsWith("/recommendation")) {
      const query = new URLSearchParams(path.split("?")[1] || "");
      const priorities = {
        lowFee: Number(query.get("lowFee") ?? 1),
        speed: Number(query.get("speed") ?? 1),
        security: Number(query.get("security") ?? 1),
        availability: Number(query.get("availability") ?? 1),
        reliability: Number(query.get("reliability") ?? 1)
      };

      return { data: localRecommendation(priorities), priorities };
    }

    if (path === "/stats") {
      return { data: localStats() };
    }

    if (path.startsWith("/admin")) {
      throw new Error("Admin actions require the backend API and a valid admin key.");
    }

    throw new Error("Unable to reach the API. Check whether the backend is running.");
  }
}

export const paymentApi = {
  list: () => request("/payment-methods"),
  compare: (methods) => request(`/compare?methods=${methods.join(",")}`),
  recommendation: (priorities) => {
    const query = new URLSearchParams(priorities).toString();
    return request(`/recommendation?${query}`);
  },
  stats: () => request("/stats"),
  detail: (id) => request(`/payment-methods/${id}`),
  verifyAdmin: (adminKey) => request("/admin/verify", { headers: { "x-admin-key": adminKey } }),
  update: (id, payload, adminKey) =>
    request(`/admin/payment-methods/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "x-admin-key": adminKey }
    })
};

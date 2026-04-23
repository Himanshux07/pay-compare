import express from "express";
import cors from "cors";
import {
  getAnalyticsData,
  getComparisonSnapshot,
  getPaymentMethodById,
  paymentMethods,
  recommendPaymentMethod
} from "./data/paymentMethods.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", name: "PayCompare API", timestamp: new Date().toISOString() });
});

app.get("/api/payment-methods", (_request, response) => {
  response.json({ data: paymentMethods });
});

app.get("/api/payment-methods/:id", (request, response) => {
  const method = getPaymentMethodById(request.params.id);
  if (!method) {
    return response.status(404).json({ message: "Payment method not found" });
  }

  return response.json({ data: method });
});

app.get("/api/compare", (request, response) => {
  const selected = String(request.query.methods || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const compareData = selected.length
    ? paymentMethods.filter((method) => selected.includes(method.id))
    : paymentMethods;

  response.json({ data: compareData, selected });
});

app.get("/api/recommendation", (request, response) => {
  const priorities = {
    lowFee: Number(request.query.lowFee ?? 1),
    speed: Number(request.query.speed ?? 1),
    security: Number(request.query.security ?? 1),
    availability: Number(request.query.availability ?? 1),
    reliability: Number(request.query.reliability ?? 1)
  };

  response.json({ data: recommendPaymentMethod(priorities), priorities });
});

app.get("/api/stats", (_request, response) => {
  response.json({
    data: {
      paymentMethods: getComparisonSnapshot(),
      analytics: getAnalyticsData(),
      featured: paymentMethods.map((method) => ({
        id: method.id,
        name: method.name,
        feeLabel: method.feeLabel,
        score: recommendPaymentMethod().ranked.find((item) => item.id === method.id)?.score ?? 0
      }))
    }
  });
});

app.get("/api", (_request, response) => {
  response.json({
    name: "PayCompare API",
    routes: [
      "/api/health",
      "/api/payment-methods",
      "/api/payment-methods/:id",
      "/api/compare?methods=upi,credit-card",
      "/api/recommendation",
      "/api/stats"
    ]
  });
});

app.listen(port, () => {
  console.log(`PayCompare API listening on http://localhost:${port}`);
});

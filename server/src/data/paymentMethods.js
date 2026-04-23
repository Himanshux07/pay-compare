export const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    shortName: "UPI",
    tag: "Instant, low-cost, always-on transfers",
    feeLabel: "Usually free or near-zero",
    avgFee: 0.1,
    speedScore: 98,
    availabilityScore: 99,
    securityScore: 84,
    reliabilityScore: 96,
    popularity: 92,
    merchantAcceptance: 96,
    successRate: 97,
    color: "from-cyan-400 to-blue-500",
    pros: [
      "No or minimal transaction charges",
      "Instant settlement for most merchants",
      "Works 24/7 with strong bank support"
    ],
    cons: [
      "Requires bank-linked mobile setup",
      "Occasional failure during bank downtime"
    ],
    idealFor: ["Daily e-commerce purchases", "Peer-to-merchant payments", "Fast checkout"],
    security: ["UPI PIN authentication", "Bank-level authorization", "Real-time alerts"]
  },
  {
    id: "net-banking",
    name: "Net Banking",
    shortName: "Net Banking",
    tag: "Trusted for high-value payments and direct bank access",
    feeLabel: "Low or nil, bank dependent",
    avgFee: 0.3,
    speedScore: 70,
    availabilityScore: 88,
    securityScore: 90,
    reliabilityScore: 88,
    popularity: 68,
    merchantAcceptance: 84,
    successRate: 89,
    color: "from-emerald-400 to-teal-600",
    pros: [
      "Strong authentication layers",
      "Good for larger checkout amounts",
      "Direct bank settlement"
    ],
    cons: [
      "Slower than UPI or cards",
      "Bank maintenance windows affect availability"
    ],
    idealFor: ["Higher-value orders", "Users preferring direct bank access"],
    security: ["OTP/2FA", "Bank login protection", "Transaction confirmations"]
  },
  {
    id: "credit-card",
    name: "Credit Card",
    shortName: "Credit Card",
    tag: "Rewards-rich, widely accepted, but may add charges",
    feeLabel: "0.5% to 2% in some cases",
    avgFee: 1.2,
    speedScore: 85,
    availabilityScore: 95,
    securityScore: 92,
    reliabilityScore: 93,
    popularity: 86,
    merchantAcceptance: 98,
    successRate: 94,
    color: "from-violet-400 to-fuchsia-600",
    pros: [
      "Excellent merchant acceptance",
      "Rewards, cashback, and EMI options",
      "Chargeback support for disputes"
    ],
    cons: [
      "Can attract convenience fees",
      "Risk of over-spending if unmanaged"
    ],
    idealFor: ["Premium e-commerce carts", "EMI purchases", "Travel and lifestyle shopping"],
    security: ["3D Secure", "CVV/OTP validation", "Fraud monitoring"]
  },
  {
    id: "debit-card",
    name: "Debit Card",
    shortName: "Debit Card",
    tag: "Simple direct-bank payment with broad support",
    feeLabel: "Usually free or low fee",
    avgFee: 0.4,
    speedScore: 82,
    availabilityScore: 90,
    securityScore: 86,
    reliabilityScore: 90,
    popularity: 76,
    merchantAcceptance: 93,
    successRate: 92,
    color: "from-amber-400 to-orange-500",
    pros: [
      "Direct bank deduction keeps spending controlled",
      "Commonly accepted across merchants",
      "Lower cost than credit card usage in many cases"
    ],
    cons: [
      "Limited rewards compared to credit cards",
      "Some banks impose transaction limits"
    ],
    idealFor: ["Budget-conscious shoppers", "Routine online purchases"],
    security: ["OTP-based checkout", "Card tokenization", "Transaction limits"]
  },
  {
    id: "wallets",
    name: "Wallets",
    shortName: "Wallets",
    tag: "Fast checkout and offers, but merchant reach varies",
    feeLabel: "Often free for users, merchant fees may apply",
    avgFee: 0.7,
    speedScore: 90,
    availabilityScore: 84,
    securityScore: 80,
    reliabilityScore: 86,
    popularity: 70,
    merchantAcceptance: 78,
    successRate: 88,
    color: "from-rose-400 to-pink-600",
    pros: [
      "Very quick checkout flow",
      "Promotions and cashback offers",
      "Useful for repeat purchases"
    ],
    cons: [
      "Merchant acceptance is not universal",
      "Wallet balance management adds friction"
    ],
    idealFor: ["Offer-driven shopping", "Fast mobile checkout"],
    security: ["PIN/biometric login", "Tokenized payments", "Wallet alerts"]
  }
];

export function getPaymentMethodById(id) {
  return paymentMethods.find((method) => method.id === id);
}

export function calculateWeightedScore(method, priorities = {}) {
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

export function getComparisonSnapshot() {
  return paymentMethods.map((method) => ({
    id: method.id,
    name: method.name,
    feeLabel: method.feeLabel,
    avgFee: method.avgFee,
    speedScore: method.speedScore,
    availabilityScore: method.availabilityScore,
    securityScore: method.securityScore,
    reliabilityScore: method.reliabilityScore,
    popularity: method.popularity,
    merchantAcceptance: method.merchantAcceptance,
    successRate: method.successRate
  }));
}

export function recommendPaymentMethod(priorities = {}) {
  const ranked = paymentMethods
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

export function getAnalyticsData() {
  return paymentMethods.map((method) => ({
    name: method.shortName,
    fee: Number((method.avgFee * 100).toFixed(0)),
    speed: method.speedScore,
    security: method.securityScore,
    availability: method.availabilityScore,
    reliability: method.reliabilityScore,
    popularity: method.popularity
  }));
}

export function updatePaymentMethod(id, updates) {
  const index = paymentMethods.findIndex((method) => method.id === id);
  if (index === -1) {
    return null;
  }

  paymentMethods[index] = {
    ...paymentMethods[index],
    ...updates,
    id: paymentMethods[index].id,
    name: updates.name ?? paymentMethods[index].name
  };

  return paymentMethods[index];
}

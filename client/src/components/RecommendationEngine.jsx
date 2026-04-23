import { useState } from "react";
import { BrainCircuit, CheckCircle2, Lightbulb, RefreshCcw, SlidersHorizontal } from "lucide-react";
import { paymentApi } from "../lib/api";
import PaymentCard from "./PaymentCard";

const initialPriorities = {
  lowFee: 4,
  speed: 4,
  security: 4,
  availability: 4,
  reliability: 4
};

const labels = {
  lowFee: "Low fee",
  speed: "Fast payment",
  security: "Secure",
  availability: "Always available",
  reliability: "Reliable"
};

export default function RecommendationEngine({ methods = [] }) {
  const [priorities, setPriorities] = useState(initialPriorities);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runRecommendation() {
    setLoading(true);
    try {
      const response = await paymentApi.recommendation(priorities);
      setResult(response.data);
    } finally {
      setLoading(false);
    }
  }

  function updatePriority(key, value) {
    setPriorities((current) => ({ ...current, [key]: Number(value) }));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="soft-card rounded-[1.75rem] p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Preference tuning</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">Set your priorities</h3>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {Object.entries(labels).map(([key, label]) => (
            <label key={key} className="block">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">{label}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-200">{priorities[key]}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={priorities[key]}
                onChange={(event) => updatePriority(key, event.target.value)}
                className="w-full accent-cyan-400"
              />
            </label>
          ))}
        </div>

        <button type="button" onClick={runRecommendation} className="neon-button mt-6 w-full" disabled={loading}>
          {loading ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
          {loading ? "Analyzing..." : "Get best payment method"}
        </button>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <p className="font-semibold text-white">How it works</p>
          <p className="mt-2 leading-7">
            The engine combines fee, speed, security, availability, and reliability into a weighted score. The result is more explainable than a simple sorted list.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {result?.bestMatch ? (
          <div className="soft-card rounded-[1.75rem] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recommended choice</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">{result.bestMatch.name}</h3>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Weighted score</p>
                <p className="mt-2 font-display text-3xl font-bold text-cyan-200">{result.bestMatch.score}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Fee posture</p>
                <p className="mt-2 font-display text-xl font-bold text-white">{result.bestMatch.feeLabel}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Success rate</p>
                <p className="mt-2 font-display text-3xl font-bold text-white">{result.bestMatch.successRate}%</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-7 text-slate-200">
              <Lightbulb className="mb-2 h-4 w-4 text-cyan-200" />
              Best for {result.bestMatch.idealFor.join(", ")}.
            </div>
          </div>
        ) : (
          <div className="soft-card rounded-[1.75rem] p-8 text-center text-slate-300">
            <BrainCircuit className="mx-auto h-10 w-10 text-cyan-200" />
            <p className="mt-4 font-semibold text-white">No recommendation yet</p>
            <p className="mt-2 text-sm leading-7">Run the engine to see the top payment method and the ranked list.</p>
          </div>
        )}

        <div className="soft-card rounded-[1.75rem] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ranked list</p>
          <div className="mt-4 grid gap-4">
            {(result?.ranked?.length ? result.ranked : methods).map((method, index) => (
              <div key={method.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-semibold text-white">{index + 1}. {method.name}</p>
                  <p className="text-sm text-slate-400">{method.tag}</p>
                </div>
                <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-bold text-cyan-200">
                  {method.score ?? "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {methods.length ? <PaymentCard method={methods[0]} selectable={false} /> : null}
      </div>
    </div>
  );
}

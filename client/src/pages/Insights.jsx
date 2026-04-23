import { useEffect, useMemo, useState } from "react";
import { Clock3, ShieldCheck, Sparkles, TrendingDown, TriangleAlert } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { paymentApi } from "../lib/api";

function pickBest(methods, scorer) {
  if (!methods.length) {
    return null;
  }

  return [...methods].sort((left, right) => scorer(right) - scorer(left))[0];
}

export default function Insights() {
  const [stats, setStats] = useState({ paymentMethods: [], featured: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const response = await paymentApi.stats();
      const data = response?.data || { paymentMethods: [], featured: [] };
      setStats({
        paymentMethods: Array.isArray(data.paymentMethods) ? data.paymentMethods : [],
        featured: Array.isArray(data.featured) ? data.featured : []
      });
    } catch (loadError) {
      setError(loadError.message || "Unable to load insights.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const methods = stats.paymentMethods || [];

  const insights = useMemo(() => {
    const cheapest = pickBest(methods, (method) => -method.avgFee);
    const fastest = pickBest(methods, (method) => method.speedScore);
    const safest = pickBest(methods, (method) => method.securityScore);
    const mostReliable = pickBest(methods, (method) => method.successRate);

    return { cheapest, fastest, safest, mostReliable };
  }, [methods]);

  const scenarios = useMemo(
    () => [
      {
        title: "Budget-first checkout",
        description: "Choose methods with minimal transaction fee and good success rate.",
        suggestion: insights.cheapest ? `${insights.cheapest.name} (${insights.cheapest.avgFee}% avg fee)` : "-"
      },
      {
        title: "Fast mobile flow",
        description: "Prioritize speed + reliability for low-friction checkout.",
        suggestion: insights.fastest ? `${insights.fastest.name} (${insights.fastest.speedScore}/100 speed)` : "-"
      },
      {
        title: "Security-first purchase",
        description: "Use highest security score for high-ticket orders.",
        suggestion: insights.safest ? `${insights.safest.name} (${insights.safest.securityScore}/100 security)` : "-"
      }
    ],
    [insights]
  );

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Insights"
        title="Actionable payment insights"
        description="This section provides practical, decision-focused guidance based on your current payment dataset."
      />

      {loading ? <section className="soft-card rounded-[1.75rem] p-6 text-sm text-slate-300">Loading insights...</section> : null}

      {error ? (
        <section className="soft-card rounded-[1.75rem] border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-100">
          <p>{error}</p>
          <button
            type="button"
            onClick={load}
            className="mt-3 rounded-full border border-rose-200/40 bg-rose-100/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:bg-rose-100/20"
          >
            Retry
          </button>
        </section>
      ) : null}

      {!loading && !error ? (
        <>
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="soft-card rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cheapest option</p>
              <p className="mt-3 font-display text-3xl font-bold text-white">{insights.cheapest?.name || "-"}</p>
              <p className="mt-2 text-sm text-slate-300">{insights.cheapest ? `${insights.cheapest.avgFee}% avg fee` : "No data"}</p>
              <TrendingDown className="mt-4 h-5 w-5 text-cyan-200" />
            </div>

            <div className="soft-card rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Fastest option</p>
              <p className="mt-3 font-display text-3xl font-bold text-white">{insights.fastest?.name || "-"}</p>
              <p className="mt-2 text-sm text-slate-300">{insights.fastest ? `${insights.fastest.speedScore}/100 speed score` : "No data"}</p>
              <Clock3 className="mt-4 h-5 w-5 text-cyan-200" />
            </div>

            <div className="soft-card rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Safest option</p>
              <p className="mt-3 font-display text-3xl font-bold text-white">{insights.safest?.name || "-"}</p>
              <p className="mt-2 text-sm text-slate-300">{insights.safest ? `${insights.safest.securityScore}/100 security score` : "No data"}</p>
              <ShieldCheck className="mt-4 h-5 w-5 text-cyan-200" />
            </div>

            <div className="soft-card rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Most reliable</p>
              <p className="mt-3 font-display text-3xl font-bold text-white">{insights.mostReliable?.name || "-"}</p>
              <p className="mt-2 text-sm text-slate-300">{insights.mostReliable ? `${insights.mostReliable.successRate}% success rate` : "No data"}</p>
              <Sparkles className="mt-4 h-5 w-5 text-cyan-200" />
            </div>
          </section>

          <section className="soft-card rounded-[1.75rem] p-6">
            <h3 className="font-display text-2xl font-bold text-white">Scenario-based recommendations</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {scenarios.map((scenario) => (
                <article key={scenario.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{scenario.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{scenario.description}</p>
                  <p className="mt-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-200">
                    {scenario.suggestion}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="soft-card rounded-[1.75rem] p-6">
            <div className="flex items-center gap-2 text-amber-200">
              <TriangleAlert className="h-4 w-4" />
              <p className="text-sm font-semibold">Decision note</p>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              No single method is best for every case. Use Compare for side-by-side details and Recommendation for priority-based ranking.
            </p>
          </section>
        </>
      ) : null}
    </div>
  );
}

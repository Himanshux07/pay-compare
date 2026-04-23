import { useEffect, useState } from "react";
import { Activity, BarChart3, Layers3, PieChart, Radar } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import ChartsPanel from "../components/ChartsPanel";
import { paymentApi } from "../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ paymentMethods: [], analytics: [], featured: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStats() {
      setLoading(true);
      setError("");
      try {
        const response = await paymentApi.stats();
        if (!active) {
          return;
        }

        const safeData = response?.data || { paymentMethods: [], analytics: [], featured: [] };
        setStats({
          paymentMethods: Array.isArray(safeData.paymentMethods) ? safeData.paymentMethods : [],
          analytics: Array.isArray(safeData.analytics) ? safeData.analytics : [],
          featured: Array.isArray(safeData.featured) ? safeData.featured : []
        });
      } catch (loadError) {
        if (!active) {
          return;
        }
        setError(loadError.message || "Unable to load dashboard data.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      active = false;
    };
  }, []);

  const statCards = [
    { label: "Tracked modes", value: stats.paymentMethods.length || "5", caption: "Mock payment methods in the system", icon: Layers3 },
    { label: "Analytics views", value: "3", caption: "Bar, radar, and pie breakdowns", icon: BarChart3 },
    { label: "Decision score", value: "96", caption: "Weighted recommendation output", icon: Activity },
    { label: "Popularity lens", value: "Live", caption: "Visual market share overview", icon: PieChart }
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Analytics dashboard"
        title="Visualize payment method behavior"
        description="The dashboard turns the mock payment dataset into a chart-first product view, which gives the project a much stronger viva presentation than a plain table."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      {loading ? (
        <section className="soft-card rounded-[1.75rem] p-6 text-sm text-slate-300">Loading analytics dashboard...</section>
      ) : error ? (
        <section className="soft-card rounded-[1.75rem] border border-rose-400/30 bg-rose-500/10 p-6 text-sm text-rose-100">{error}</section>
      ) : (
        <ChartsPanel stats={stats.analytics} />
      )}

      <section className="soft-card rounded-[1.75rem] p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
            <Radar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Takeaway</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">Chart-driven analysis makes the project memorable</h3>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Students can explain the chart logic during a viva: fees show cost trade-offs, the radar chart exposes the broader quality balance, and the pie chart highlights where users are likely to concentrate their usage.
        </p>
      </section>
    </div>
  );
}

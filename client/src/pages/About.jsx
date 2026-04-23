import { useEffect, useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import { paymentApi } from "../lib/api";

const blocks = [
  {
    title: "Problem statement",
    content:
      "Online buyers often choose between payment methods without knowing the trade-offs. PayCompare makes the fees, speed, security, and acceptance differences visible in one place."
  },
  {
    title: "Core modules",
    content:
      "Landing page, compare tool, insights section, recommendation engine, and about/documentation flow. The backend exposes mock APIs for all data reads."
  },
  {
    title: "Unique ideas",
    content:
      "The project includes a scoring engine, scenario-based insights, dark/light mode, glassmorphism cards, and responsive compare tables so it feels closer to a product demo."
  },
  {
    title: "Future scope",
    content:
      "Connect live payment gateway data, persist updates with MongoDB, add authentication, and show merchant-specific availability and failure predictions."
  }
];

export default function About() {
  const [stats, setStats] = useState({ paymentMethods: [] });

  useEffect(() => {
    paymentApi.stats().then((response) => {
      setStats(response.data || { paymentMethods: [] });
    });
  }, []);

  const liveMetrics = useMemo(() => {
    const methods = stats.paymentMethods || [];
    if (!methods.length) {
      return [];
    }

    const cheapest = [...methods].sort((a, b) => a.avgFee - b.avgFee)[0];
    const fastest = [...methods].sort((a, b) => b.speedScore - a.speedScore)[0];
    const safest = [...methods].sort((a, b) => b.securityScore - a.securityScore)[0];
    const bestSuccess = [...methods].sort((a, b) => b.successRate - a.successRate)[0];

    return [
      { title: "Available payment methods", value: String(methods.length), caption: "Live methods currently in dataset" },
      { title: "Cheapest mode", value: cheapest?.name || "-", caption: cheapest?.feeLabel || "-" },
      { title: "Fastest mode", value: fastest?.name || "-", caption: `${fastest?.speedScore || 0}/100 speed score` },
      { title: "Safest mode", value: safest?.name || "-", caption: `${safest?.securityScore || 0}/100 security score` },
      { title: "Best success rate", value: bestSuccess?.name || "-", caption: `${bestSuccess?.successRate || 0}% reliability` }
    ];
  }, [stats]);

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="About PayCompare"
        title="Platform overview and product direction"
        description="This page summarizes the problem we solve, core modules, key differentiators, and future product roadmap."
      />

      <section className="grid gap-5 lg:grid-cols-2">
        {blocks.map((block) => (
          <div key={block.title} className="soft-card rounded-[1.75rem] p-6">
            <h3 className="font-display text-2xl font-bold text-white">{block.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{block.content}</p>
          </div>
        ))}
      </section>

      <section className="soft-card rounded-[1.75rem] p-6">
        <h3 className="font-display text-2xl font-bold text-white">Live project metrics</h3>
        <p className="mt-2 text-sm text-slate-300">These values are computed from the current payment dataset served by the backend API.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {liveMetrics.length ? (
            liveMetrics.map((metric) => (
              <div key={metric.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{metric.title}</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-300">{metric.caption}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400 md:col-span-2 xl:col-span-5">Loading live metrics...</p>
          )}
        </div>
      </section>

      <section className="soft-card rounded-[1.75rem] p-6">
        <h3 className="font-display text-2xl font-bold text-white">Product communication flow</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Define the payment decision problem and user impact.",
            "Explain the API-driven architecture and data model.",
            "Show compare, insights, and recommendation experiences.",
            "Align on roadmap and extensibility for scale."
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

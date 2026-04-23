import { useEffect, useState } from "react";
import { ArrowRight, Clock3, ShieldCheck, TrendingUp, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import PaymentCard from "../components/PaymentCard";
import { paymentApi } from "../lib/api";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    paymentApi.stats().then((response) => setFeatured(response.data.featured || []));
  }, []);

  const highlights = [
    { label: "Instant transfers", value: "UPI", caption: "Best for zero/low-fee speed", icon: Clock3 },
    { label: "Highest acceptance", value: "Cards", caption: "Widely accepted across merchants", icon: WalletCards },
    { label: "Secure checkout", value: "Net banking", caption: "Strong banking auth flows", icon: ShieldCheck },
    { label: "Decision support", value: "Charts", caption: "Visual analytics for viva demos", icon: TrendingUp }
  ];

  return (
    <div className="space-y-16">
      <Hero featuredCount={featured.length || 5} />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Why it stands out"
          title="Built like a fintech product, not a basic CRUD demo"
          description="The project combines a comparison engine, analytics charts, theme switching, and a recommendation flow to make the payment choice explainable and visually polished."
        />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="soft-card rounded-[1.75rem] p-6"
          >
            <h3 className="font-display text-2xl font-bold text-white">Feature stack</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "Side-by-side comparison table",
                "Cheapest, fastest, safest filters",
                "Radar, bar, and pie analytics",
                "Priority-based recommendation engine",
                "Mobile responsive glass UI",
                "Mock admin API for future extension"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/compare" className="neon-button">
                Launch Compare Tool
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/dashboard" className="ghost-button">
                Open Analytics
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-5"
          >
            <SectionHeading
              eyebrow="Featured insight"
              title="Recommendation engine picks the right mode based on priorities"
              description="Changing the weight of low fee, speed, and security changes the recommendation. That makes the viva discussion more interesting because the output is not static."
            />
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div className="grid gap-4">
                {(featured.length ? featured.slice(0, 3) : []).map((method) => (
                  <div key={method.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div>
                      <p className="font-semibold text-white">{method.name}</p>
                      <p className="text-sm text-slate-400">{method.feeLabel}</p>
                    </div>
                    <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-bold text-cyan-200">
                      {method.score}
                    </div>
                  </div>
                ))}
                {featured.length ? null : <p className="text-sm text-slate-400">Loading featured recommendations...</p>}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Sample mode"
          title="Detailed payment cards"
          description="Each method is shown as a decision card with pros, cons, security notes, and performance scores."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {featured.length
            ? featured.map((method) => {
                const data = {
                  ...method,
                  tag: method.name,
                  color: "from-cyan-400 to-blue-600",
                  pros: ["Top-ranked in current selection", "Ready for e-commerce comparison"],
                  cons: ["Scores are based on mock data"],
                  security: ["Mock API driven", "Responsive UI cards"]
                };
                return <PaymentCard key={method.id} method={data} selected={false} onToggle={() => {}} />;
              })
            : null}
        </div>
      </section>
    </div>
  );
}

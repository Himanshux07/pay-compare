import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero({ featuredCount = 5 }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-hero-gradient px-6 py-14 shadow-glow sm:px-8 lg:px-12 lg:py-20">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute left-12 bottom-6 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <p className="badge mb-5 w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            Fintech comparison platform
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Compare payment methods with clarity, speed, and confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            PayCompare turns e-payment selection into a decision system. Compare UPI, net banking, cards, and wallets on fees, speed, security, acceptance, and reliability.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/compare" className="neon-button">
              Open Compare Tool
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link to="/recommend" className="ghost-button">
              Try Recommendation Engine
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
            {[
              "Premium glassmorphism UI",
              "Scenario-based insights",
              "Mock API powered"
            ].map((item) => (
              <div key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <BadgeCheck className="h-4 w-4 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="soft-card rounded-[1.75rem] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Live comparison snapshot</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Payment modes</p>
                <p className="mt-2 font-display text-3xl font-bold text-white">{featuredCount}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Recommendation score</p>
                <p className="mt-2 font-display text-3xl font-bold text-cyan-300">96%</p>
              </div>
              <div className="col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Fastest option</p>
                    <p className="mt-1 font-display text-2xl font-bold text-white">UPI</p>
                  </div>
                  <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">Best for instant checkout, low fees, and 24/7 availability in most merchant flows.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

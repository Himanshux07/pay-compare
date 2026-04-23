import { BadgeCheck, ChevronRight, ShieldCheck, ThumbsDown, ThumbsUp } from "lucide-react";

export default function PaymentCard({ method, selected = false, onToggle, selectable = true }) {
  return (
    <article className={`soft-card rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 ${selected ? "ring-2 ring-cyan-400/40" : ""}`}>
      <div className={`rounded-[1.4rem] bg-gradient-to-r ${method.color} p-[1px]`}>
        <div className="rounded-[1.35rem] bg-slate-950/85 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{method.shortName}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">{method.name}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">{method.tag}</p>
            </div>
            {selectable && typeof onToggle === "function" ? (
              <button
                type="button"
                onClick={() => onToggle(method.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selected ? "bg-cyan-400/20 text-cyan-200" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
              >
                {selected ? "Selected" : "Select"}
              </button>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-200">{method.feeLabel}</span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-slate-200">{method.successRate}% success rate</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Speed", method.speedScore],
              ["Security", method.securityScore],
              ["Availability", method.availabilityScore],
              ["Reliability", method.reliabilityScore]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 font-display text-lg font-bold text-white">{value}/100</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <div className="flex items-center gap-2 text-emerald-200">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm font-semibold">Pros</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                {method.pros.map((item) => (
                  <li key={item} className="flex gap-2">
                    <BadgeCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4">
              <div className="flex items-center gap-2 text-rose-200">
                <ThumbsDown className="h-4 w-4" />
                <span className="text-sm font-semibold">Cons</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                {method.cons.map((item) => (
                  <li key={item} className="flex gap-2">
                    <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-cyan-200">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-semibold">Security features</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
              {method.security.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function StatCard({ label, value, caption, icon: Icon }) {
  return (
    <div className="soft-card rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-white">{value}</span>
          </div>
          <p className="mt-2 text-sm text-slate-300">{caption}</p>
        </div>
        {Icon ? (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

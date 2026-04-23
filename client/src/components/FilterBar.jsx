import { Filter, Search } from "lucide-react";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "best-value", label: "Best Value" },
  { id: "cheapest", label: "Cheapest" },
  { id: "fastest", label: "Fastest" },
  { id: "safest", label: "Safest" },
  { id: "most-reliable", label: "Reliable" }
];

export default function FilterBar({
  search,
  onSearchChange,
  filterBy,
  onFilterChange,
  minSuccessRate,
  onMinSuccessRateChange,
  requireAnytime,
  onRequireAnytimeChange,
  selectedCount,
  resultCount,
  totalCount,
  onReset
}) {
  return (
    <div className="soft-card rounded-[1.75rem] p-4 md:p-5">
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr] xl:items-center">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Search payment modes</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="input-shell pl-11"
              placeholder="Search by name, tag, fee, or feature"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Preset filters</label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onFilterChange(option.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filterBy === option.id ? "bg-cyan-400/20 text-cyan-200" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
              >
                <Filter className="mr-2 inline h-4 w-4" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Minimum success rate: {minSuccessRate}%
          </span>
          <input
            type="range"
            min="70"
            max="100"
            step="1"
            value={minSuccessRate}
            onChange={(event) => onMinSuccessRateChange(Number(event.target.value))}
            className="w-full accent-cyan-400"
          />
        </label>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-200">
            <span>Only high availability (24/7 ready)</span>
            <input
              type="checkbox"
              checked={requireAnytime}
              onChange={(event) => onRequireAnytimeChange(event.target.checked)}
              className="h-4 w-4 accent-cyan-400"
            />
          </label>
          <p className="mt-2 text-xs text-slate-400">Filters methods with availability score 90+.</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
        <p>Selected for side-by-side compare: <span className="font-semibold text-white">{selectedCount}</span></p>
        <p>Showing <span className="font-semibold text-white">{resultCount}</span> of <span className="font-semibold text-white">{totalCount}</span> payment methods.</p>
        <button type="button" onClick={onReset} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10">
          Reset filters
        </button>
      </div>
    </div>
  );
}

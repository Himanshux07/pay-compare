import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import FilterBar from "../components/FilterBar";
import PaymentCard from "../components/PaymentCard";
import ComparisonTable from "../components/ComparisonTable";
import { paymentApi } from "../lib/api";

function scoreForSort(method, sortBy) {
  const feeScore = 100 - Math.min(100, method.avgFee * 40);
  const globalScore = Math.round((feeScore * 0.3 + method.speedScore * 0.25 + method.securityScore * 0.2 + method.reliabilityScore * 0.15 + method.availabilityScore * 0.1));

  switch (sortBy) {
    case "cheapest":
      return -method.avgFee;
    case "fastest":
      return method.speedScore;
    case "safest":
      return method.securityScore;
    case "most-reliable":
      return method.reliabilityScore;
    case "best-value":
      return globalScore;
    default:
      return globalScore;
  }
}

function applyPresetFilter(items, preset) {
  switch (preset) {
    case "best-value":
      return [...items]
        .sort((left, right) => scoreForSort(right, "best-value") - scoreForSort(left, "best-value"))
        .slice(0, 3);
    case "cheapest":
      return items.filter((method) => method.avgFee <= 0.5);
    case "fastest":
      return items.filter((method) => method.speedScore >= 88);
    case "safest":
      return items.filter((method) => method.securityScore >= 88);
    case "most-reliable":
      return items.filter((method) => method.reliabilityScore >= 90);
    default:
      return items;
  }
}

export default function Compare() {
  const [methods, setMethods] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [minSuccessRate, setMinSuccessRate] = useState(85);
  const [requireAnytime, setRequireAnytime] = useState(false);

  useEffect(() => {
    paymentApi.list().then((response) => {
      setMethods(response.data);
      setSelected(response.data.slice(0, 3).map((method) => method.id));
    });
  }, []);

  const filteredMethods = useMemo(() => {
    const query = search.toLowerCase();
    const searched = methods
      .filter((method) => {
        if (!query) {
          return true;
        }

        return [method.name, method.tag, method.feeLabel, ...(method.pros || []), ...(method.cons || [])]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .filter((method) => method.successRate >= minSuccessRate)
      .filter((method) => (requireAnytime ? method.availabilityScore >= 90 : true));

    const presetApplied = applyPresetFilter(searched, filterBy);
    return [...presetApplied].sort((left, right) => scoreForSort(right, filterBy) - scoreForSort(left, filterBy));
  }, [methods, search, filterBy, minSuccessRate, requireAnytime]);

  const selectedMethods = useMemo(
    () => methods.filter((method) => selected.includes(method.id)),
    [methods, selected]
  );

  function toggleMethod(id) {
    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 4) {
        return [current[1], current[2], id].filter(Boolean);
      }

      return [...current, id];
    });
  }

  function resetFilters() {
    setSearch("");
    setFilterBy("all");
    setMinSuccessRate(85);
    setRequireAnytime(false);
  }

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Compare tool"
        title="Compare e-payment options side-by-side"
        description="Use the search bar, quick filters, and selection chips to inspect the differences between payment methods."
      />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
        minSuccessRate={minSuccessRate}
        onMinSuccessRateChange={setMinSuccessRate}
        requireAnytime={requireAnytime}
        onRequireAnytimeChange={setRequireAnytime}
        selectedCount={selected.length}
        resultCount={filteredMethods.length}
        totalCount={methods.length}
        onReset={resetFilters}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        {filteredMethods.length ? (
          filteredMethods.map((method) => (
            <PaymentCard key={method.id} method={method} selected={selected.includes(method.id)} onToggle={toggleMethod} />
          ))
        ) : (
          <div className="soft-card rounded-[1.75rem] p-6 text-sm text-slate-300 lg:col-span-2">
            No payment method matches this filter set. Try lowering the minimum success rate or reset filters.
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected view</p>
            <h3 className="font-display text-2xl font-bold text-white">Comparison matrix</h3>
          </div>
        </div>
        <ComparisonTable methods={selectedMethods} />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {selectedMethods.map((method) => (
          <div key={method.id} className="soft-card rounded-[1.75rem] p-5">
            <div className="flex items-center gap-2 text-cyan-200">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-semibold">Selected for compare</span>
            </div>
            <p className="mt-3 font-display text-2xl font-bold text-white">{method.name}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{method.tag}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

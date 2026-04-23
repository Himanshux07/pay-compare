import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RecommendationEngine from "../components/RecommendationEngine";
import { paymentApi } from "../lib/api";

export default function Recommend() {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    paymentApi.list().then((response) => setMethods(response.data));
  }, []);

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Recommendation page"
        title="Let the app suggest the best payment mode"
        description="Tune your priorities and the engine responds with a ranked list. This is the most innovative part of the mini project because it behaves like a tiny decision-support system."
      />
      <RecommendationEngine methods={methods} />
      <section className="soft-card rounded-[1.75rem] p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Unique feature</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">Transparent scoring</h3>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Rather than showing a single hard-coded answer, PayCompare exposes the weighting behind the recommendation so the user can understand why one method outranks the others.
        </p>
      </section>
    </div>
  );
}

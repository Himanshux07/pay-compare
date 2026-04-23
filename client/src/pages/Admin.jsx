import { useEffect, useMemo, useState } from "react";
import { DatabaseZap, LockKeyhole, Save, Settings2, ShieldAlert } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { paymentApi } from "../lib/api";

const emptyForm = {
  name: "",
  shortName: "",
  tag: "",
  feeLabel: "",
  avgFee: 0,
  speedScore: 0,
  availabilityScore: 0,
  securityScore: 0,
  reliabilityScore: 0,
  popularity: 0,
  merchantAcceptance: 0,
  successRate: 0,
  color: "from-cyan-400 to-blue-500",
  prosText: "",
  consText: "",
  securityText: "",
  idealForText: ""
};

function joinLines(items = []) {
  return items.join(", ");
}

function splitLines(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function Admin() {
  const [methods, setMethods] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    paymentApi.list().then((response) => {
      setMethods(response.data);
      const first = response.data[0];
      if (first) {
        setSelectedId(first.id);
      }
    });
  }, []);

  useEffect(() => {
    const current = methods.find((method) => method.id === selectedId);
    if (!current) {
      return;
    }

    setForm({
      name: current.name,
      shortName: current.shortName,
      tag: current.tag,
      feeLabel: current.feeLabel,
      avgFee: current.avgFee,
      speedScore: current.speedScore,
      availabilityScore: current.availabilityScore,
      securityScore: current.securityScore,
      reliabilityScore: current.reliabilityScore,
      popularity: current.popularity,
      merchantAcceptance: current.merchantAcceptance,
      successRate: current.successRate,
      color: current.color,
      prosText: joinLines(current.pros),
      consText: joinLines(current.cons),
      securityText: joinLines(current.security),
      idealForText: joinLines(current.idealFor)
    });
  }, [methods, selectedId]);

  const selectedMethod = useMemo(() => methods.find((method) => method.id === selectedId), [methods, selectedId]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function verifyAdmin(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setAuthLoading(true);

    try {
      await paymentApi.verifyAdmin(adminKeyInput);
      setAdminKey(adminKeyInput);
      setIsAuthorized(true);
      setMessage("Admin access verified.");
    } catch (authError) {
      setIsAuthorized(false);
      setAdminKey("");
      setError(authError.message || "Invalid admin key.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function saveMethod(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        name: form.name,
        shortName: form.shortName,
        tag: form.tag,
        feeLabel: form.feeLabel,
        avgFee: Number(form.avgFee),
        speedScore: Number(form.speedScore),
        availabilityScore: Number(form.availabilityScore),
        securityScore: Number(form.securityScore),
        reliabilityScore: Number(form.reliabilityScore),
        popularity: Number(form.popularity),
        merchantAcceptance: Number(form.merchantAcceptance),
        successRate: Number(form.successRate),
        color: form.color,
        pros: splitLines(form.prosText),
        cons: splitLines(form.consText),
        security: splitLines(form.securityText),
        idealFor: splitLines(form.idealForText)
      };

      const response = await paymentApi.update(selectedId, payload, adminKey);
      setMethods((current) => current.map((method) => (method.id === selectedId ? response.data : method)));
      setMessage(`${response.data.name} updated successfully.`);
    } catch (saveError) {
      setError(saveError.message || "Unable to update payment method.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Admin panel"
        title="Update the mock payment dataset"
        description="This panel is key-protected. Only authorized users can edit payment values, so normal users cannot tamper with comparison data."
      />

      <section className="soft-card rounded-[1.75rem] p-6">
        <form onSubmit={verifyAdmin} className="flex flex-col gap-4 md:flex-row md:items-end">
          <label className="md:min-w-[320px]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Admin key</span>
            <input
              type="password"
              value={adminKeyInput}
              onChange={(event) => setAdminKeyInput(event.target.value)}
              className="input-shell"
              placeholder="Enter admin key"
            />
          </label>
          <button type="submit" className="neon-button" disabled={authLoading || !adminKeyInput.trim()}>
            <LockKeyhole className="mr-2 h-4 w-4" />
            {authLoading ? "Verifying..." : "Unlock Admin"}
          </button>
          <p className={`text-sm ${isAuthorized ? "text-emerald-300" : "text-slate-400"}`}>
            {isAuthorized ? "Authorized session active" : "Locked: updates are disabled until verified"}
          </p>
        </form>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="soft-card rounded-[1.75rem] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
              <DatabaseZap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Stored methods</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">Select a method</h3>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {methods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedId(method.id)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${selectedId === method.id ? "border-cyan-400/40 bg-cyan-400/15 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}
              >
                <p className="font-semibold">{method.name}</p>
                <p className="mt-1 text-sm text-slate-400">{method.tag}</p>
              </button>
            ))}
          </div>

          {selectedMethod ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 text-cyan-200">
                <ShieldAlert className="h-4 w-4" />
                Current selection
              </div>
              <p className="mt-2 font-semibold text-white">{selectedMethod.name}</p>
              <p className="mt-1 leading-7">Editing this card changes the mock API response, which flows through comparison, analytics, and the recommendation engine.</p>
            </div>
          ) : null}
        </div>

        <form onSubmit={saveMethod} className="soft-card rounded-[1.75rem] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Edit data</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">Update fields and save</h3>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["name", "Name"],
              ["shortName", "Short name"],
              ["tag", "Tag line"],
              ["feeLabel", "Fee label"],
              ["color", "Color classes"],
              ["avgFee", "Average fee (%)"],
              ["speedScore", "Speed score"],
              ["availabilityScore", "Availability score"],
              ["securityScore", "Security score"],
              ["reliabilityScore", "Reliability score"],
              ["popularity", "Popularity"],
              ["merchantAcceptance", "Merchant acceptance"],
              ["successRate", "Success rate"]
            ].map(([field, label]) => (
              <label key={field} className={field === "tag" || field === "feeLabel" ? "md:col-span-2" : ""}>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
                <input
                  value={form[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  type={field === "avgFee" || field.includes("Score") || field === "popularity" || field === "merchantAcceptance" || field === "successRate" ? "number" : "text"}
                  className="input-shell"
                  step="0.1"
                  disabled={!isAuthorized}
                />
              </label>
            ))}

            {[
              ["prosText", "Pros (comma separated)", "md:col-span-2"],
              ["consText", "Cons (comma separated)", "md:col-span-2"],
              ["securityText", "Security features (comma separated)", "md:col-span-2"],
              ["idealForText", "Ideal for (comma separated)", "md:col-span-2"]
            ].map(([field, label, spanClass]) => (
              <label key={field} className={spanClass}>
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
                <textarea
                  value={form[field]}
                  onChange={(event) => updateField(field, event.target.value)}
                  rows="3"
                  className="input-shell resize-none"
                  disabled={!isAuthorized}
                />
              </label>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="submit" className="neon-button" disabled={saving || !selectedId || !isAuthorized}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save changes"}
            </button>
            {message ? <p className="text-sm font-medium text-emerald-300">{message}</p> : null}
            {error ? <p className="text-sm font-medium text-rose-300">{error}</p> : null}
          </div>
        </form>
      </section>
    </div>
  );
}
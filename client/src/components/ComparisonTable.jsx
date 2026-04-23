export default function ComparisonTable({ methods }) {
  const metrics = [
    { label: "Fee", key: "feeLabel" },
    { label: "Speed", key: "speedScore" },
    { label: "Availability", key: "availabilityScore" },
    { label: "Security", key: "securityScore" },
    { label: "Reliability", key: "reliabilityScore" },
    { label: "Merchant acceptance", key: "merchantAcceptance" },
    { label: "Success rate", key: "successRate" }
  ];

  if (!methods.length) {
    return (
      <div className="soft-card rounded-[1.75rem] p-6 text-sm text-slate-300">
        Select payment methods to compare them side-by-side.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="px-5 py-4">Metric</th>
              {methods.map((method) => (
                <th key={method.id} className="px-5 py-4">{method.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.key} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-4 font-semibold text-slate-200">{metric.label}</td>
                {methods.map((method) => (
                  <td key={method.id} className="px-5 py-4 text-slate-300">
                    {method[metric.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

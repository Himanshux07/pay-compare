export default function ComparisonTable({ methods }) {
  const scoreById = methods.reduce((map, method) => {
    const feeScore = 100 - Math.min(100, method.avgFee * 40);
    const weighted = Math.round(
      feeScore * 0.3 +
      method.speedScore * 0.2 +
      method.securityScore * 0.2 +
      method.reliabilityScore * 0.15 +
      method.availabilityScore * 0.1 +
      method.merchantAcceptance * 0.05
    );
    map[method.id] = weighted;
    return map;
  }, {});

  const metrics = [
    {
      label: "Overall score",
      key: "overallScore",
      value: (method) => `${scoreById[method.id]}/100`,
      winner: (items) => Math.max(...items.map((item) => scoreById[item.id]))
    },
    {
      label: "Transaction fee",
      key: "avgFee",
      value: (method) => `${method.avgFee}% (${method.feeLabel})`,
      winner: (items) => Math.min(...items.map((item) => item.avgFee))
    },
    {
      label: "Speed",
      key: "speedScore",
      value: (method) => `${method.speedScore}/100`,
      winner: (items) => Math.max(...items.map((item) => item.speedScore))
    },
    {
      label: "Availability",
      key: "availabilityScore",
      value: (method) => `${method.availabilityScore}/100`,
      winner: (items) => Math.max(...items.map((item) => item.availabilityScore))
    },
    {
      label: "Security",
      key: "securityScore",
      value: (method) => `${method.securityScore}/100`,
      winner: (items) => Math.max(...items.map((item) => item.securityScore))
    },
    {
      label: "Reliability",
      key: "reliabilityScore",
      value: (method) => `${method.reliabilityScore}/100`,
      winner: (items) => Math.max(...items.map((item) => item.reliabilityScore))
    },
    {
      label: "Merchant acceptance",
      key: "merchantAcceptance",
      value: (method) => `${method.merchantAcceptance}/100`,
      winner: (items) => Math.max(...items.map((item) => item.merchantAcceptance))
    },
    {
      label: "Success rate",
      key: "successRate",
      value: (method) => `${method.successRate}%`,
      winner: (items) => Math.max(...items.map((item) => item.successRate))
    }
  ];

  function isMetricWinner(metric, method, winnerValue) {
    if (metric.key === "overallScore") {
      return scoreById[method.id] === winnerValue;
    }

    if (metric.key === "avgFee") {
      return method.avgFee === winnerValue;
    }

    return method[metric.key] === winnerValue;
  }

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
            {metrics.map((metric) => {
              const winnerValue = metric.winner(methods);

              return (
                <tr key={metric.key} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-4 font-semibold text-slate-200">{metric.label}</td>
                  {methods.map((method) => {
                    const isWinner = isMetricWinner(metric, method, winnerValue);
                    return (
                      <td
                        key={method.id}
                        className={`px-5 py-4 text-slate-300 ${isWinner ? "bg-emerald-400/10 text-emerald-200" : ""}`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{metric.value(method)}</span>
                          {isWinner ? (
                            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em]">
                              Best
                            </span>
                          ) : null}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

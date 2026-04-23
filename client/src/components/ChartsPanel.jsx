import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { Bar, Pie, Radar } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, RadialLinearScale, ArcElement, Tooltip, Legend, Filler);

function chartTextColor(isDark) {
  return isDark ? "#e2e8f0" : "#0f172a";
}

export default function ChartsPanel({ stats }) {
  const { isDark } = useTheme();
  const safeStats = Array.isArray(stats) ? stats : [];
  const textColor = chartTextColor(isDark);
  const gridColor = isDark ? "rgba(148,163,184,0.18)" : "rgba(100,116,139,0.18)";

  if (!safeStats.length) {
    return (
      <section className="soft-card rounded-[1.75rem] p-6 text-sm text-slate-300">
        No analytics data available right now.
      </section>
    );
  }

  const barData = {
    labels: safeStats.map((item) => item.name),
    datasets: [
      {
        label: "Transaction fee (%)",
        data: safeStats.map((item) => item.fee),
        backgroundColor: ["rgba(34,211,238,0.7)", "rgba(56,189,248,0.7)", "rgba(129,140,248,0.7)", "rgba(251,191,36,0.7)", "rgba(244,114,182,0.7)"],
        borderRadius: 14
      }
    ]
  };

  const radarData = {
    labels: ["Speed", "Security", "Availability", "Reliability", "Popularity"],
    datasets: safeStats.map((item, index) => ({
      label: item.name,
      data: [item.speed, item.security, item.availability, item.reliability, item.popularity],
      borderColor: ["#22d3ee", "#38bdf8", "#818cf8", "#f472b6", "#f59e0b"][index],
      backgroundColor: ["rgba(34,211,238,0.12)", "rgba(56,189,248,0.12)", "rgba(129,140,248,0.12)", "rgba(244,114,182,0.12)", "rgba(245,158,11,0.12)"][index],
      pointBackgroundColor: textColor,
      borderWidth: 2
    }))
  };

  const pieData = {
    labels: safeStats.map((item) => item.name),
    datasets: [
      {
        data: safeStats.map((item) => item.popularity),
        backgroundColor: ["#22d3ee", "#38bdf8", "#818cf8", "#f472b6", "#f59e0b"],
        borderWidth: 0
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: "circle"
        }
      }
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="soft-card rounded-[1.75rem] p-5 xl:col-span-2">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Analytics</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">Fee and performance comparison</h3>
          </div>
        </div>
        <div className="h-[340px]">
          <Bar
            data={barData}
            options={{
              ...commonOptions,
              scales: {
                x: {
                  ticks: { color: textColor },
                  grid: { color: gridColor }
                },
                y: {
                  ticks: { color: textColor },
                  grid: { color: gridColor }
                }
              }
            }}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="soft-card rounded-[1.75rem] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Overall comparison</p>
          <div className="mt-3 h-[250px]">
            <Radar
              data={radarData}
              options={{
                ...commonOptions,
                scales: {
                  r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: { color: textColor },
                    ticks: { backdropColor: "transparent", color: textColor }
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="soft-card rounded-[1.75rem] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Popularity share</p>
          <div className="mt-3 h-[250px]">
            <Pie
              data={pieData}
              options={{
                ...commonOptions,
                plugins: {
                  ...commonOptions.plugins,
                  legend: {
                    position: "bottom",
                    labels: {
                      color: textColor,
                      usePointStyle: true
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

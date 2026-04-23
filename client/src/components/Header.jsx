import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, Layers3, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/compare", label: "Compare" },
  { to: "/dashboard", label: "Analytics" },
  { to: "/recommend", label: "Recommend" },
  { to: "/about", label: "About" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-3 text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-white">PayCompare</p>
            <p className="text-xs text-slate-400">E-payment comparison tool</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-2 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? "bg-cyan-400/15 text-cyan-200" : "text-slate-300 hover:bg-white/5 hover:text-white"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10 md:inline-flex">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-2 lg:hidden">
        <div className="flex flex-wrap gap-2 sm:px-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition ${isActive ? "bg-cyan-400/15 text-cyan-200" : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`
              }
            >
              <Layers3 className="h-3.5 w-3.5" />
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

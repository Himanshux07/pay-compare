import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 background-grid opacity-30" />
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 animate-slowSpin rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-28 h-80 w-80 animate-float rounded-full bg-fuchsia-400/10 blur-3xl" />
      <Header />
      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-slate-950/60 py-8 text-center text-sm text-slate-400 backdrop-blur-xl">
        <p>PayCompare - comparison-driven checkout intelligence for e-commerce mini projects.</p>
      </footer>
    </div>
  );
}

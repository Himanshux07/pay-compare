import React from "react";

export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      message: error?.message || "Unexpected error"
    };
  }

  componentDidCatch(error) {
    console.error("App crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4">
          <div className="soft-card w-full rounded-[1.75rem] p-8 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Something went wrong</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-white">The page crashed safely</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.assign("/")}
              className="neon-button mt-6"
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

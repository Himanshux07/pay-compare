import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Compare from "./pages/Compare";
import Insights from "./pages/Insights";
import Recommend from "./pages/Recommend";
import About from "./pages/About";
import AppErrorBoundary from "./components/AppErrorBoundary";

export default function App() {
  return (
    <ThemeProvider>
      <AppErrorBoundary>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </AppErrorBoundary>
    </ThemeProvider>
  );
}

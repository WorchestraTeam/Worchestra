import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import type { Page } from "./types/workflow";

import Dashboard from "./pages/Dashboard";
import Workflows from "./pages/Workflows";
import Jobs from "./pages/Jobs";
import Runs from "./pages/Runs";
import Settings from "./pages/Settings";

import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Dashboard");

  const pageContent = {
    Dashboard: <Dashboard />,
    Workflows: <Workflows />,
    Jobs: <Jobs />,
    Runs: <Runs />,
    Settings: <Settings />,
  };

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="main-content">
        <Header title={currentPage} />
        {pageContent[currentPage]}
      </main>
    </div>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StatsPage from "./components/Stats";
import HealthCheck from "./components/HealthCheck";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code/:code" element={<StatsPage />} />
          <Route path="/healthz" element={<HealthCheck />} />
        </Routes>
      </div>
    </Router>
  );
}

import React, { useState } from "react";
import "./App.css";
import FoodSearch from "./components/FoodSearch";
import ThemeToggle from "./components/ThemeToggle";
import FormsDemo from "./pages/FormsDemo";
import DataTable from "./pages/DataTable";
import DataApiView from "./pages/DataApiView";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1>React Mini App</h1>
          <div className="nav-links">
            <button
              className={`nav-btn ${currentPage === "home" ? "active" : ""}`}
              onClick={() => setCurrentPage("home")}
            >
              🍽️ Recherche Plats
            </button>
            <button
              className={`nav-btn ${currentPage === "forms" ? "active" : ""}`}
              onClick={() => setCurrentPage("forms")}
            >
              📋 Formulaires
            </button>
            <button
              className={`nav-btn ${currentPage === "data" ? "active" : ""}`}
              onClick={() => setCurrentPage("data")}
            >
              📊 Données
            </button>
            <button
              className={`nav-btn ${currentPage === "api" ? "active" : ""}`}
              onClick={() => setCurrentPage("api")}
            >
              🔗 API brute
            </button>
            <button
              className={`nav-btn ${currentPage === "apiRz" ? "active" : ""}`}
              onClick={() => setCurrentPage("apiRz")}
            >
              old desply rz
            </button>
          </div>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>

      <main>
        {currentPage === "home" && <FoodSearch />}
        {currentPage === "forms" && <FormsDemo />}
        {currentPage === "data" && <DataTable />}
        {currentPage === "api" && <DataApiView />}
        {currentPage === "apiRz" && (
          <div style={{ padding: 20 }}>
            <h2>Old DataApiView rz</h2>
            <p>Ancienne version de l'affichage des données brutes de l'API.</p>
          </div>
        )}
      </main>

      <footer
        style={{ marginTop: 24, textAlign: "center", color: "var(--muted)" }}
      >
        React Mini App - Recherche de plats & Formulaires
      </footer>
    </div>
  );
}

export default App;

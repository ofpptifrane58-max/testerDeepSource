import React, { useMemo, useState } from "react";
import foods from "../data/foods";
import "./FoodSearch.css";

export default function FoodSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(foods.map((f) => f.category));
    return ["All", ...Array.from(set)];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foods.filter((f) => {
      if (category !== "All" && f.category !== category) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  return (
    <div className="food-search">
      <h2>Recherche de plats</h2>

      <div className="controls">
        <input
          aria-label="Recherche"
          placeholder="Rechercher un plat..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="results">
        {results.length === 0 && <p className="no-results">Aucun résultat.</p>}
        {results.map((item) => (
          <article className="card food-card" key={item.id}>
            <div className="emoji" aria-hidden>
              {item.emoji}
            </div>
            <div className="meta">
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="desc">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
  
}

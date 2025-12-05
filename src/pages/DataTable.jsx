import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../styles/DataTable.css';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState({ key: 'id', dir: 'asc' });
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    let mounted = true;

    axios.get('/data.json')
      .then(res => {
        if (!mounted) return;
        setData(res.data || []);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err.message || 'Erreur de chargement');
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(item => (
      String(item.name).toLowerCase().includes(q) ||
      String(item.category).toLowerCase().includes(q) ||
      String(item.tags || []).join(' ').toLowerCase().includes(q)
    ));
  }, [data, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const { key, dir } = sortBy;
    arr.sort((a, b) => {
      const va = a[key];
      const vb = b[key];
      if (va === vb) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'string') return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      return dir === 'asc' ? va - vb : vb - va;
    });
    return arr;
  }, [filtered, sortBy]);

  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const paged = useMemo(() => sorted.slice((page - 1) * pageSize, page * pageSize), [sorted, page]);

  function toggleSort(key) {
    setSortBy(prev => {
      if (prev.key === key) return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      return { key, dir: 'asc' };
    });
  }

  return (
    <div className="data-table-root">
      <div className="table-header">
        <h2>Données (API locale)</h2>
        <div className="controls">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher..." />
        </div>
      </div>

      {loading && <p className="muted">Chargement...</p>}
      {error && <p className="error">Erreur: {error}</p>}

      {!loading && !error && (
        <>
          <div className="table-wrap">
            <table className="modern-table">
              <thead>
                <tr>
                  <th onClick={() => toggleSort('id')}>ID {sortBy.key === 'id' ? (sortBy.dir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th onClick={() => toggleSort('name')}>Nom {sortBy.key === 'name' ? (sortBy.dir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th onClick={() => toggleSort('category')}>Catégorie {sortBy.key === 'category' ? (sortBy.dir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th onClick={() => toggleSort('price')}>Prix {sortBy.key === 'price' ? (sortBy.dir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th onClick={() => toggleSort('rating')}>Note {sortBy.key === 'rating' ? (sortBy.dir === 'asc' ? '▲' : '▼') : ''}</th>
                  <th>Tags</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>€{row.price.toFixed(2)}</td>
                    <td>{row.rating}</td>
                    <td>{(row.tags || []).join(', ')}</td>
                    <td>{row.inStock ? '✔️' : '—'}</td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr><td colSpan={7} className="muted">Aucun résultat</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div>Résultats: {total}</div>
            <div className="pagination">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Préc</button>
              <span>Page {page} / {pages}</span>
              <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}>Suiv</button>
            </div>
          </div>
        </>
      )}

      <div style={{ marginTop: 12 }}>
        <small className="muted">Source: <a href="/data.json" target="_blank">/data.json</a></small>
      </div>
    </div>
  );
}

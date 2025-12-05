import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DataApiView() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    axios.get('/data.json')
      .then(res => { if (mounted) setPayload(res.data); })
      .catch(err => { if (mounted) setError(err.message || 'Erreur'); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <h2>🔗 API: réponse brute (JSON)</h2>
      {loading && <p>⏳ Chargement...</p>}
      {error && <p style={{ color: 'crimson' }}>❌ Erreur: {error}</p>}
      {payload && (
        <pre style={{ background: 'var(--card)', padding: 12, borderRadius: 8, overflowX: 'auto' }}>
          {JSON.stringify(payload, null, 2)}
        </pre>
      )}
    </div>
  );
}

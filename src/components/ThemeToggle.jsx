import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.removeItem('theme');
    }
  }, [theme]);

  const toggle = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Basculer thème">
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

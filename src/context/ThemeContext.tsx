import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
interface ThemeContextType { theme: Theme; toggleTheme: () => void; }

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} });

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (_) {}
  return 'light'; // Default to light on first visit
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Smooth transition class during switch
    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const t = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 500);
    return () => clearTimeout(t);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

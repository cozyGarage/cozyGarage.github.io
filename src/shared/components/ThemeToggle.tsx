import React from 'react';
import { useTheme } from '../utils/theme';
import { trackThemeChange } from '../utils/analytics';
import './ThemeToggle.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    toggleTheme();
    trackThemeChange(newTheme);
  };

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <span className="theme-toggle-icon">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  );
};
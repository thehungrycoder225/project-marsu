import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

// College-specific color themes
const collegeThemes = {
  cics: {
    primary: { r: 59, g: 130, b: 246 }, // Blue
    secondary: { r: 147, g: 51, b: 234 }, // Purple
    accent: { r: 6, g: 182, b: 212 }, // Cyan
    gradient: 'from-blue-600 via-purple-600 to-cyan-500',
  },
  ceng: {
    primary: { r: 239, g: 68, b: 68 }, // Red
    secondary: { r: 245, g: 101, b: 101 }, // Light Red
    accent: { r: 251, g: 146, b: 60 }, // Orange
    gradient: 'from-red-500 via-red-400 to-orange-400',
  },
  cass: {
    primary: { r: 34, g: 197, b: 94 }, // Green
    secondary: { r: 52, g: 211, b: 153 }, // Emerald
    accent: { r: 16, g: 185, b: 129 }, // Teal
    gradient: 'from-green-500 via-emerald-500 to-teal-400',
  },
  cit: {
    primary: { r: 251, g: 191, b: 36 }, // Yellow
    secondary: { r: 245, g: 158, b: 11 }, // Amber
    accent: { r: 249, g: 115, b: 22 }, // Orange
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
  },
  cba: {
    primary: { r: 168, g: 85, b: 247 }, // Purple
    secondary: { r: 196, g: 181, b: 253 }, // Light Purple
    accent: { r: 139, g: 92, b: 246 }, // Violet
    gradient: 'from-purple-600 via-purple-400 to-violet-500',
  },
  coed: {
    primary: { r: 244, g: 63, b: 94 }, // Rose
    secondary: { r: 251, g: 113, b: 133 }, // Pink
    accent: { r: 236, g: 72, b: 153 }, // Fuchsia
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
  },
  default: {
    primary: { r: 99, g: 102, b: 241 }, // Indigo
    secondary: { r: 129, g: 140, b: 248 }, // Light Indigo
    accent: { r: 67, g: 56, b: 202 }, // Dark Indigo
    gradient: 'from-indigo-600 via-indigo-400 to-indigo-500',
  },
};

export const ThemeProvider = ({ children, collegeKey = 'default' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(collegeThemes.default);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Update theme based on college
    const theme = collegeThemes[collegeKey] || collegeThemes.default;
    setCurrentTheme(theme);
    
    // Set CSS custom properties for dynamic theming
    const root = document.documentElement;
    root.style.setProperty('--theme-primary-r', theme.primary.r);
    root.style.setProperty('--theme-primary-g', theme.primary.g);
    root.style.setProperty('--theme-primary-b', theme.primary.b);
    root.style.setProperty('--theme-secondary-r', theme.secondary.r);
    root.style.setProperty('--theme-secondary-g', theme.secondary.g);
    root.style.setProperty('--theme-secondary-b', theme.secondary.b);
    root.style.setProperty('--theme-accent-r', theme.accent.r);
    root.style.setProperty('--theme-accent-g', theme.accent.g);
    root.style.setProperty('--theme-accent-b', theme.accent.b);
  }, [collegeKey]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const getRgbaColor = (color, alpha = 1) => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  };

  const getGlassStyle = (opacity = 0.1) => ({
    background: isDarkMode 
      ? getRgbaColor({ r: 255, g: 255, b: 255 }, opacity)
      : getRgbaColor({ r: 255, g: 255, b: 255 }, opacity + 0.1),
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${getRgbaColor({ r: 255, g: 255, b: 255 }, 0.2)}`,
    boxShadow: isDarkMode
      ? '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
      : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  });

  const getNeumorphicStyle = (inset = false) => ({
    background: isDarkMode ? '#2d3748' : '#f7fafc',
    boxShadow: inset
      ? isDarkMode
        ? 'inset 8px 8px 16px #1a202c, inset -8px -8px 16px #4a5568'
        : 'inset 8px 8px 16px #e2e8f0, inset -8px -8px 16px #ffffff'
      : isDarkMode
        ? '8px 8px 16px #1a202c, -8px -8px 16px #4a5568'
        : '8px 8px 16px #e2e8f0, -8px -8px 16px #ffffff',
  });

  const value = {
    isDarkMode,
    toggleDarkMode,
    currentTheme,
    collegeKey,
    getRgbaColor,
    getGlassStyle,
    getNeumorphicStyle,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  collegeKey: PropTypes.string,
};

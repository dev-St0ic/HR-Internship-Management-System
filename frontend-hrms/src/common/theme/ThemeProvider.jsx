import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const THEME_STORAGE_KEY = 'hrms.theme.preference';
const HR_STAFF_SETTINGS_KEY = 'hrms.hrStaff.settings.v1';
const VALID_THEME_PREFERENCES = new Set(['light', 'dark', 'system']);

function getSystemThemePreference() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readLegacyHrStaffThemePreference() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(HR_STAFF_SETTINGS_KEY);

    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);
    const appearance = parsedValue?.settings?.workspace?.appearance;

    return VALID_THEME_PREFERENCES.has(appearance) ? appearance : null;
  } catch {
    return null;
  }
}

function getInitialThemePreference() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (VALID_THEME_PREFERENCES.has(storedPreference)) {
    return storedPreference;
  }

  return readLegacyHrStaffThemePreference() ?? 'light';
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themePreference, setThemePreference] = useState(getInitialThemePreference);
  const [systemTheme, setSystemTheme] = useState(getSystemThemePreference);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const resolvedTheme = themePreference === 'system' ? systemTheme : themePreference;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themePreference = themePreference;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, themePreference]);

  const value = useMemo(
    () => ({
      isDark: resolvedTheme === 'dark',
      resolvedTheme,
      setThemePreference,
      themePreference,
    }),
    [resolvedTheme, themePreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}
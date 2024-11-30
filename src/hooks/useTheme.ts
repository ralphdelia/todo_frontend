import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

const DEFAULT_THEME = "light";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // only executes on mount
    if (!theme || theme === null) {
      const themePreference = localStorage.getItem("theme");

      // use preference if found
      if (themePreference === "light" || themePreference === "dark") {
        document.documentElement.dataset.theme = themePreference;
        setTheme(themePreference);
      } else {
        // select default if no preference found
        document.documentElement.dataset.theme = DEFAULT_THEME;
        setTheme(DEFAULT_THEME);
      }
      return;
    }

    // executes on theme toggle
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;

// hooks/useA11y.js
import { useEffect, useState } from "react";
import { getTheme, setTheme, applyTheme } from "@/theme/theme";

const STORAGE_KEY = "govguide-a11y";

export function useA11y() {
  // language: "en" or "fr"
  const [lang, setLang] = useState("en");

  // theme state we expose to the UI: "light" | "dark"
  // (internally mapped to "light-glow" / "dark-glow" CSS classes)
  const [theme, setThemeMode] = useState("dark");

  // high contrast toggle
  const [contrast, setContrast] = useState(false);

  // font scale (1 = normal)
  const [fontScale, setFontScale] = useState(1);

  // Load saved preferences on first render
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

      if (saved.lang === "en" || saved.lang === "fr") {
        setLang(saved.lang);
      }

      // Map stored theme classes or simple strings
      const rawTheme = saved.theme || getTheme(); // e.g. "dark-glow" / "light-glow"
      const normalizedTheme = rawTheme.includes("light") ? "light" : "dark";
      setThemeMode(normalizedTheme);

      // Ensure body has the correct theme class
      applyTheme(rawTheme);

      if (typeof saved.contrast === "boolean") {
        setContrast(saved.contrast);
      }

      if (typeof saved.fontScale === "number") {
        setFontScale(saved.fontScale);
      }
    } catch (e) {
      // if anything goes wrong, just fall back to defaults
      const rawTheme = getTheme();
      const normalizedTheme = rawTheme.includes("light") ? "light" : "dark";
      setThemeMode(normalizedTheme);
      applyTheme(rawTheme);
    }
  }, []);

  // Apply accessibility settings + persist them whenever they change
  useEffect(() => {
    if (typeof document === "undefined") return;

    const body = document.body;

    // High-contrast class
    body.classList.toggle("high-contrast", contrast);

    // Font scaling using a CSS variable (your CSS can use var(--font-scale))
    body.style.setProperty("--font-scale", String(fontScale));

    // Persist in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lang, theme, contrast, fontScale })
      );
    }
  }, [lang, theme, contrast, fontScale]);

  // --- Actions / handlers ---

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "fr" : "en"));
  };

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === "light" ? "dark" : "light";

      // Map to glow theme classes used in /theme/theme.js
      const nextClass = next === "light" ? "light-glow" : "dark-glow";

      // Save & apply via theme helpers
      setTheme(nextClass);
      applyTheme(nextClass);

      return next;
    });
  };

  const toggleContrast = () => {
    setContrast((c) => !c);
  };

  const increaseFont = () => {
    setFontScale((s) => Math.min(1.5, Number((s + 0.1).toFixed(2))));
  };

  const decreaseFont = () => {
    setFontScale((s) => Math.max(0.75, Number((s - 0.1).toFixed(2))));
  };

  return {
    // state
    lang,
    theme,          // "light" | "dark"
    contrast,
    fontScale,

    // actions
    toggleLang,
    toggleTheme,
    toggleContrast,
    increaseFont,
    decreaseFont,
  };
}

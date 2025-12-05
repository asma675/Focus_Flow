// components/Layout.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTheme, setTheme, applyTheme } from "@/theme/theme";

// Lightweight bilingual dictionary for UI words
const dict = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    tasks: "Tasks",
    settings: "Settings",
    about: "About",
    contact: "Contact",

    theme: "Theme",
    darkGlow: "Dark Glow",
    lightGlow: "Light Glow",

    a11y: "Accessibility",
    contrast: "High Contrast",
    largeText: "Large Text",
    plainLang: "Plain Language",

    language: "Language",
    readPage: "Read this page aloud",
  },
  fr: {
    home: "Accueil",
    dashboard: "Tableau de bord",
    tasks: "Tâches",
    settings: "Paramètres",
    about: "À propos",
    contact: "Contact",

    theme: "Thème",
    darkGlow: "Mode obscur lumineux",
    lightGlow: "Mode clair lumineux",

    a11y: "Accessibilité",
    contrast: "Contraste élevé",
    largeText: "Texte large",
    plainLang: "Langage simple",

    language: "Langue",
    readPage: "Lire cette page à voix haute",
  },
};

export default function Layout({ children }) {
  // Accessibility states
  const [theme, setThemeState] = useState("dark-glow");
  const [lang, setLang] = useState("en");
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [plainLanguage, setPlainLanguage] = useState(false);

  // Screen reader live region message
  const [announcement, setAnnouncement] = useState("");

  // Load settings from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    setLang(saved.lang || "en");
    setHighContrast(saved.highContrast || false);
    setLargeText(saved.largeText || false);
    setPlainLanguage(saved.plainLanguage || false);

    const savedTheme = getTheme();
    setThemeState(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem(
      "a11y-settings",
      JSON.stringify({ lang, highContrast, largeText, plainLanguage })
    );
  }, [lang, highContrast, largeText, plainLanguage]);

  const t = dict[lang];

  // Apply accessibility classes to body
  useEffect(() => {
    const body = document.body;
    body.classList.toggle("high-contrast", highContrast);
    body.classList.toggle("large-text", largeText);
    body.classList.toggle("plain-language", plainLanguage);
    body.setAttribute("lang", lang);
  }, [highContrast, largeText, plainLanguage, lang]);

  // Theme switching
  function switchTheme(mode) {
    setThemeState(mode);
    setTheme(mode);
    setAnnouncement(`${t.theme}: ${mode}`);
  }

  // Language switching
  function switchLang() {
    const newLang = lang === "en" ? "fr" : "en";
    setLang(newLang);
    setAnnouncement(`Language changed to ${newLang}`);
  }

  // Text-to-speech
  function readPage() {
    const text = document.title || "Page content";
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang === "en" ? "en-US" : "fr-FR";
    speechSynthesis.speak(msg);
    setAnnouncement("Reading page");
  }

  return (
    <div>
      {/* Screen Reader Live Region */}
      <div className="sr-live-region" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Skip to Content Link */}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Header */}
      <header className="header" role="banner" aria-label="Site Header">
        <h1 className="logo">FocusFlow</h1>

        {/* Navigation */}
        <nav role="navigation" aria-label="Main Navigation" className="nav">
          <Link className="nav-item" href="/">{t.home}</Link>
          <Link className="nav-item" href="/dashboard">{t.dashboard}</Link>
          <Link className="nav-item" href="/add-task">{t.tasks}</Link>
          <Link className="nav-item" href="/settings">{t.settings}</Link>
          <Link className="nav-item" href="/about">{t.about}</Link>
          <Link className="nav-item" href="/contact">{t.contact}</Link>
        </nav>

        {/* Controls */}
        <div className="a11y-controls" role="group" aria-label="Controls">

          {/* Theme Controls */}
          <div>
            <span className="control-label">{t.theme}:</span>
            <button onClick={() => switchTheme("dark-glow")}>{t.darkGlow}</button>
            <button onClick={() => switchTheme("light-glow")}>{t.lightGlow}</button>
          </div>

          {/* Accessibility Toggles */}
          <div>
            <span className="control-label">{t.a11y}:</span>
            <button onClick={() => setHighContrast(!highContrast)}>{t.contrast}</button>
            <button onClick={() => setLargeText(!largeText)}>{t.largeText}</button>
            <button onClick={() => setPlainLanguage(!plainLanguage)}>{t.plainLang}</button>
          </div>

          {/* Language Toggle */}
          <button onClick={switchLang}>{t.language}: {lang.toUpperCase()}</button>

          {/* Read Aloud */}
          <button onClick={readPage}>🔊 {t.readPage}</button>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" tabIndex="-1" className="main-content">
        {children}
      </main>
    </div>
  );
}

// pages/settings.js
import GlowCard from "@/components/GlowCard";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function SettingsPage() {
  const {
    lang,
    theme,
    contrast,
    fontScale,
    toggleLang,
    toggleTheme,
    toggleContrast,
    increaseFont,
    decreaseFont,
  } = useA11y();

  const t = {
    en: {
      title: "Accessibility & Settings",
      desc:
        "Adjust language, color theme, contrast, and text size so GovGuide AI is comfortable and accessible for you.",
      language: "Language",
      langEn: "English",
      langFr: "French",
      toggleLang: "Switch language",
      theme: "Theme",
      themeLight: "Light mode",
      themeDark: "Dark mode",
      toggleTheme: "Toggle theme",
      contrastLabel: "High contrast",
      contrastOn: "On",
      contrastOff: "Off",
      toggleContrast: "Toggle high contrast",
      fontSize: "Text size",
      bigger: "Increase text size",
      smaller: "Decrease text size",
      currentSettings: "Read current settings",
    },
    fr: {
      title: "Accessibilité et paramètres",
      desc:
        "Ajustez la langue, le thème, le contraste et la taille du texte pour que GovGuide AI soit confortable et accessible pour vous.",
      language: "Langue",
      langEn: "Anglais",
      langFr: "Français",
      toggleLang: "Changer de langue",
      theme: "Thème",
      themeLight: "Mode clair",
      themeDark: "Mode sombre",
      toggleTheme: "Changer de thème",
      contrastLabel: "Contraste élevé",
      contrastOn: "Activé",
      contrastOff: "Désactivé",
      toggleContrast: "Basculer le contraste élevé",
      fontSize: "Taille du texte",
      bigger: "Augmenter la taille du texte",
      smaller: "Diminuer la taille du texte",
      currentSettings: "Lire les paramètres actuels",
    },
  }[lang];

  function readSettings() {
    const langText = lang === "en" ? t.langEn : t.langFr;
    const themeText = theme === "dark" ? t.themeDark : t.themeLight;
    const contrastText = contrast ? t.contrastOn : t.contrastOff;
    const message = `${t.language}: ${langText}. ${t.theme}: ${themeText}. ${t.contrastLabel}: ${contrastText}. ${t.fontSize}: ${fontScale.toFixed(
      2
    )}.`;
    speak(message, lang);
  }

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>

      <div className="settings-section">
        {/* Language */}
        <div className="settings-row">
          <h2>{t.language}</h2>
          <p>
            {lang === "en" ? t.langEn : t.langFr}
          </p>
          <button
            type="button"
            className="btn"
            onClick={toggleLang}
          >
            🌐 {t.toggleLang}
          </button>
        </div>

        {/* Theme */}
        <div className="settings-row">
          <h2>{t.theme}</h2>
          <p>{theme === "dark" ? t.themeDark : t.themeLight}</p>
          <button
            type="button"
            className="btn"
            onClick={toggleTheme}
          >
            🎨 {t.toggleTheme}
          </button>
        </div>

        {/* High contrast */}
        <div className="settings-row">
          <h2>{t.contrastLabel}</h2>
          <p>{contrast ? t.contrastOn : t.contrastOff}</p>
          <button
            type="button"
            className="btn"
            onClick={toggleContrast}
          >
            ⚡ {t.toggleContrast}
          </button>
        </div>

        {/* Font size */}
        <div className="settings-row">
          <h2>{t.fontSize}</h2>
          <p>{fontScale.toFixed(2)}x</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn"
              onClick={decreaseFont}
            >
              ➖ {t.smaller}
            </button>
            <button
              type="button"
              className="btn"
              onClick={increaseFont}
            >
              ➕ {t.bigger}
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn"
        onClick={readSettings}
      >
        🔊 {t.currentSettings}
      </button>
    </GlowCard>
  );
}

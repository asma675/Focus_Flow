import Link from "next/link";
import { useA11y } from "@/hooks/useA11y";

export default function Header() {
  const { lang, toggleLang, theme, toggleTheme } = useA11y();

  const t = {
    en: { home: "Home", dashboard: "Dashboard", about: "About", contact: "Contact" },
    fr: { home: "Accueil", dashboard: "Tableau", about: "À propos", contact: "Contact" }
  }[lang];

  return (
    <header className="header">
      <nav>
        <Link href="/">{t.home}</Link>
        <Link href="/dashboard">{t.dashboard}</Link>
        <Link href="/about">{t.about}</Link>
        <Link href="/contact">{t.contact}</Link>
      </nav>

      <div className="header-actions">
        <button onClick={toggleLang} aria-label="Change Language">
          {lang === "en" ? "FR" : "EN"}
        </button>

        <button onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}

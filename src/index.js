import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    setLang(saved.lang || "en");
  }, []);

  const text = {
    en: {
      title: "Welcome to FocusFlow",
      desc: "A distraction-free, accessible productivity tool. Designed for screen readers, keyboard navigation, and users who prefer plain-language explanations.",
      btnLogin: "Log In",
      btnRegister: "Register",
      btnDashboard: "Enter Dashboard",
      read: "Read welcome aloud"
    },
    fr: {
      title: "Bienvenue à FocusFlow",
      desc: "Un outil de productivité accessible, conçu pour les lecteurs d'écran, la navigation au clavier et les utilisateurs qui préfèrent un langage simple.",
      btnLogin: "Connexion",
      btnRegister: "Créer un compte",
      btnDashboard: "Accéder au tableau de bord",
      read: "Lire l’accueil à voix haute"
    }
  };

  const t = text[lang];

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>

      <div className="button-row">
        <Link className="btn-primary" href="/login">{t.btnLogin}</Link>
        <Link className="btn" href="/register">{t.btnRegister}</Link>
        <Link className="btn" href="/dashboard">{t.btnDashboard}</Link>

        <button onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(t.desc))}>
          🔊 {t.read}
        </button>
      </div>
    </GlowCard>
  );
}

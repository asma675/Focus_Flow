import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Login() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    setLang(saved.lang || "en");
  }, []);

  const t = {
    en: {
      title: "Login",
      email: "Email address",
      pass: "Password",
      submit: "Log In (demo)",
      register: "Create an account",
      desc: "This is demo login only. No personal data is stored.",
      read: "Read login instructions",
    },
    fr: {
      title: "Connexion",
      email: "Adresse e-mail",
      pass: "Mot de passe",
      submit: "Connexion (démo)",
      register: "Créer un compte",
      desc: "Ceci est une connexion de démonstration uniquement. Aucune donnée personnelle n'est stockée.",
      read: "Lire les instructions de connexion",
    }
  }[lang];

  return (
    <GlowCard title={t.title}>
      <form aria-label={t.title} className="form-grid">
        <label>
          {t.email}
          <input type="email" aria-label={t.email} />
        </label>
        <label>
          {t.pass}
          <input type="password" aria-label={t.pass} />
        </label>

        <Link href="/dashboard" className="btn-primary">
          {t.submit}
        </Link>

        <Link href="/register" className="btn">{t.register}</Link>

        <button
          type="button"
          className="btn"
          onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(t.desc))}
        >
          🔊 {t.read}
        </button>

        <p className="muted">{t.desc}</p>
      </form>
    </GlowCard>
  );
}

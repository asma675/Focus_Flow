import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Register() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(JSON.parse(localStorage.getItem("a11y-settings") || "{}").lang || "en");
  }, []);

  const t = {
    en: {
      title: "Create an Account",
      name: "Full Name",
      email: "Email Address",
      pass: "Password",
      submit: "Continue to Dashboard",
      login: "Back to Login",
      desc: "Demo mode only; nothing is stored.",
      read: "Read registration info"
    },
    fr: {
      title: "Créer un compte",
      name: "Nom complet",
      email: "Adresse e-mail",
      pass: "Mot de passe",
      submit: "Continuer au tableau de bord",
      login: "Retour à la connexion",
      desc: "Mode démo uniquement; rien n'est enregistré.",
      read: "Lire les informations d'inscription"
    }
  }[lang];

  return (
    <GlowCard title={t.title}>
      <form className="form-grid">
        <label>{t.name}<input type="text" /></label>
        <label>{t.email}<input type="email" /></label>
        <label>{t.pass}<input type="password" /></label>

        <Link href="/dashboard" className="btn-primary">{t.submit}</Link>
        <Link href="/login" className="btn">{t.login}</Link>

        <button type="button" onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(t.desc))}>
          🔊 {t.read}
        </button>

        <p className="muted">{t.desc}</p>
      </form>
    </GlowCard>
  );
}

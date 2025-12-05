import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Register() {
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Create an Account",
      name: "Full name",
      email: "Email address",
      password: "Password",
      submit: "Continue to Dashboard",
      backLogin: "Back to Login",
      desc: "Registration is demo-only to showcase the workflow, accessibility, and bilingual UI.",
      read: "Read registration info",
    },
    fr: {
      title: "Créer un compte",
      name: "Nom complet",
      email: "Adresse e-mail",
      password: "Mot de passe",
      submit: "Continuer au tableau de bord",
      backLogin: "Retour à la connexion",
      desc: "L’inscription est une démo pour présenter le flux, l’accessibilité et l’interface bilingue.",
      read: "Lire les informations d’inscription",
    },
  }[lang];

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <form aria-label={t.title} className="form-grid">
        <label>
          {t.name}
          <input type="text" aria-label={t.name} />
        </label>
        <label>
          {t.email}
          <input type="email" aria-label={t.email} />
        </label>
        <label>
          {t.password}
          <input type="password" aria-label={t.password} />
        </label>

        <Link href="/dashboard" className="btn-primary">
          {t.submit}
        </Link>
        <Link href="/login" className="btn">
          {t.backLogin}
        </Link>

        <button
          type="button"
          className="btn"
          onClick={() => speak(t.desc, lang)}
        >
          🔊 {t.read}
        </button>
      </form>
    </GlowCard>
  );
}

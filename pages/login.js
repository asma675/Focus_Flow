import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Login() {
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Login",
      email: "Email address",
      password: "Password",
      submit: "Log In (demo)",
      register: "Create an account",
      desc: "This is a demo-only login for showcasing UI and accessibility. No personal data is stored.",
      read: "Read login info",
    },
    fr: {
      title: "Connexion",
      email: "Adresse e-mail",
      password: "Mot de passe",
      submit: "Connexion (démo)",
      register: "Créer un compte",
      desc: "Il s’agit d’un écran de connexion démo pour présenter l’interface et l’accessibilité. Aucune donnée personnelle n’est stockée.",
      read: "Lire les informations de connexion",
    },
  }[lang];

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <form aria-label={t.title} className="form-grid">
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
        <Link href="/register" className="btn">
          {t.register}
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

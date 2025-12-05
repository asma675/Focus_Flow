import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Home() {
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Welcome to FocusFlow",
      desc: "An accessible, glow-themed productivity app to help you understand and overcome procrastination. Designed for screen readers, keyboard-only navigation, and plain-language mode.",
      login: "Log In",
      register: "Register",
      dashboard: "Go to Dashboard",
      read: "Read welcome message",
    },
    fr: {
      title: "Bienvenue à FocusFlow",
      desc: "Une application de productivité accessible et lumineuse pour vous aider à comprendre et surmonter la procrastination. Conçue pour les lecteurs d’écran, la navigation au clavier et le mode langage simple.",
      login: "Connexion",
      register: "Créer un compte",
      dashboard: "Aller au tableau de bord",
      read: "Lire le message d’accueil",
    },
  }[lang];

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>

      <div className="button-row">
        <Link className="btn-primary" href="/login">
          {t.login}
        </Link>
        <Link className="btn" href="/register">
          {t.register}
        </Link>
        <Link className="btn" href="/dashboard">
          {t.dashboard}
        </Link>
        <button
          type="button"
          className="btn"
          onClick={() => speak(t.desc, lang)}
        >
          🔊 {t.read}
        </button>
      </div>
    </GlowCard>
  );
}

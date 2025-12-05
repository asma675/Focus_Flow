import GlowCard from "@/components/GlowCard";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Contact() {
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Contact",
      desc: "This contact form is a demo-only interface for accessibility testing. No messages are actually sent.",
      msgLabel: "Your message",
      send: "Send message (demo)",
      read: "Read contact info",
    },
    fr: {
      title: "Contact",
      desc: "Ce formulaire de contact est une interface de démonstration pour tester l’accessibilité. Aucun message n’est réellement envoyé.",
      msgLabel: "Votre message",
      send: "Envoyer le message (démo)",
      read: "Lire les informations de contact",
    },
  }[lang];

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <label>
        {t.msgLabel}
        <textarea aria-label={t.msgLabel} />
      </label>

      <button className="btn-primary" type="button">
        {t.send}
      </button>

      <button
        className="btn"
        type="button"
        onClick={() => speak(t.desc, lang)}
      >
        🔊 {t.read}
      </button>
    </GlowCard>
  );
}

import GlowCard from "@/components/GlowCard";
import TimerWidget from "@/components/TimerWidget";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Timer() {
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Focus Timer",
      desc: "Use the timer to create focused, distraction-free work sessions. Fully usable with keyboard-only navigation and screen readers.",
      read: "Read timer instructions",
    },
    fr: {
      title: "Minuteur de concentration",
      desc: "Utilisez le minuteur pour créer des sessions de travail concentrées et sans distraction. Entièrement utilisable avec la navigation au clavier et les lecteurs d’écran.",
      read: "Lire les instructions du minuteur",
    },
  }[lang];

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <TimerWidget />
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

import GlowCard from "@/components/GlowCard";
import { useTasks } from "@/hooks/useTasks";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Streak() {
  const { streak } = useTasks(); // assume hook exposes streak
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Streak Tracker",
      desc: "Your streak increases each day you complete at least one task.",
      label: "Current streak",
      days: "days",
      read: "Read streak info",
    },
    fr: {
      title: "Suivi de séquence",
      desc: "Votre séquence augmente chaque jour où vous complétez au moins une tâche.",
      label: "Séquence actuelle",
      days: "jours",
      read: "Lire les informations sur la séquence",
    },
  }[lang];

  function readInfo() {
    const text = `${t.label}: ${streak} ${t.days}.`;
    speak(text, lang);
  }

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <h2>{t.label}: {streak} {t.days}</h2>
      <button className="btn" type="button" onClick={readInfo}>
        🔊 {t.read}
      </button>
    </GlowCard>
  );
}

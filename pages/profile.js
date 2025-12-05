import GlowCard from "@/components/GlowCard";
import { useTasks } from "@/hooks/useTasks";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Profile() {
  const { tasks, completedCount, totalMinutesFocused } = useTasks();
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Profile & Focus Stats",
      desc: "High-level summary of your activity in FocusFlow.",
      total: "Total tasks",
      completed: "Completed tasks",
      minutes: "Total focus minutes",
      read: "Read profile summary",
    },
    fr: {
      title: "Profil et statistiques de concentration",
      desc: "Résumé global de votre activité dans FocusFlow.",
      total: "Tâches totales",
      completed: "Tâches complétées",
      minutes: "Minutes de concentration totales",
      read: "Lire le résumé du profil",
    },
  }[lang];

  function readSummary() {
    const text = `${t.total}: ${tasks.length}. ${t.completed}: ${completedCount}. ${t.minutes}: ${totalMinutesFocused}.`;
    speak(text, lang);
  }

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <ul>
        <li>{t.total}: {tasks.length}</li>
        <li>{t.completed}: {completedCount}</li>
        <li>{t.minutes}: {totalMinutesFocused}</li>
      </ul>
      <button className="btn" type="button" onClick={readSummary}>
        🔊 {t.read}
      </button>
    </GlowCard>
  );
}

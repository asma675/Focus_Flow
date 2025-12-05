import GlowCard from "@/components/GlowCard";
import { useTasks } from "@/hooks/useTasks";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function Analytics() {
  const { tasks, completedCount, totalMinutesFocused } = useTasks();
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Analytics",
      desc: "High-level overview of your productivity patterns.",
      total: "Total tasks",
      completed: "Completed",
      minutes: "Minutes focused",
      read: "Read analytics summary",
    },
    fr: {
      title: "Analytique",
      desc: "Vue d’ensemble de vos modèles de productivité.",
      total: "Tâches totales",
      completed: "Complétées",
      minutes: "Minutes concentrées",
      read: "Lire le résumé analytique",
    },
  }[lang];

  function readSummary() {
    const text = `${t.total}: ${tasks.length}. ${t.completed}: ${completedCount}. ${t.minutes}: ${totalMinutesFocused}.`;
    speak(text, lang);
  }

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <ul aria-label="Analytics summary">
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

import GlowCard from "@/components/GlowCard";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";
import Link from "next/link";

export default function Dashboard() {
  const { tasks, completedCount, totalMinutesFocused } = useTasks();
  const { lang } = useA11y();

  const t = {
    en: {
      title: "Dashboard",
      desc: "Review your focus stats, tasks, and progress over time.",
      stats: "Your Stats",
      tasksTitle: "Your Tasks",
      totalTasks: "Total tasks",
      completed: "Completed tasks",
      minutes: "Total focus minutes",
      addTask: "Add a new task",
      read: "Read dashboard summary",
    },
    fr: {
      title: "Tableau de bord",
      desc: "Consultez vos statistiques de concentration, vos tâches et vos progrès au fil du temps.",
      stats: "Vos statistiques",
      tasksTitle: "Vos tâches",
      totalTasks: "Tâches totales",
      completed: "Tâches complétées",
      minutes: "Minutes de concentration totales",
      addTask: "Ajouter une nouvelle tâche",
      read: "Lire le résumé du tableau de bord",
    },
  }[lang];

  function readSummary() {
    const text = `${t.totalTasks}: ${tasks.length}. ${t.completed}: ${completedCount}. ${t.minutes}: ${totalMinutesFocused}.`;
    speak(text, lang);
  }

  return (
    <>
      <GlowCard title={t.title}>
        <p>{t.desc}</p>
        <button className="btn" type="button" onClick={readSummary}>
          🔊 {t.read}
        </button>
      </GlowCard>

      <GlowCard title={t.stats}>
        <ul aria-label="Statistics">
          <li>{t.totalTasks}: {tasks.length}</li>
          <li>{t.completed}: {completedCount}</li>
          <li>{t.minutes}: {totalMinutesFocused}</li>
        </ul>
      </GlowCard>

      <GlowCard title={t.tasksTitle}>
        <TaskList />
        <Link className="btn-primary" href="/add-task">
          {t.addTask}
        </Link>
      </GlowCard>
    </>
  );
}

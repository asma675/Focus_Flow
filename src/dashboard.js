import GlowCard from "@/components/GlowCard";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { tasks, completedCount, totalMinutesFocused } = useTasks();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    setLang(s.lang || "en");
  }, []);

  const t = {
    en: {
      title: "Dashboard",
      desc: "Overview of your focus habits, time spent, and active tasks.",
      stats: "Your Stats",
      tasks: "Your Tasks",
      addTask: "Add a New Task",
      minutes: "Minutes Focused",
      completed: "Tasks Completed",
      read: "Read dashboard summary",
    },
    fr: {
      title: "Tableau de bord",
      desc: "Aperçu de vos habitudes de concentration, du temps passé et des tâches actives.",
      stats: "Vos statistiques",
      tasks: "Vos tâches",
      addTask: "Ajouter une tâche",
      minutes: "Minutes concentrées",
      completed: "Tâches complétées",
      read: "Lire le résumé du tableau",
    },
  }[lang];

  function readDashboard() {
    const msg = new SpeechSynthesisUtterance(
      `${t.desc}. ${completedCount} ${t.completed}. ${totalMinutesFocused} ${t.minutes}.`
    );
    speechSynthesis.speak(msg);
  }

  return (
    <>
      <GlowCard title={t.title}>
        <p>{t.desc}</p>
        <button onClick={readDashboard}>🔊 {t.read}</button>
      </GlowCard>

      <GlowCard title={t.stats}>
        <ul aria-label="User statistics">
          <li>{t.completed}: {completedCount}</li>
          <li>{t.minutes}: {totalMinutesFocused}</li>
        </ul>
      </GlowCard>

      <GlowCard title={t.tasks}>
        <TaskList tasks={tasks} />
        <Link className="btn-primary" href="/add-task">
          {t.addTask}
        </Link>
      </GlowCard>
    </>
  );
}

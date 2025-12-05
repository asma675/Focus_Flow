import GlowCard from "@/components/GlowCard";
import { useTasks } from "@/hooks/useTasks";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AddTask() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    setLang(s.lang || "en");
  }, []);

  const t = {
    en: {
      title: "Add a New Task",
      labelTask: "Task Title",
      labelMinutes: "Estimated Focus Minutes",
      submit: "Save Task",
      back: "Back to Dashboard",
      read: "Read form instructions",
      desc: "Provide a task name and estimated minutes. Your tasks help calculate analytics and streaks.",
    },
    fr: {
      title: "Ajouter une nouvelle tâche",
      labelTask: "Titre de la tâche",
      labelMinutes: "Minutes de concentration estimées",
      submit: "Enregistrer la tâche",
      back: "Retour au tableau de bord",
      read: "Lire les instructions",
      desc: "Indiquez un nom de tâche et des minutes estimées. Vos tâches aident à calculer les statistiques.",
    },
  }[lang];

  function handleSave() {
    addTask(title, minutes);
    const msg = new SpeechSynthesisUtterance("Task saved.");
    speechSynthesis.speak(msg);
    setTitle("");
    setMinutes("");
  }

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>

      <form aria-label={t.title} className="form-grid">
        <label>{t.labelTask}
          <input
            aria-label={t.labelTask}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>{t.labelMinutes}
          <input
            aria-label={t.labelMinutes}
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </label>

        <button
          type="button"
          className="btn-primary"
          onClick={handleSave}
        >
          {t.submit}
        </button>

        <Link className="btn" href="/dashboard">{t.back}</Link>

        <button
          type="button"
          className="btn"
          onClick={() => speechSynthesis.speak(new SpeechSynthesisUtterance(t.desc))}
        >
          🔊 {t.read}
        </button>
      </form>
    </GlowCard>
  );
}

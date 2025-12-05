import GlowCard from "@/components/GlowCard";
import { useTasks } from "@/hooks/useTasks";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";
import { useState } from "react";
import Link from "next/link";

export default function AddTask() {
  const { addTask } = useTasks();
  const { lang } = useA11y();
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("");

  const t = {
    en: {
      title: "Add a New Task",
      taskLabel: "Task title",
      minutesLabel: "Estimated focus minutes",
      save: "Save task",
      back: "Back to Dashboard",
      desc: "Break work into focused sessions. Estimating minutes helps build better analytics.",
      read: "Read task instructions",
      saved: "Task saved.",
    },
    fr: {
      title: "Ajouter une nouvelle tâche",
      taskLabel: "Titre de la tâche",
      minutesLabel: "Minutes de concentration estimées",
      save: "Enregistrer la tâche",
      back: "Retour au tableau de bord",
      desc: "Divisez le travail en sessions de concentration. Estimer les minutes aide à construire de meilleures analyses.",
      read: "Lire les instructions de tâche",
      saved: "Tâche enregistrée.",
    },
  }[lang];

  function handleSave() {
    addTask(title, minutes);
    speak(t.saved, lang);
    setTitle("");
    setMinutes("");
  }

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <form aria-label={t.title} className="form-grid">
        <label>
          {t.taskLabel}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label={t.taskLabel}
          />
        </label>
        <label>
          {t.minutesLabel}
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            aria-label={t.minutesLabel}
          />
        </label>

        <button
          type="button"
          className="btn-primary"
          onClick={handleSave}
        >
          {t.save}
        </button>

        <Link href="/dashboard" className="btn">
          {t.back}
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

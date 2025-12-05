// components/TaskList.js
import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useA11y } from "@/hooks/useA11y";

export default function TaskList() {
  const { tasks, toggleTask, editTask, deleteTask } = useTasks();
  const { lang } = useA11y();

  const t = {
    en: {
      mark: "Mark complete",
      unmark: "Mark incomplete",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      minutes: "min",
      empty: "No tasks yet — add your first focus task!",
      profTitle: "Professor Focus",
      profCongrats: (title) =>
        `Fantastic work finishing “${title}”! Keep riding that focus wave. 💙🎉`,
    },
    fr: {
      mark: "Marquer comme terminé",
      unmark: "Marquer comme incomplet",
      edit: "Modifier",
      delete: "Supprimer",
      save: "Enregistrer",
      cancel: "Annuler",
      minutes: "min",
      empty: "Aucune tâche pour le moment — ajoutez votre première tâche de focus !",
      profTitle: "Professeur Focus",
      profCongrats: (title) =>
        `Super travail pour avoir terminé « ${title} » ! Continuez sur cette lancée. 💙🎉`,
    },
  }[lang];

  const [editingId, setEditingId] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftMinutes, setDraftMinutes] = useState("");
  const [profMessage, setProfMessage] = useState("");
  const [showProf, setShowProf] = useState(false);

  useEffect(() => {
    if (!showProf) return;
    const timer = setTimeout(() => setShowProf(false), 5000);
    return () => clearTimeout(timer);
  }, [showProf]);

  function startEditing(task) {
    setEditingId(task.id);
    setDraftTitle(task.title);
    setDraftMinutes(
      typeof task.minutes === "number" && !Number.isNaN(task.minutes)
        ? String(task.minutes)
        : ""
    );
  }

  function handleSave() {
    if (!editingId) return;
    editTask(editingId, draftTitle, draftMinutes);
    setEditingId(null);
    setDraftTitle("");
    setDraftMinutes("");
  }

  function handleCancel() {
    setEditingId(null);
    setDraftTitle("");
    setDraftMinutes("");
  }

  function handleToggle(task) {
    toggleTask(task.id);
    if (!task.completed) {
      // Only celebrate when moving from incomplete -> complete
      setProfMessage(t.profCongrats(task.title));
      setShowProf(true);
    }
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-wrapper">
        <p className="task-empty">{t.empty}</p>
      </div>
    );
  }

  return (
    <div className="task-list-wrapper">
      {showProf && (
        <div
          className="professor-toast"
          role="status"
          aria-live="polite"
        >
          <div className="professor-avatar" aria-hidden="true">
            🎓
          </div>
          <div className="professor-text">
            <div className="professor-title">{t.profTitle}</div>
            <div className="professor-message">{profMessage}</div>
          </div>
        </div>
      )}

      <ul className="task-list">
        {tasks.map((task) => {
          const isEditing = editingId === task.id;

          return (
            <li
              key={task.id}
              className={
                "task-item" + (task.completed ? " task-item-completed" : "")
              }
            >
              <div className="task-main">
                {isEditing ? (
                  <>
                    <input
                      className="task-input"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      aria-label="Task title"
                    />
                    <input
                      className="task-input task-input-minutes"
                      type="number"
                      min="0"
                      value={draftMinutes}
                      onChange={(e) => setDraftMinutes(e.target.value)}
                      aria-label="Planned minutes"
                    />
                  </>
                ) : (
                  <>
                    <span className="task-title">{task.title}</span>
                    {task.minutes ? (
                      <span className="task-meta">
                        {task.minutes} {t.minutes}
                      </span>
                    ) : null}
                  </>
                )}
              </div>

              <div className="task-actions">
                <button
                  aria-label={task.completed ? t.unmark : t.mark}
                  onClick={() => handleToggle(task)}
                  className="btn btn-circle"
                >
                  {task.completed ? "✔" : "○"}
                </button>

                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleSave}
                    >
                      {t.save}
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleCancel}
                    >
                      {t.cancel}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => startEditing(task)}
                    >
                      {t.edit}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      {t.delete}
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

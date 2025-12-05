import { useEffect, useState } from "react";

const STORAGE_KEY = "focusflow-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(0);
  const [totalMinutesFocused, setTotalMinutesFocused] = useState(0);

  // Load from localStorage on first render
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const saved = JSON.parse(raw);

      // Legacy format: plain array of tasks
      if (Array.isArray(saved)) {
        setTasks(saved);
        const completedCount = saved.filter((t) => t.completed).length;
        setStreak(completedCount);
        setTotalMinutesFocused(0);
      } else if (saved && typeof saved === "object") {
        setTasks(Array.isArray(saved.tasks) ? saved.tasks : []);
        setStreak(Number(saved.streak) || 0);
        setTotalMinutesFocused(Number(saved.totalMinutesFocused) || 0);
      }
    } catch (e) {
      // if parsing fails, just start fresh
      setTasks([]);
      setStreak(0);
      setTotalMinutesFocused(0);
    }
  }, []);

  // Recalculate streak whenever tasks change (simple: number of completed tasks)
  useEffect(() => {
    const completedCount = tasks.filter((t) => t.completed).length;
    setStreak(completedCount);
  }, [tasks]);

  // Persist everything whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const payload = {
      tasks,
      streak,
      totalMinutesFocused,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [tasks, streak, totalMinutesFocused]);

  function addTask(title, minutes) {
    const trimmed = (title || "").trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: trimmed,
        minutes: Number(minutes) || 0,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : t.completedAt } : t
      )
    );
  }

  function editTask(id, title, minutes) {
    const trimmed = (title || "").trim();
    if (!trimmed) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: trimmed,
              minutes: Number(minutes) || 0,
            }
          : t
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addFocusMinutes(minutes) {
    const extra = Number(minutes) || 0;
    if (!extra) return;
    setTotalMinutesFocused((prev) => prev + extra);
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return {
    tasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    addFocusMinutes,
    completedCount,
    streak,
    totalMinutesFocused,
  };
}

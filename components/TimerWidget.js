// components/TimerWidget.js
import { useEffect, useState } from "react";
import { speak } from "@/utils/tts";
import { useA11y } from "@/hooks/useA11y";
import { useTasks } from "@/hooks/useTasks";

export default function TimerWidget() {
  const { lang } = useA11y();
  const { addFocusMinutes } = useTasks();

  // Session duration in minutes
  const [duration, setDuration] = useState(25);
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const t = {
    en: {
      start: "Start Timer",
      pause: "Pause",
      reset: "Reset",
      finished: "Timer finished",
      label: "Session length",
      helper: "Pick a calm focus window and press Start.",
    },
    fr: {
      start: "Démarrer le minuteur",
      pause: "Pause",
      reset: "Réinitialiser",
      finished: "Minuteur terminé",
      label: "Durée de la session",
      helper: "Choisissez une période de concentration et appuyez sur Démarrer.",
    },
  }[lang];

  useEffect(() => {
    let interval = null;

    if (running && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    }

    if (seconds === 0 && running) {
      setRunning(false);
      speak(t.finished, lang);
      addFocusMinutes(sessionMinutes);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running, seconds, lang, t.finished, addFocusMinutes, sessionMinutes]);

  function handleStartPause() {
    if (!running) {
      setSessionMinutes(duration);
      setSeconds(duration * 60);
      setRunning(true);
    } else {
      setRunning(false);
    }
  }

  function reset() {
    setRunning(false);
    setSeconds(duration * 60);
  }

  function handleDurationChange(e) {
    const next = Number(e.target.value) || 5;
    setDuration(next);
    if (!running) {
      setSeconds(next * 60);
    }
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div role="timer" aria-live="polite" className="timer-box">
      <div className="timer-controls">
        <label className="timer-label">
          {t.label}:{" "}
          <span className="timer-length">
            {duration} min
          </span>
        </label>
        <input
          type="range"
          min="5"
          max="60"
          step="5"
          value={duration}
          onChange={handleDurationChange}
          disabled={running}
          aria-valuemin={5}
          aria-valuemax={60}
          aria-valuenow={duration}
          aria-label={t.label}
          className="timer-slider"
        />
        <p className="timer-helper">{t.helper}</p>
      </div>

      <h2 className="timer-display">
        {mm}:{ss}
      </h2>

      <div className="button-row">
        <button className="btn-primary" onClick={handleStartPause}>
          {running ? t.pause : t.start}
        </button>

        <button className="btn" onClick={reset}>
          {t.reset}
        </button>
      </div>
    </div>
  );
}

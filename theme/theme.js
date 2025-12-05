// theme/theme.js
// Handles Dark/Light Glow Mode switching with persistence

export function getTheme() {
  if (typeof window === "undefined") return "dark-glow";
  return localStorage.getItem("theme") || "dark-glow";
}

export function setTheme(mode) {
  localStorage.setItem("theme", mode);
  applyTheme(mode);
}

export function applyTheme(mode) {
  if (typeof document === "undefined") return;

  const body = document.body;

  // Remove old classes
  body.classList.remove("dark-glow", "light-glow");

  // Apply new theme
  body.classList.add(mode);
}

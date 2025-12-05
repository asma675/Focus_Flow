import { useA11y } from "@/hooks/useA11y";

export default function A11yMenu() {
  const { 
    lang, toggleLang, 
    theme, toggleTheme, 
    fontScale, increaseFont, decreaseFont, 
    contrast, toggleContrast 
  } = useA11y();

  return (
    <div className="a11y-menu" aria-label="Accessibility Controls">
      <button onClick={toggleLang}>{lang === "en" ? "FR" : "EN"}</button>
<button onClick={toggleTheme}>
  {theme === "light" ? "Dark mode" : "Light mode"}
</button>
      <button onClick={toggleContrast}>{contrast ? "Normal Contrast" : "High Contrast"}</button>
      <button onClick={increaseFont} aria-label="Increase Text Size">A+</button>
      <button onClick={decreaseFont} aria-label="Decrease Text Size">A-</button>
    </div>
  );
}

import { useA11y } from "@/hooks/useA11y";

export default function Footer() {
  const { lang } = useA11y();

  const t = {
    en: "Built by Asma Ahmed with accessibility, bilingual UX, and a glow theme ✨",
    fr: "Conçu avec accessibilité, UX bilingue et thème lumineux ✨"
  }[lang];

  return <footer className="footer">{t}</footer>;
}

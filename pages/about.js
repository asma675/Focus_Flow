import GlowCard from "@/components/GlowCard";
import { useA11y } from "@/hooks/useA11y";
import { speak } from "@/utils/tts";

export default function About() {
  const { lang } = useA11y();

  const t = {
    en: {
      title: "About FocusFlow",
      desc: "FocusFlow is a glow-themed, WCAG 2.1 AA–aware procrastination tracker. It supports screen readers, keyboard-only navigation, high contrast, large text, plain-language mode, and bilingual English/French content.",
      read: "Read about text",
    },
    fr: {
      title: "À propos de FocusFlow",
      desc: "FocusFlow est un traqueur de procrastination lumineux, conforme à WCAG 2.1 AA. Il prend en charge les lecteurs d’écran, la navigation au clavier, le contraste élevé, le texte large, le langage simple et le contenu bilingue français/anglais.",
      read: "Lire le texte À propos",
    },
  }[lang];

  return (
    <GlowCard title={t.title}>
      <p>{t.desc}</p>
      <button className="btn" type="button" onClick={() => speak(t.desc, lang)}>
        🔊 {t.read}
      </button>
    </GlowCard>
  );
}

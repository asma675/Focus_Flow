// utils/tts.js
export function speak(text, lang = "en") {
  if (typeof window === "undefined") return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang === "fr" ? "fr-FR" : "en-US";
  speechSynthesis.speak(msg);
}

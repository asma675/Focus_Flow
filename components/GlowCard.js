// components/GlowCard.js
export default function GlowCard({ title, children }) {
  return (
    <section
      className="glow-card card"
      role="region"
      aria-label={title}
      tabIndex="-1"
    >
      <h2>{title}</h2>
      {children}
    </section>
  );
}

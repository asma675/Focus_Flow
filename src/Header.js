import React from "react";

function Header() {
  return (
    <header className="top-nav">
      <div className="brand">
        <div className="logo-mark">
          <span className="logo-dot" />
        </div>
        <div className="brand-text">
          <span className="brand-kicker">Prototype</span>
          <h1>GovGuide AI</h1>
          <p>Plain-language navigator for policies, regulations & forms.</p>
        </div>
      </div>
      <div className="badge-cluster">
        <span className="badge">Bilingual-ready</span>
        <span className="badge">Explainable</span>
        <span className="badge badge-outline">For Government Use</span>
      </div>
    </header>
  );
}

export default Header;

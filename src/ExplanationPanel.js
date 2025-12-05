import React from "react";

function ExplanationPanel({ analysis }) {
  if (!analysis) {
    return (
      <section className="card card-output card-empty">
        <div className="card-header">
          <h2>2 · Plain-Language Explanation</h2>
          <p>Run an analysis to see summary, obligations, eligibility, and next steps.</p>
        </div>
        <div className="empty-state">
          <p>
            Once you click <strong>Analyze Policy</strong>, this panel will show a
            plain-language breakdown and checklists you can use in your video demo.
          </p>
        </div>
      </section>
    );
  }

  const { summary, obligations, eligibility, documents, steps } = analysis;

  const renderSection = (title, items, emptyText) => (
    <div className="panel-section">
      <div className="panel-section-header">
        <h3>{title}</h3>
      </div>
      {items && items.length > 0 ? (
        <ul className="bullet-list">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">{emptyText}</p>
      )}
    </div>
  );

  return (
    <section className="card card-output">
      <div className="card-header">
        <h2>2 · Plain-Language Explanation</h2>
        <p>
          A simple, transparent breakdown based on the text you provided. This is a rules-based demo, not a final production AI.
        </p>
      </div>

      <div className="summary-block">
        <h3>High-Level Summary</h3>
        <p>{summary}</p>
      </div>

      <div className="panel-grid">
        {renderSection(
          "Key Obligations",
          obligations,
          "No explicit obligations detected. Try adding more detailed policy text."
        )}
        {renderSection(
          "Eligibility Signals",
          eligibility,
          "No clear eligibility statements detected."
        )}
        {renderSection(
          "Required Documents",
          documents,
          "No specific documents detected. Include references to proof, ID, or certificates."
        )}
        {renderSection(
          "Suggested Steps & Actions",
          steps,
          "No steps detected. Include sentences that start with submit/apply/complete/etc."
        )}
      </div>

      <div className="disclaimer">
        <p>
          <strong>Disclaimer:</strong> Prototype for demonstration only. Does not provide legal advice or make binding eligibility decisions.
        </p>
      </div>
    </section>
  );
}

export default ExplanationPanel;

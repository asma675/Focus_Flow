import React, { useState } from "react";
import Header from "./Header";
import PolicyInput from "./PolicyInput";
import ExplanationPanel from "./ExplanationPanel";

function App() {
  const [mode, setMode] = useState("text");
  const [rawInput, setRawInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    if (!rawInput.trim()) {
      setError("Please paste some policy text or a URL first.");
      return;
    }

    setIsLoading(true);
    try {
      let text = rawInput;

      // Optional: if URL mode, we *try* to fetch the page.
      // For demo purposes, CORS may block some sites, so
      // we still fall back to showing the URL as-is.
      if (mode === "url") {
        try {
          const response = await fetch(rawInput);
          const html = await response.text();
          // Super simple strip of HTML tags:
          text = html.replace(/<[^>]+>/g, " ");
        } catch (e) {
          console.warn("Fetch failed, using URL as text only.");
          text = rawInput;
        }
      }

      const result = analyzePolicy(text);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError("Something went wrong while analyzing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const analyzePolicy = (text) => {
    const clean = text.replace(/\s+/g, " ").trim();

    // Sentences for summary
    const sentences = clean.split(/(?<=[.!?])\s+/).filter(s => s.length > 0);
    const summary = sentences.slice(0, 3).join(" ");

    const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);

    const obligations = lines.filter(l =>
      /must|shall|required|obligated|responsible/i.test(l)
    );

    const eligibility = lines.filter(l =>
      /eligible|eligibility|must be|may apply|qualif/i.test(l)
    );

    const documents = lines.filter(l =>
      /proof|certificate|ID|identification|supporting document|documentation/i.test(l)
    );

    const steps = lines.filter(l =>
      /submit|apply|complete|fill out|sign|upload|send/i.test(l)
    );

    return {
      summary: summary || "No clear summary detected. Try adding more text.",
      obligations,
      eligibility,
      documents,
      steps
    };
  };

  return (
    <div className="app-root">
      <div className="glow-orbit glow-orbit-1" />
      <div className="glow-orbit glow-orbit-2" />
      <div className="glow-orbit glow-orbit-3" />

      <Header />

      <main className="layout">
        <section className="card card-input">
          <div className="card-header">
            <h2>1 · Select Input Type</h2>
            <p>Paste a policy, regulation, or form instructions to translate into plain language.</p>
          </div>

          <div className="mode-toggle">
            <button
              className={mode === "text" ? "pill active" : "pill"}
              onClick={() => setMode("text")}
            >
              Paste Policy Text
            </button>
            <button
              className={mode === "url" ? "pill active" : "pill"}
              onClick={() => setMode("url")}
            >
              URL (beta)
            </button>
          </div>

          <PolicyInput
            mode={mode}
            value={rawInput}
            onChange={setRawInput}
          />

          {error && <div className="error-banner">{error}</div>}

          <button className="primary-button" onClick={handleAnalyze} disabled={isLoading}>
            {isLoading ? "Analyzing…" : "Analyze Policy"}
          </button>

          <p className="hint">
            Demo only · Does not make legal decisions · Uses simple rule-based analysis.
          </p>
        </section>

        <ExplanationPanel analysis={analysis} />
      </main>

      <footer className="footer">
        <p>
          Prototype for G7 Rapid Solution Labs · <span className="tag">GovGuide AI</span>
        </p>
      </footer>
    </div>
  );
}

export default App;

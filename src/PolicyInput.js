import React from "react";

function PolicyInput({ mode, value, onChange }) {
  const label =
    mode === "text"
      ? "Paste policy, regulation text, or form instructions"
      : "Paste URL to a public policy page (experimental)";

  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <textarea
        className="field-textarea"
        rows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          mode === "text"
            ? "Example: \nApplicants must be Canadian residents and file their taxes for the last year. Eligible individuals may apply online and must provide proof of income and identification..."
            : "https://www.canada.ca/en/environment-climate-change/services/... "
        }
      />
    </div>
  );
}

export default PolicyInput;

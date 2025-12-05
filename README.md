# 📘 **GovGuide AI – Plain-Language Policy & Forms Navigator**

A modern, accessible React-based prototype built for the **G7 Rapid Solution Labs Challenge**.
GovGuide AI transforms complex government policies, regulations, and forms into clear **plain-language guidance** to support Canadians and public servants.

* Live Demo: *(https://gov-guide-ai-seven.vercel.app/)*
* GitHub Repo: *(https://github.com/asma675/GovGuideAI.git)*
* Youtube Demo: *(https://youtu.be/Ts98HVf2w6I)*

---

## 🔍 **What GovGuide AI Does**

Government policies and forms are often long, confusing, and difficult to navigate.
GovGuide AI provides real-time assistance by:

* 📝 Summarizing policy or form text in clear, plain language
* 🧾 Detecting obligations, eligibility rules, required documents, and next steps
* 🔍 Offering explainable breakdowns
* 🌐 Supporting bilingual deployment (English/French ready)
* ⚖️ Following responsible AI principles (no personal data stored)
* 🔒 Providing transparent, non-decision-making guidance for users

This tool does **not** make legal decisions — it simply clarifies and explains.

---

## 🛠 **Tech Stack**

* **React 18** (Create React App)
* **HTML / CSS / JS**
* **Custom Glow UI**, accessible, purple gov-theme
* Pure client-side analysis (no backend required)

---

## 🎨 **UI Features**

* Accessible, high-contrast, government-ready design
* Beautiful purple-glow aesthetic
* Fully responsive layout
* Explained sections:

  * High-Level Summary
  * Key Obligations
  * Eligibility Signals
  * Required Documents
  * Suggested Steps & Actions

---

## ⚙️ **How It Works**

GovGuide AI uses simple rule-based analysis to simulate explainable AI:

* Text is parsed and cleaned
* Sentences are categorized using pattern detection
* Lists are generated directly from user-provided text
* No data is stored, transmitted, logged, or kept

This ensures **privacy**, **responsible AI**, and **zero sensitive information** processing.

---

## 🚀 **Running Locally**

```bash
git clone https://github.com/YOUR-USERNAME/govguide-ai.git
cd govguide-ai
npm install
npm start
```

Your app runs at:

```
http://localhost:3000
```

---

## 🌐 **Deploying to Vercel**

1. Push your repo to GitHub
2. Open: [https://vercel.com](https://vercel.com)
3. Select **New Project**
4. Import this GitHub repository
5. Choose **React** (auto-detected)
6. Click **Deploy**

Vercel will give you a public link you can add to your submission.

---

## 📂 **Project Structure**

```
govguide-ai/
 ├── public/
 │    └── index.html
 ├── src/
 │    ├── App.js
 │    ├── Header.js
 │    ├── PolicyInput.js
 │    ├── ExplanationPanel.js
 │    ├── index.js
 │    └── styles.css
 ├── package.json
 └── README.md
```

---

## 🔒 **Responsible AI & Privacy**

GovGuide AI follows OECD & Government of Canada AI principles:

* No personal data is collected or stored
* No backend or logging
* Transparent, explainable outputs
* No eligibility decisions—only interpretation
* Safe, reversible, non-binding explanations

---

## 🧩 **Limitations (for transparency)**

* Uses rule-based keyword analysis
* Not suitable for legal interpretation
* Prototype-level, for demonstration purposes only
* CORS limitations may prevent URL text extraction in browser
* Best used with pasted text

---

## 📜 **License**

MIT License — free to use, modify, and expand.

---

## 🙋‍♀️ **Creator**

Built by **Asma Ahmed** for the
**G7 Rapid Solution Labs Challenge 2025–2026**
Focus: Government innovation, responsible AI, accessibility, and public-sector technology.

This prototype is submitted for the G7 GovAI Challenge. 
Reuse or redistribution is not permitted without permission.

# Attune • Mental Wellness & Cognitive Reflection Engine

**Attune** is a modern, responsive full-stack mental wellness application built with React, Vite, Express, Tailwind CSS, and the Google Gemini API. It features a dark Bento OS layout for cognitive reflection, acute stress response triggers, AI-assisted thought reframing, guided respiration protocols, and somatic grounding tools.

---

## 🌟 Key Features

- **Reflective Thought Log**: Capture mental logs and receive AI-driven cognitive reframes powered by Gemini.
- **Biometric Acute Response**: Interactive alert simulation detecting elevated heart rates with rapid guided resets.
- **Respiration Protocols**: Real-time interactive paced breathing with custom timer controls and sound guidance.
- **5-4-3-2-1 Somatic Grounding**: Step-by-step sensory anchoring tool to regulate nervous system arousal.
- **Journal & Analytics**: View historic reflection entries, mood breakdowns, and practice streaks.
- **Crisis Shield**: Quick-access hotline links (988, Crisis Text Line) for immediate crisis support.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Gemini API Key**: Obtain a key from [Google AI Studio](https://aistudio.google.com/).

---

### Local Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/attune.git
   cd attune
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key_here"
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📜 Build & Production Deployment

To build the full-stack application (bundling Express backend and Vite React frontend):

```bash
npm run build
npm start
```

---

## 📁 Repository Structure

```
├── src/
│   ├── components/       # UI modules (Header, ReflectView, LibraryView, etc.)
│   ├── data.ts           # Mood configurations & initial reflection data
│   ├── App.tsx           # Primary application container & tab router
│   ├── main.tsx          # Application entry point
│   ├── index.css         # Tailwind CSS & global theme styling
│   └── types.ts          # Shared TypeScript type definitions
├── server.ts             # Express server proxying Gemini API requests & serving Vite static app
├── package.json          # Project scripts and dependency manifest
├── tsconfig.json         # TypeScript compiler configuration
└── .env.example          # Environment variable template
```

---

## 📄 License

MIT License. Designed with care for mental wellness and cognitive resilience.

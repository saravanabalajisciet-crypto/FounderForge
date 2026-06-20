# ⚡ FounderForge AI
### Stop guessing. Start building the right thing.

Built for **GEMINI.EXE 2.0 Hackathon** — powered by **Google Gemini API**

---

## The Problem

Every year, 90% of startups fail.

Not because founders lack passion — but because they spend months building the wrong product, for the wrong audience, with the wrong features.

A founder has an idea at 2AM. They spend 6 months building. They show it to users. Wrong audience. Wrong features. No money left. Startup dies.

**This happens every single day.**

Existing tools give you a text editor or a kanban board. None of them answer the real question: *"Should I actually build this?"*

---

## The Solution

FounderForge AI turns any startup idea into a complete, investor-ready product plan in under 60 seconds.

Not a chatbot. Not a template generator. A full AI product studio — where Gemini powers every layer of the product-building process, from system architecture to live app mockups.

> Remove the API and the app doesn't work. Gemini isn't a feature — it's the engine.

---

## ✨ What It Generates

Type your idea. FounderForge does the rest.

**📋 Product Blueprint**
Problem statement, target audience, core features, MVP scope — structured and actionable.

**🏗️ System Architecture**
Interactive component map with animated node connections. Frontend, backend, database, services — all visualized.

**🗄️ Database Schema**
Tables, fields, data types, constraints, and relationships — production-quality schema design.

**🔌 API Specification**
Every endpoint documented — method, path, auth, request body, response format. Ready to hand to a developer.

**👥 User Personas & Testing**
4 AI-simulated users with real backgrounds test your product and give honest feedback — what they love, what's missing, what they'd pay for.

**👩‍💼 CEO Review**
Executive-level analysis with a Founder Score out of 10. What works, biggest risks, MVP priorities, and growth potential — styled like a real investor review.

**📊 Market Analysis**
Existing competitors, market gap, differentiation strategy, and an opportunity score. Visual cards, not walls of text.

**🤖 AI Improvements**
Persona-driven feature refinements — the AI takes user feedback and generates a smarter, leaner MVP.

**🚀 Launch Preview**
A real-looking, interactive app mockup. Not documentation — an actual visual of what your product could look like on day one.

---

## 🔥 Unique Features

**Launch Preview as the Hero**
Most tools end with docs. FounderForge ends with a visual MVP mockup — rendered with real UI components, animations, and app-specific layouts based on what Gemini generates.

**Gemini Powers Every Step**
Each section is a separate, structured Gemini call. Blueprint → Architecture → Database → API → Personas → CEO Review → Market → Improvements → Preview. The chain builds on itself.

**Premium AI Studio Design**
Deep black backgrounds, purple gradients, glassmorphism, and smooth Framer Motion animations throughout. Built to impress, not just inform.

**No Static Templates**
Every generation is unique to the idea. A fitness app looks different from a fintech app — because Gemini decides the structure, components, and layout.

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/your-username/founderforge.git
cd founderforge

# Install
npm install

# Add your Gemini API key
echo "GEMINI_API_KEY=your_key_here" > .env.local

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Get a free Gemini API key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — no billing required.

---

## ⚠️ API Quota Note

FounderForge makes ~10 Gemini API calls per generation (one per section). The free tier allows 20 requests/day per model — so you get roughly 2 full generations per key per day.

If you hit a `429 - Resource Exhausted` error, the key's daily quota is used up. Grab a fresh key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey), update `.env.local`, and restart the server.

We genuinely wanted to push this further — a paid key removes all limits entirely. For the hackathon, each new key gives you a fresh batch of generations.

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| Animations | Framer Motion |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Architecture Viz | React Flow |
| Components | Radix UI |

---

## 📁 Project Structure

```
founderforge/
├── src/
│   ├── app/
│   │   ├── api/generate/        — AI generation endpoints
│   │   │   ├── blueprint/
│   │   │   ├── architecture/
│   │   │   ├── database/
│   │   │   ├── api/
│   │   │   ├── personas/
│   │   │   ├── ceoreview/
│   │   │   ├── marketanalysis/
│   │   │   ├── improvement/
│   │   │   ├── launchpreview/
│   │   │   └── snapshot/
│   │   └── page.tsx
│   ├── components/
│   │   ├── features/            — Blueprint, CEO Review, Market, Launch Preview...
│   │   ├── workspace/           — Project workspace, generation progress
│   │   └── layout/              — Sidebar, TopNav
│   ├── lib/
│   │   └── gemini.ts            — Gemini API client
│   ├── store/
│   │   └── projectStore.ts      — Zustand state
│   └── types/
│       └── index.ts
```

---

## 🎯 Demo Ideas

These generate particularly strong results:

- `A micro-investment app for college students`
- `A freelancer gig platform for designers`
- `A travel budget tracker for solo backpackers`
- `A fitness app with AI coaching for beginners`

---

## 🎯 Why This

**Real problem** — Solo founders waste months building the wrong thing. FounderForge cuts that to 60 seconds.

**Gemini is the core** — Every section is a structured Gemini generation. The app literally cannot function without it.

**Not a wrapper** — Gemini generates structured JSON that drives real UI — architecture diagrams, schema tables, persona cards, live mockups. It's a simulator, not a chatbot.

**End-to-end coverage** — Blueprint to launch preview, in one flow, for any idea.

---

Made with ❤️ for **GEMINI.EXE 2.0**

> *We're not building a tool. We're building the co-founder every solo founder deserves.*

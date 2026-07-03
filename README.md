# TalentIQ AI — Enterprise Recruitment Intelligence Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-19-2563EB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-8B5CF6?style=flat-square&logo=node.js" />
  <img src="https://img.shields.io/badge/Vite-Frontend-22C55E?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/status-active-22C55E?style=flat-square" />
</p>

<p align="center">
  An AI-powered recruitment intelligence platform with resume screening, mock AI interviews,
  candidate ranking, and enterprise hiring analytics — built end-to-end (React + Node + Express).
</p>

<p align="center">
  <a href="#-live-demo"><b>Live Demo</b></a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-getting-started">Getting Started</a> ·
  <a href="#-project-structure">Project Structure</a>
</p>

---

## 🔗 Live Demo

| | |
|---|---|
| **Frontend (Vercel)** | https://talentiq-ai-recruitment-platform.vercel.app/ |
| **Backend API (Render)** |  https://talentiq-ai-recruitment-platform-64lk.onrender.com |

> Free-tier backend hosts (Render) spin down after inactivity — the first request after idle
> time can take ~30–60s to wake up.

## 📸 Screenshots

| Dashboard | AI Recruiter | Analytics |
|---|---|---|
| <img width="1887" height="1028" alt="image" src="https://github.com/user-attachments/assets/488741cb-4c0d-4c29-938d-ab1dfce1bd50" />
 |<img width="1901" height="1025" alt="image" src="https://github.com/user-attachments/assets/efab4223-19a8-440a-b21f-a9cb8c91e34a" />
 |<img width="1883" height="1047" alt="image" src="https://github.com/user-attachments/assets/e0f42f87-4c1d-4d33-a4cc-18d7099e1417" />
 |

## ✨ Features

- **Resume AI** — drag-and-drop PDF upload, real text extraction (`pdf-parse`), ATS scoring against a Data Analyst skill taxonomy, missing/recommended skill detection
- **AI Recruiter** — simulated interview engine across 5 modes (HR, Technical, Behavioral, Data Analyst, Custom) with live scoring and a Hire/Hold/Reject recommendation
- **Candidate Profiles** — full profile view with skills, projects, certifications, and links
- **Analytics Dashboard** — hiring funnel, monthly interview trend, skill distribution, department hiring, AI-generated insights (Recharts)
- **Reports** — one-click downloadable interview/resume/ATS/CSV reports
- Fully responsive, glassmorphism dark UI, animated with Framer Motion

## 🛠 Tech Stack

**Frontend:** React 19 · Vite · React Router · Framer Motion · Recharts · React Icons · React Dropzone
**Backend:** Node.js · Express · Multer · pdf-parse · pdfkit

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/talentiq-ai.git
cd talentiq-ai
```

### 2. Run the backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev        # http://localhost:5000
```

### 3. Run the frontend
```bash
cd frontend
npm install
npm run dev         # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5000/*`, so no CORS config is needed
locally. Every page also has an offline fallback (mock data), so the UI still works even if the
backend isn't running.

## 📁 Project Structure

```
talentiq-ai/
├── frontend/
│   ├── src/
│   │   ├── components/     # Sidebar, Header, AppLayout, KpiCard, ScoreRing
│   │   ├── pages/           # Login, Dashboard, Candidates, ResumeAI, AIRecruiter, Analytics, Reports, Settings
│   │   ├── data/             # Candidate data (built from a real resume)
│   │   ├── services/        # Axios API client
│   │   └── utils/            # Client-side report/CSV download helpers
│   └── vite.config.js
└── backend/
    ├── routes/               # /chat, /resume, /analytics, /report, /upload
    ├── middleware/           # Multer file upload config
    ├── utils/                 # Resume parsing + ATS scoring logic
    └── server.js
```

## 📦 Deployment

- **Frontend → Vercel:** import the repo, set root directory to `frontend`, framework preset `Vite` (auto-detected).
- **Backend → Render / Railway:** import the repo, set root directory to `backend`, build command `npm install`, start command `npm start`, add a `PORT` env var.
- After both are live, update the API base URL in `frontend/src/services/api.js` (or set a `VITE_API_URL` env var) to point at your deployed backend, and update the links at the top of this README.

## 👤 About

Built by **Disha Dinesh Poojary** — B.E. Information Science & Engineering, MITE.
[GitHub](https://github.com/Dishadinesh85) · [LinkedIn](https://www.linkedin.com/in/disha-poojary-077a1b293)

## 📄 License

MIT — free to use and adapt.

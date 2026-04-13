# ValleyNXT – AI Deal Intelligence Platform

A production-grade POC for AI-powered startup evaluation, built for venture capital and accelerator firms.

---

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Add your Anthropic API key to .env
npm install
npm run dev
# Runs on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
valleynxt/
├── backend/
│   ├── server.js             # Express API + Anthropic SDK
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx   # Navigation sidebar
    │   │   ├── Topbar.jsx    # Top header bar
    │   │   ├── ScoreCard.jsx # Score display card
    │   │   ├── RiskBadge.jsx # Colored risk indicator
    │   │   └── InsightCard.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── EvaluatePage.jsx
    │   │   └── ResultsPage.jsx
    │   ├── services/
    │   │   └── api.js        # API service layer
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## Environment Variables

### Backend (`backend/.env`)
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3001
```

### Frontend (`frontend/.env`) — optional for custom API URL
```
VITE_API_URL=http://localhost:3001
```

---

## Deploying to Vercel

### Frontend
1. Push `frontend/` to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add env var: `VITE_API_URL=https://your-backend-url.com`

### Backend
Deploy to **Railway**, **Render**, or **Fly.io**:
```bash
# Railway
railway login
railway init
railway up
railway variables set ANTHROPIC_API_KEY=your_key_here
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| AI | Anthropic Claude (claude-opus-4-5) |
| Fonts | Syne + DM Sans |

---

## Features

- **AI Evaluation** — Claude-powered VC-grade startup analysis
- **Score Cards** — Innovation, Market Potential, Scalability (0–10)
- **Risk Assessment** — Low / Medium / High with color badges
- **Investment Thesis** — Funding recommendation + VC-style summary
- **Demo Mode** — Pre-filled MediSync AI sample startup
- **Animated Loading** — Step-by-step progress during evaluation
- **Sentiment Signal** — Strong Buy / Watchlist / Pass verdict

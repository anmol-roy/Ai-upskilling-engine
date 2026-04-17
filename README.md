# AI Interview Prep

An AI-powered interview preparation platform that analyzes your resume and a job description to generate a personalized interview strategy — including tailored questions, skill gap analysis, a day-by-day prep plan, and an ATS-optimized resume PDF.

Built with React, Node.js/Express, MongoDB, and Google Gemini AI.

---

## Features

- Upload your resume (PDF) or write a quick self-description
- Paste any job description and get a full interview report in ~30 seconds
- AI-generated technical questions (8–10) with answers and interviewer intent
- Behavioral questions (5–6) in STAR format, grounded in your own experience
- Skill gap analysis with severity ratings and actionable recommendations
- 7–14 day personalized preparation plan with daily tasks and real resources
- Resume match score (0–100) calibrated against the job requirements
- One-click ATS-optimized resume PDF generation tailored to the job
- JWT-based auth with httpOnly cookies and token blacklisting on logout
- Full history of past interview reports

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 19, React Router 7, Axios, SCSS, Vite     |
| Backend  | Node.js, Express 5, Mongoose, Multer, pdf-parse |
| AI       | Google Gemini 2.0 Flash (`@google/genai`)        |
| PDF Gen  | Puppeteer                                       |
| Auth     | JWT, bcryptjs, cookie-parser                    |
| Database | MongoDB                                         |
| Validation | Zod + zod-to-json-schema                      |

---

## Project Structure

```
├── client/               # React frontend (Vite)
│   └── src/
│       ├── features/
│       │   ├── auth/     # Login, Register, Protected route
│       │   └── interview/# Home (generate), Interview (report view)
│       └── style/
└── server/               # Express backend
    └── src/
        ├── controllers/  # auth, interview
        ├── middlewares/  # JWT auth, file upload
        ├── models/       # User, InterviewReport, Blacklist
        ├── routes/
        ├── services/     # ai.service.js (Gemini + Puppeteer)
        └── config/       # MongoDB connection
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Gemini API key — get one at [aistudio.google.com](https://aistudio.google.com)

### 1. Clone the repo

```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ai-interview-prep
JWT_SECRET=your_jwt_secret_here
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

Start the server:

```bash
npm run dev
```

### 3. Set up the client

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to `http://localhost:3000`.

---

## API Overview

### Auth — `/api/auth`

| Method | Endpoint    | Description              | Auth |
|--------|-------------|--------------------------|------|
| POST   | `/register` | Create a new account     | No   |
| POST   | `/login`    | Login and set JWT cookie | No   |
| POST   | `/logout`   | Invalidate token         | Yes  |
| GET    | `/me`       | Get current user         | Yes  |

### Interview — `/api/interview`

| Method | Endpoint                          | Description                        | Auth |
|--------|-----------------------------------|------------------------------------|------|
| POST   | `/generate`                       | Generate interview report (+ PDF resume upload) | Yes |
| GET    | `/reports`                        | Get all reports for current user   | Yes  |
| GET    | `/reports/:interviewId`           | Get a single report by ID          | Yes  |
| GET    | `/reports/:interviewReportId/resume-pdf` | Download ATS-optimized resume PDF | Yes |

---

## Environment Variables

| Variable             | Description                        |
|----------------------|------------------------------------|
| `PORT`               | Server port (default: 3000)        |
| `MONGO_URI`          | MongoDB connection string          |
| `JWT_SECRET`         | Secret key for signing JWT tokens  |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key            |

---

## License

MIT

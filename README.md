# Novara - AI-Powered Placement Preparation Ecosystem

Novara is an advanced, gamified web application designed to guide candidates through their interview preparation journey. By combining resume ATS analysis, dynamic roadmaps, study checklist planners, career coaching chatbots, and voice/text mock interview simulations, Novara provides a comprehensive, personalized preparation cockpit.

---

## 🎨 Visual Identity & Theme
Novara uses a premium **Sleek Dark Mode / Indigo-Violet-Orange design** with custom glassmorphism components, HSL gradients, and responsive layout styling.

---

## 🛠 Tech Stack
- **Frontend**: React.js SPA, Redux Toolkit, TailwindCSS, Bootstrap Icons, Axios.
- **Backend**: Node.js, Express.js REST API server.
- **Database**: MongoDB & Mongoose ODM.
- **Orchestration**: Google Gemini AI model API (`@google/generative-ai`) for real-time evaluations, text parsers, roadmap generation, and question creation.

---

## 📦 Core Modules & Documentation
Detailed architectural descriptions, workflows, components, and code listings for each module are documented below:

1. 🔐 **[Authentication & Profile Management](file:///d:/UI%20development-NSRIT/Novara/docs/auth_module.md)**
   * Secure registrations (student/admin roles), password encryption via bcryptjs, JWT token-based path securing, and automated email verification using Nodemailer.
2. 🚀 **[Dashboard & Navigation Systems](file:///d:/UI%20development-NSRIT/Novara/docs/dashboard_module.md)**
   * Main candidate cockpit displaying gamified metrics (XP Level, Streaks, Study Hours) and responsive brand navigation headers.
3. 📄 **[Resume Intelligence & ATS Scoring](file:///d:/UI%20development-NSRIT/Novara/docs/resume_intelligence_module.md)**
   * PDF resume parser extracting skill arrays, calculating ATS compatibility, and highlighting target job discrepancies.
4. 🎙️ **[AI Mock Interview Simulator](file:///d:/UI%20development-NSRIT/Novara/docs/mock_interview_module.md)**
   * Real-time technical/behavioral mock tests generating dynamic follow-up questions and comprehensive grade feedback sheets.
5. 🧠 **[AI Prep Hub & Quiz sessions](file:///d:/UI%20development-NSRIT/Novara/docs/prep_hub_module.md)**
   * Dynamic roadmap builder generating syllabus topics, checklist milestones, and mock test quizzes.
6. 📅 **[Study Planner & Milestone Tracker](file:///d:/UI%20development-NSRIT/Novara/docs/study_planner_module.md)**
   * Weekly preparation schedulers integrated with real-time countdown clocks tracking upcoming milestones.
7. 🏆 **[Gamification, Streaks & Leaderboards](file:///d:/UI%20development-NSRIT/Novara/docs/gamification_module.md)**
   * Level formulas, XP gain mechanics, daily login streak trackers, and global top-10 candidate leaderboards.

---


## ⚙️ Getting Started & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or on MongoDB Atlas cloud

### 1. Server Configuration
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` configuration file inside `server/` (see `server/.env.example` as a template):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/novara
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   
   # Optional: Email Verification Configuration
   EMAIL_USER=your_sender_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
4. Start the backend developer server:
   ```bash
   npm run dev
   ```

### 2. Client Configuration
1. Navigate to the `client/` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm start
   ```
4. The client will open in your browser at `http://localhost:3000/`.

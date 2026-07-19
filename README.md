# 🚀 Novara – AI-Powered Placement Preparation Platform

<div align="center">

![MERN](https://img.shields.io/badge/MERN-Full%20Stack-success?style=for-the-badge)
![React](https://img.shields.io/badge/React.js-Frontend-61DAFB?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Gemini AI](https://img.shields.io/badge/Google-Gemini%20AI-blue?style=for-the-badge)

### **Prepare • Practice • Perform**

### AI-Powered Placement Preparation Platform for Students

</div>

---

# 📖 Overview

**Novara** is an AI-powered placement preparation platform designed to help students prepare for technical interviews through a single, intelligent platform.

Instead of switching between multiple websites for resumes, aptitude, coding, interview preparation, and career guidance, Novara brings everything together into one seamless experience.

Powered by **Google Gemini AI**, Novara provides personalized learning, resume evaluation, AI mock interviews, company-specific preparation, progress tracking, and an AI career assistant to maximize placement success.

---

# 🎯 Problem Statement

Students preparing for placements often face challenges such as:

- Preparing from multiple platforms
- Lack of personalized guidance
- Weak resumes
- Limited mock interview experience
- No structured learning roadmap
- Difficulty tracking preparation progress
- Lack of company-specific preparation

Novara solves these problems by providing an integrated AI-powered preparation ecosystem.

---

# ✨ Key Features

## 🤖 AI Resume Analyzer

- ATS Score Analysis
- Resume Improvement Suggestions
- Grammar & Formatting Checks
- Keyword Optimization
- Skills Gap Analysis
- Section-wise Feedback

---

## 🎤 AI Mock Interviews

- HR Interview Simulation
- Technical Interview Simulation
- Behavioral Questions
- Real-time AI Feedback
- Communication Analysis
- Confidence Score
- Performance Report

---

## 📚 Personalized Learning Roadmap

- Skill Assessment
- Personalized Learning Plans
- Daily Study Goals
- Weekly Progress Tracking
- AI Recommendations
- Topic-wise Completion Status

---

## 💻 Coding Preparation Hub

Instead of hosting an online compiler, Novara intelligently recommends coding problems from trusted platforms.

Features include:

- AI-generated coding roadmap
- Topic-wise DSA preparation
- Easy / Medium / Hard questions
- LeetCode recommendations
- GeeksforGeeks recommendations
- Blind 75
- NeetCode Roadmap
- Company-wise coding questions

---

## 📖 Theory Preparation

- Operating Systems
- DBMS
- Computer Networks
- OOPs
- Java
- JavaScript
- React
- Node.js
- SQL
- Aptitude
- HR Questions

---

## 🏢 Company Preparation

Prepare specifically for companies like:

- Google
- Microsoft
- Amazon
- Adobe
- Infosys
- TCS
- Accenture
- Deloitte
- Cognizant
- Wipro
- Capgemini

Features:

- Interview Experiences
- Frequently Asked Questions
- Coding Patterns
- HR Questions
- Interview Tips

---

## 📊 Progress Dashboard

Track everything from one place.

- Resume Score
- Interview Scores
- Coding Progress
- Learning Progress
- Daily Streak
- Weekly Analytics
- Topic Completion
- Skill Growth

---

## 🤖 AI Career Assistant

Ask questions like:

- How should I prepare for Google?
- Review my resume.
- Generate interview questions.
- Explain DBMS concepts.
- Create a study plan.
- Suggest coding problems.
- Improve my LinkedIn profile.

---

# 👥 User Roles

## 👨‍🎓 Student

- Register/Login
- Complete Profile
- Upload Resume
- Access AI Features
- Practice Interviews
- View Progress
- Company Preparation
- Learning Roadmaps

---

## 👨‍💼 Admin

- Manage Users
- Manage Learning Content
- Manage Company Data
- View Analytics
- Monitor Platform Usage
- Manage Resources

---

# 🛠 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Bootstrap Icons
- Axios
- React Router

---

## Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt.js

---

## Database

- MongoDB
- Mongoose

---

## AI Integration

- Google Gemini API

Used for:

- Resume Analysis
- AI Career Assistant
- Interview Evaluation
- Personalized Learning Plans
- Question Generation

---

## Authentication

- JWT Authentication
- Password Hashing (bcrypt)
- Role-Based Access Control
- Protected Routes

---

# 🏗 System Architecture

```
                React Frontend
                      │
                      ▼
               Express REST API
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
 MongoDB         Gemini AI         Authentication
 Database           APIs             (JWT)
```

---

# 📂 Project Structure

```
Novara/

│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── assets/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── docs/
├── screenshots/
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/gnanadeep30805/Novara.git
```

---

## Navigate

```bash
cd Novara
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

## Configure Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
npm start
```

---

# 📸 Screenshots

> Add screenshots of the following pages:

- Landing Page
- Login
- Dashboard
- Resume Analyzer
- AI Mock Interview
- AI Career Assistant
- Coding Preparation
- Progress Dashboard

---

# 🚧 Future Enhancements

- Voice-based AI Interviews
- Video Interview Analysis
- AI Resume Builder
- AI Cover Letter Generator
- Placement Prediction
- LinkedIn Profile Review
- AI Job Recommendation
- Real-time Coding Interview Simulator
- Gamified Learning
- Mobile Application

---

# 📊 Project Highlights

- 🤖 AI-Powered Resume Analysis
- 🎤 AI Mock Interviews
- 📚 Personalized Learning Paths
- 💻 Coding Preparation
- 📖 Theory Preparation
- 🏢 Company-Specific Preparation
- 📈 Progress Tracking
- 🔒 Secure Authentication
- 📱 Responsive Design
- ⚡ MERN Stack Architecture

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It motivates further development and helps others discover the project.

---

# 👨‍💻 Author

**Gnana Deep**

🎓 CSE Student  
💻 MERN Stack Developer  
🤖 AI & Full Stack Enthusiast  
🚀 Passionate about Building Intelligent Applications

---

<div align="center">

## 🌟 Prepare Smarter. Practice Better. Perform Confidently.

**Novara empowers students with AI-driven guidance to transform placement preparation into a personalized, efficient, and successful journey.**

Made with ❤️ using MERN Stack & Google Gemini AI

</div>

# AI Prep Hub & Roadmap Generator Module

This module generates personalized company-specific preparation syllabus roadmaps, interactive coding challenge guides, and multiple-choice skill quizzes.

---

## 1. Workflow

1. **Request Roadmap**: The candidate selects a target company (e.g. Google, Amazon), role, and experience level, then clicks "Generate Roadmap".
2. **AI Syllabus Generation**: The backend requests Gemini to construct a structured roadmap layout containing sequential preparation topics (nodes), study guides, and estimated durations.
3. **Checklist Persistence**: The roadmap is saved in MongoDB. The candidate views interactive node cards and marks them complete as they progress.
4. **Quiz Generation**: Selecting a topic allows the candidate to trigger a quiz. The backend calls Gemini to generate custom multiple-choice questions for that topic.
5. **Interactive Quiz**: The candidate plays through the quiz. The system records scores and awards XP upon completion.

---

## 2. Components Involved

### Frontend
- **[PreparationHub.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Preparation/PreparationHub.jsx)**: Main hub for selecting targets, starting roadmap generations, and viewing existing study roadmaps.
- **[PreparationSession.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Preparation/PreparationSession.jsx)**: Displays roadmap nodes, checkboxes, study materials, and triggers quiz modules.
- **[QuizSession.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Preparation/QuizSession.jsx)**: Interactive quiz panel with multiple-choice options, immediate validation colors, and final scores.

### Backend
- **[preparationRoutes.js](file:///d:/UI%20development-NSRIT/Novara/server/src/routes/preparationRoutes.js)**: Configures API routes for roadmaps and quizzes.
- **[preparationController.js](file:///d:/UI%20development-NSRIT/Novara/server/src/controllers/preparationController.js)**: Orchestrates roadmap generation databases, checklist status toggles, and quiz answer verification.
- **[geminiService.js](file:///d:/UI%20development-NSRIT/Novara/server/src/services/geminiService.js)**: Dynamic generation handlers (`generateRoadmap` and `generateQuizQuestions`).
- **[PreparationSession.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/PreparationSession.js)**: Schema storing roadmap nodes, checklists, and progression status.
- **[Quiz.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/Quiz.js)** & **[Question.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/Question.js)**: DB models storing quiz questions, options, and scores.

---

## 3. Working in the Code

### Roadmap Generation Schema Enforcer
Inside `server/src/services/geminiService.js`, the AI prompt constraints dictate a strict array structure:
```javascript
export const generateRoadmap = async (company, role, experienceLevel) => {
    const prompt = `
    Create a highly personalized interview preparation roadmap for:
    Company: ${company}
    Role: ${role}
    Experience Level: ${experienceLevel}
    
    Return a JSON array where each object has:
    - id (unique string)
    - title (e.g. "Data Structures")
    - description (focus points)
    - resources (array of topics to study)
    - duration (e.g. "3 Days")
    `;
    const response = await callGeminiJSON(prompt);
    return response;
};
```

### Quiz Questions Creator
Similarly, when a candidate takes a quiz, questions are created on-the-fly:
```javascript
export const generateQuizQuestions = async (topic, count = 5) => {
    const prompt = `
    Generate ${count} multiple choice questions on the topic: ${topic}.
    Each question must have:
    - questionText
    - options (array of 4 options)
    - correctAnswer (string matching exactly one of the options)
    - explanation (short explanation)
    
    Format the response as a strict JSON array.
    `;
    return await callGeminiJSON(prompt);
};
```
The client receives these questions, allows option selections, and checks correctness client-side and server-side.

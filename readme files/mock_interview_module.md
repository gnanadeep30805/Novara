# AI Mock Interview Simulator Module

This module simulates real-time coding, technical, and behavioral job interviews. It dynamically generates questions based on target roles, collects responses, and provides comprehensive grading reports.

---

## 1. Workflow

1. **Configure Interview**: The candidate specifies a target role, company, number of questions, and interview type (`technical`, `behavioral`, `coding`, or `mixed`).
2. **Session Start**: The backend initializes an `Interview` DB record and calls Gemini to generate the first question.
3. **Turn-by-turn Session**: 
   - The client renders the active question.
   - The candidate types (or speaks) their response and clicks submit.
   - The backend records the answer, calls Gemini to evaluate the answer, and generates the next question. This loop repeats for the configured question count.
4. **Grading & Evaluation**: Upon completion, the backend passes the entire transcript to Gemini for overall evaluation.
5. **Results Display**: The frontend displays granular scores (behavioral, technical, coding logic), general feedback, transcript comparisons, and model answers.

---

## 2. Components Involved

### Frontend
- **[CreateInterview.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Interview/CreateInterview.jsx)**: Form configuring interview types and question limits.
- **[InterviewSession.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Interview/InterviewSession.jsx)**: Immersive chat interface with question timelines, active text/voice inputs, and progress indicators.
- **[InterviewResult.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Interview/InterviewResult.jsx)**: Evaluation dashboard showing category scores, transcript timelines, and AI recommendations.
- **[InterviewHistory.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Interview/InterviewHistory.jsx)**: Timeline tracking past sessions.
- **[interviewService.js](file:///d:/UI%20development-NSRIT/Novara/client/src/services/interviewService.js)**: Redux bindings communicating with backend endpoints.

### Backend
- **[interviewRoutes.js](file:///d:/UI%20development-NSRIT/Novara/server/src/routes/interviewRoutes.js)**: Configures endpoints for creating sessions, submitting answers, and fetching logs.
- **[interviewController.js](file:///d:/UI%20development-NSRIT/Novara/server/src/controllers/interviewController.js)**: Controls session progression state machines, answer logging, and coordinates evaluation service tasks.
- **[geminiService.js](file:///d:/UI%20development-NSRIT/Novara/server/src/services/geminiService.js)**: Dynamic prompt generation pipelines (`generateInterviewQuestion` and `evaluateInterview`).
- **[Interview.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/Interview.js)**: MongoDB schema storing transcript arrays, metrics, and grading summaries.

---

## 3. Working in the Code

### Dynamic Question Generation
Inside `server/src/services/geminiService.js`, the `generateInterviewQuestion` function uses candidate context to draft custom questions:
```javascript
export const generateInterviewQuestion = async (role, type, pastQuestions = [], pastAnswers = []) => {
    const prompt = `
    You are an expert interviewer. Generate the next question for a ${type} interview for the role of ${role}.
    Past questions: ${JSON.stringify(pastQuestions)}
    Past answers: ${JSON.stringify(pastAnswers)}
    
    Ensure the question is natural, challenging, and follows up on previous responses if appropriate.
    `;
    const response = await callGeminiModel(prompt);
    return response.text;
};
```

### Cumulative Grading
Upon session completion, `evaluateInterview` analyzes the transcript:
```javascript
export const evaluateInterview = async (transcript) => {
    const prompt = `
    Analyze the following interview transcript:
    ${JSON.stringify(transcript)}
    
    Evaluate the candidate on a scale of 0-100 and provide scores for:
    - overallScore
    - technicalScore
    - behavioralScore
    - codingLogicScore
    - keyFeedback (array of suggestions)
    - modelAnswers (array matching transcript questions)
    
    Return the result strictly as a valid JSON object.
    `;
    const evaluation = await callGeminiJSON(prompt);
    return evaluation;
};
```
The result is saved in the `Interview` document and retrieved by the client's `InterviewResult.jsx` component.

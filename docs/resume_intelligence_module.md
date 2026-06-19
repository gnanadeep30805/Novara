# Resume Intelligence Module

This module enables candidates to upload resume PDFs for parsing, ATS match percentage calculations, skill extraction, and job alignment gap reviews.

---

## 1. Workflow

1. **Upload Trigger**: The candidate selects a target career role and company, then drops a PDF resume file.
2. **Multer File Validation**: The frontend POSTs a multipart form. The backend's `uploadMiddleware.js` verifies the `.pdf` extension and writes the file locally to `server/uploads/resumes/`.
3. **PDF Text Extraction**: The backend service reads the file buffer and executes `pdf-parse` to extract the raw text.
4. **AI Parsing & ATS Scoring**: The raw text, along with the target role and company target description, is submitted to the Gemini API (`geminiService.js`).
5. **JSON Structuring**: Gemini returns structured data containing the ATS score, extracted skills, projects, and feedback.
6. **Data Storage**: The analysis is persisted in MongoDB (linked to the candidate's User ID). The frontend displays the ATS gauge, feedback list, and missing skill badges.

---

## 2. Components Involved

### Frontend
- **[ResumeIntelligence.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Resume/ResumeIntelligence.jsx)**: Upload dashboard with interactive drop zones, file upload progress, ATS radial gauges, and history timeline.
- **[resumeService.js](file:///d:/UI%20development-NSRIT/Novara/client/src/services/resumeService.js)**: Redux slice integrations and API client handlers.

### Backend
- **[resumeRoutes.js](file:///d:/UI%20development-NSRIT/Novara/server/src/routes/resumeRoutes.js)**: Configures upload and history endpoints.
- **[resumeController.js](file:///d:/UI%20development-NSRIT/Novara/server/src/controllers/resumeController.js)**: Handles requests and coordinates service calls.
- **[uploadMiddleware.js](file:///d:/UI%20development-NSRIT/Novara/server/src/middleware/uploadMiddleware.js)**: Multer disk storage and file mime-type checking.
- **[resumeService.js](file:///d:/UI%20development-NSRIT/Novara/server/src/services/resumeService.js)**: Coordinates PDF text extraction via `pdf-parse` and updates MongoDB.
- **[geminiService.js](file:///d:/UI%20development-NSRIT/Novara/server/src/services/geminiService.js)**: Prompt engineering wrapper querying Google Gemini model.
- **[Resume.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/Resume.js)**: MongoDB schema storing ATS feedback and skill sets.

---

## 3. Working in the Code

### PDF Processing
Inside `server/src/services/resumeService.js`, the PDF file buffer is parsed into string text:
```javascript
import { PDFParse } from "pdf-parse";

const dataBuffer = fs.readFileSync(file.path);
const parser = new PDFParse({ data: dataBuffer });
const pdfData = await parser.getText();
const resumeText = pdfData.text;
```

### Gemini Prompt Structure
Inside `server/src/services/geminiService.js`, the prompt structures Gemini to analyze text and return a strict JSON payload:
```javascript
const prompt = `
You are an expert ATS (Applicant Tracking System) parser. Analyze this resume text...
Target Role: ${targetRole}
Job Description: ${targetDescription}

Return details strictly in this JSON format:
{
  "atsScore": 75,
  "extractedSkills": ["React", "Node.js"],
  "extractedProjects": ["E-Commerce Site"],
  "missingSkills": ["Docker", "TypeScript"],
  "feedback": "Add projects showing containerization."
}
`;
```
The response is parsed and saved to the Database, updating the user's overall average ATS score.

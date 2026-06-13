# AI Resume Analyzer

Next.js application that analyzes a resume against a target role or job description and returns structured feedback for role fit, skills, gaps, and resume health.

This is a recruiter-facing AI product workflow: upload a PDF resume, parse its content, send it through an LLM analysis route, and render the output in a dashboard.

## What It Does

- Accepts PDF resume uploads
- Extracts resume text with server-side PDF parsing
- Uses an OpenAI-backed API route for analysis
- Compares resume content against a selected role/job description
- Displays score cards, section-level feedback, resume health, strengths, gaps, and improvement suggestions

## Architecture

```text
Next.js UI
  -> resume upload component
  -> API route
  -> PDF parsing
  -> OpenAI analysis
  -> structured JSON response
  -> dashboard components
```

## Key Files

```text
src/app/api/analyze/route.js       Server-side analysis route
src/components/UploadResume.jsx    Resume upload workflow
src/components/ResultDashboard.jsx Analysis dashboard
src/components/ScoreCard.jsx       Role-fit scoring UI
src/components/ResumeHealth.jsx    Resume quality feedback
```

## Tech Stack

Next.js, React, JavaScript, OpenAI API, pdf-parse, Tailwind-style component layout, lucide-react icons.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
cp .env.example .env.local
```

3. Add your API key:

```env
OPENAI_API_KEY=your_key_here
```

4. Start the app:

```bash
npm run dev
```

## Recruiter Notes

This repo shows AI product engineering: file ingestion, server-side model calls, structured output, and a dashboard that turns model responses into usable decision support.

## Next Improvements

- Add sample anonymized resumes and expected outputs
- Add JSON schema validation for the model response
- Add deploy link and screenshots

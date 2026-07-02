import express from "express";

const router = express.Router();

const QUESTION_BANKS = {
  hr: [
    "Tell me about yourself and what draws you to a Data Analyst role.",
    "Describe a time you had to explain a technical finding to a non-technical stakeholder.",
    "Why do you want to work in data analytics rather than pure software engineering?",
    "How do you prioritize tasks when handling multiple analytics requests at once?",
    "Where do you see your analytics career in three years?",
  ],
  technical: [
    "Walk me through how you would clean a messy dataset with missing values in pandas.",
    "Write a SQL query to find the second-highest salary in an Employees table.",
    "How do you decide between a bar chart, line chart, and heatmap for a given dataset?",
    "Explain the difference between correlation and causation with an example.",
    "How would you detect and handle outliers in a sales dataset?",
  ],
  behavioral: [
    "Tell me about a time your analysis changed a business decision.",
    "Describe a project where your initial hypothesis was wrong. What did you do?",
    "How do you handle disagreement with a teammate about which metric matters most?",
    "Tell me about a time you had a tight deadline for a data deliverable.",
    "Describe how you stay organized across multiple analytics projects.",
  ],
  data_analyst: [
    "Explain how you would build a hiring funnel dashboard from raw applicant data.",
    "What KPIs would you track to measure recruiter productivity?",
    "How would you calculate month-over-month growth in applications using SQL?",
    "Describe how you'd design a Power BI report for a non-technical HR team.",
    "How do you validate that a dashboard's numbers are accurate before sharing it?",
  ],
  custom: [
    "Tell me about your most impactful data analytics project.",
    "What tools do you use most often, and why?",
    "How do you approach a completely new dataset?",
    "What's a business metric you're passionate about improving?",
    "How do you communicate uncertainty in your analysis?",
  ],
};

function scoreAnswer(answer = "") {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const length = words.length;

  // Lightweight heuristic scoring — swap for an LLM call (OpenAI/Groq) when
  // process.env.OPENAI_API_KEY is configured.
  const keywordHits = ["sql", "python", "data", "dashboard", "insight", "analysis", "power bi", "excel"]
    .filter((k) => answer.toLowerCase().includes(k)).length;

  const technical = Math.min(100, 40 + keywordHits * 10 + Math.min(length, 40));
  const communication = Math.min(100, 50 + Math.min(length, 50));
  const problemSolving = Math.min(100, 45 + keywordHits * 8 + Math.min(length, 30));
  const confidence = length > 15 ? 78 : length > 5 ? 60 : 40;

  return { technical, communication, problemSolving, confidence };
}

router.post("/interview", (req, res) => {
  const { mode = "custom", questionIndex = 0, answer } = req.body;
  const bank = QUESTION_BANKS[mode] || QUESTION_BANKS.custom;

  let feedback = null;
  let scores = null;
  if (typeof answer === "string" && answer.trim().length > 0) {
    scores = scoreAnswer(answer);
    feedback = scores.technical > 70
      ? "Strong, specific answer — good use of concrete tools and metrics."
      : "Solid start. Try adding a concrete example with numbers or tools used.";
  }

  const nextIndex = questionIndex;
  const isComplete = nextIndex >= bank.length;

  res.json({
    mode,
    questionNumber: Math.min(nextIndex + 1, bank.length),
    totalQuestions: bank.length,
    question: isComplete ? null : bank[nextIndex],
    progress: Math.round((nextIndex / bank.length) * 100),
    isComplete,
    feedback,
    scores,
  });
});

router.post("/interview/report", (req, res) => {
  const { transcript = [] } = req.body;

  const avg = (key) =>
    transcript.length
      ? Math.round(transcript.reduce((sum, t) => sum + (t.scores?.[key] || 0), 0) / transcript.length)
      : 0;

  const technicalScore = avg("technical");
  const communicationScore = avg("communication");
  const problemSolvingScore = avg("problemSolving");
  const confidenceScore = avg("confidence");
  const overallScore = Math.round(
    (technicalScore + communicationScore + problemSolvingScore + confidenceScore) / 4
  );

  const recommendation =
    overallScore >= 75 ? "Hire" : overallScore >= 55 ? "Hold" : "Reject";

  res.json({
    technicalScore,
    communicationScore,
    problemSolvingScore,
    confidenceScore,
    overallScore,
    recommendation,
  });
});

export default router;

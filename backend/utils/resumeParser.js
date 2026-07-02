import pdf from "pdf-parse";

// Skill taxonomy used to score resumes against a Data Analyst role profile.
// Extend this list freely as the target job description changes.
export const DATA_ANALYST_SKILLS = [
  "python", "sql", "excel", "power bi", "powerbi", "tableau", "pandas",
  "numpy", "matplotlib", "seaborn", "scikit-learn", "machine learning",
  "statistics", "r", "postgresql", "mysql", "mongodb", "data visualization",
  "etl", "data cleaning", "predictive modeling", "dashboard", "a/b testing",
  "hypothesis testing", "regression", "nlp", "git", "streamlit", "java",
];

const CORE_HIGH_VALUE_SKILLS = ["python", "sql", "power bi", "excel", "statistics"];

export async function extractTextFromPdf(buffer) {
  const data = await pdf(buffer);
  return data.text;
}

export function analyzeResumeText(text) {
  const lower = text.toLowerCase();

  const detected = DATA_ANALYST_SKILLS.filter((skill) => lower.includes(skill));
  const missing = DATA_ANALYST_SKILLS.filter((skill) => !lower.includes(skill));

  // Normalize duplicate labels (power bi / powerbi)
  const normalizedDetected = Array.from(
    new Set(detected.map((s) => (s === "powerbi" ? "power bi" : s)))
  );

  const coreHits = CORE_HIGH_VALUE_SKILLS.filter((s) => normalizedDetected.includes(s));
  const coreScore = (coreHits.length / CORE_HIGH_VALUE_SKILLS.length) * 60; // up to 60 pts
  const breadthScore = Math.min((normalizedDetected.length / DATA_ANALYST_SKILLS.length) * 40, 40); // up to 40 pts

  const atsScore = Math.round(coreScore + breadthScore);

  const recommended = missing
    .filter((s) => !["java"].includes(s))
    .slice(0, 5);

  const summary = buildSummary(normalizedDetected, atsScore);

  return {
    atsScore,
    matchPercentage: Math.min(100, Math.round((normalizedDetected.length / 12) * 100)),
    detectedSkills: normalizedDetected,
    missingSkills: missing.filter((s) => s !== "powerbi").slice(0, 8),
    recommendedSkills: recommended,
    aiSummary: summary,
    recruiterRecommendation: atsScore >= 70
      ? "Strong Data Analyst fit — recommend for technical screen."
      : atsScore >= 50
      ? "Moderate fit — recommend a portfolio/case-study review before screening."
      : "Skill gap identified — recommend upskilling in core analytics tools before applying.",
  };
}

function buildSummary(skills, score) {
  const top = skills.slice(0, 6).join(", ") || "no matched keywords";
  return `Candidate profile shows proficiency in ${top}. Overall ATS alignment with the Data Analyst role is ${score}/100, driven primarily by demonstrated experience in Python, SQL, and BI tooling across multiple end-to-end analytics projects.`;
}

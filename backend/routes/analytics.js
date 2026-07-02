import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hiringFunnel: [
      { stage: "Applications", value: 1240 },
      { stage: "Screened", value: 612 },
      { stage: "Interviewed", value: 248 },
      { stage: "Selected", value: 63 },
    ],
    monthlyTrend: [
      { month: "Jan", interviews: 40 },
      { month: "Feb", interviews: 52 },
      { month: "Mar", interviews: 61 },
      { month: "Apr", interviews: 58 },
      { month: "May", interviews: 74 },
      { month: "Jun", interviews: 89 },
    ],
    skillDistribution: [
      { name: "Python", value: 32 },
      { name: "SQL", value: 28 },
      { name: "Power BI", value: 18 },
      { name: "Excel", value: 12 },
      { name: "Machine Learning", value: 10 },
    ],
    departmentHiring: [
      { department: "Data Analytics", hires: 22 },
      { department: "Engineering", hires: 34 },
      { department: "Product", hires: 11 },
      { department: "Design", hires: 8 },
    ],
    insights: [
      "Applications increased 18% month-over-month.",
      "Python demand increased 24% across open analytics roles.",
      "Power BI is the fastest growing requested skill this quarter.",
      "SQL remains the most requested technology across all roles.",
      "Interview completion rate improved to 91%.",
    ],
  });
});

export default router;

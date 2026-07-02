// Flagship candidate profile — built directly from Disha's resume so the
// platform doubles as a live portfolio piece during interviews.
export const featuredCandidate = {
  id: "cand-001",
  name: "Disha Dinesh Poojary",
  role: "Data Analyst",
  availability: "Immediate",
  email: "dishapoojary85@gmail.com",
  phone: "+91-7019222926",
  location: "Karnataka, India",
  education: "B.E. Information Science & Engineering, MITE (Expected 2027)",
  cgpa: "8.2",
  experience: "Project-based — 5 end-to-end analytics & AI builds",
  links: {
    github: "https://github.com/Dishadinesh85",
    linkedin: "https://www.linkedin.com/in/disha-poojary-077a1b293",
    portfolio: "https://talent-iq-ai-recruitment-platform.vercel.app/",
  },
  skills: [
    "Python", "SQL", "Excel", "Power BI", "Pandas", "NumPy",
    "Matplotlib", "Scikit-learn", "Machine Learning", "MySQL",
    "PostgreSQL", "Java", "Git", "Streamlit",
  ],
  atsScore: 88,
  matchPercentage: 91,
  projects: [
    {
      name: "TalentIQ AI — Recruitment Intelligence Platform",
      stack: "React • Node.js • PostgreSQL • Python",
      description:
        "AI-powered recruitment platform with resume screening, interview scoring, candidate ranking, and hiring analytics dashboards.",
      links: {
        live: "https://talent-iq-ai-recruitment-platform.vercel.app/",
        github: "https://github.com/Dishadinesh85/TalentIQ-AI-Recruitment-Platform",
      },
    },
    {
      name: "Retail Sales Analytics & Demand Prediction Dashboard",
      stack: "Python • SQL • Power BI",
      description:
        "Analyzed retail sales data to uncover customer and product trends; built Power BI dashboards and a demand prediction model.",
    },
    {
      name: "SHEild — AI-Powered Offline Personal Safety Companion",
      stack: "TensorFlow Lite • Android • Sensor Fusion",
      description:
        "Offline AI safety system using smartphone sensors and voice detection, with automated SOS alerts via context-aware risk detection.",
    },
    {
      name: "AI-Powered Pre-Send Text Moderation System",
      stack: "Python • Flask • NLP",
      description:
        "NLP-based moderation system using TF-IDF and ML to generate real-time toxicity scores for abusive, multilingual text.",
    },
    {
      name: "AnalyticsHub — Full-Stack Data Analytics Portfolio",
      stack: "React • Node.js • PostgreSQL • Tailwind CSS",
      description:
        "Full-stack platform showcasing analytics/ML projects with authentication, project management, and responsive dashboards.",
    },
  ],
  certifications: [
    "Statistics with R — Coursera / Infosys Springboard",
    "Front-End Web Development — Coursera / Infosys Springboard",
    "Introduction to Entrepreneurial Thinking — NEP-IUCEE",
    "Power BI Bootcamp — University of Delhi",
    "Oracle AI Coding with Natural Language",
    "Embedded Systems Design & Arduino — Tinkercad",
  ],
};

// Supporting candidates so the ranking/table views don't look empty.
export const candidateList = [
  { ...featuredCandidate, rank: 1, atsScore: 88, interviewScore: 92, status: "Selected" },
  {
    id: "cand-002", rank: 2, name: "Aarav Mehta", role: "Data Analyst",
    atsScore: 81, interviewScore: 78, status: "Interview",
  },
  {
    id: "cand-003", rank: 3, name: "Neha Sharma", role: "Business Analyst",
    atsScore: 74, interviewScore: 70, status: "Interview",
  },
  {
    id: "cand-004", rank: 4, name: "Rohan Iyer", role: "Data Analyst",
    atsScore: 66, interviewScore: 0, status: "Pending",
  },
  {
    id: "cand-005", rank: 5, name: "Kavya Reddy", role: "BI Developer",
    atsScore: 58, interviewScore: 40, status: "Rejected",
  },
];

export const interviewModes = [
  { id: "hr", label: "HR Interview" },
  { id: "technical", label: "Technical Interview" },
  { id: "behavioral", label: "Behavioral Interview" },
  { id: "data_analyst", label: "Data Analyst Interview" },
  { id: "custom", label: "Custom Interview" },
];

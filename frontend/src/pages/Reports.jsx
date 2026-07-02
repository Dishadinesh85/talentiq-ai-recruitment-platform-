import { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiFileText, FiGrid, FiCheck } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import { downloadTextFile, toCsv } from "../utils/download";
import { candidateList, featuredCandidate } from "../data/candidateData";

export default function Reports() {
  const [justGenerated, setJustGenerated] = useState(null);

  const flash = (key, fileName) => {
    setJustGenerated(key);
    setTimeout(() => setJustGenerated(null), 2000);
    alert(`Report generated and downloaded: ${fileName}\n\nCheck your browser's Downloads folder.`);
  };

  const generateInterviewReport = () => {
    const content = [
      "TALENTIQ AI — INTERVIEW REPORT",
      "================================",
      `Candidate: ${featuredCandidate.name}`,
      `Role: ${featuredCandidate.role}`,
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "Scores",
      "------",
      "Technical Score: 88/100",
      "Communication Score: 84/100",
      "Problem Solving Score: 86/100",
      "Overall Score: 86/100",
      "Recommendation: Hire",
    ].join("\n");
    downloadTextFile("interview-report.txt", content);
    flash("interview", "interview-report.txt");
  };

  const generateResumeReport = () => {
    const content = [
      "TALENTIQ AI — RESUME REPORT",
      "============================",
      `Candidate: ${featuredCandidate.name}`,
      `ATS Score: ${featuredCandidate.atsScore}/100`,
      `Role Match: ${featuredCandidate.matchPercentage}%`,
      "",
      "Detected Skills:",
      featuredCandidate.skills.join(", "),
      "",
      "Projects:",
      ...featuredCandidate.projects.map((p) => `- ${p.name} (${p.stack})`),
    ].join("\n");
    downloadTextFile("resume-report.txt", content);
    flash("resume", "resume-report.txt");
  };

  const generateAtsReport = () => {
    const csv = toCsv(
      candidateList.map((c) => ({
        rank: c.rank, name: c.name, role: c.role,
        atsScore: c.atsScore, interviewScore: c.interviewScore, status: c.status,
      }))
    );
    downloadTextFile("ats-report.csv", csv, "text/csv");
    flash("ats", "ats-report.csv");
  };

  const generateCsvExport = () => {
    const csv = toCsv(candidateList);
    downloadTextFile("candidates-export.csv", csv, "text/csv");
    flash("csv", "candidates-export.csv");
  };

  const REPORTS = [
    { key: "interview", title: "Interview Report", desc: "Full scoring breakdown from the latest AI interview.", icon: FiFileText, action: generateInterviewReport },
    { key: "resume", title: "Resume Report", desc: "ATS score, matched skills, and project summary.", icon: FiFileText, action: generateResumeReport },
    { key: "ats", title: "ATS Report", desc: "Aggregate ATS scoring across all screened candidates.", icon: FiDownload, action: generateAtsReport },
    { key: "csv", title: "CSV Export", desc: "Raw candidate data for offline analysis.", icon: FiGrid, action: generateCsvExport },
  ];

  return (
    <AppLayout title="Reports" subtitle="Generate and export recruitment reports">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {REPORTS.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card"
            style={{ padding: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(37,99,235,.14)", display: "grid", placeItems: "center" }}>
                <r.icon size={19} color="var(--accent-blue)" />
              </div>
              <div>
                <h4 style={{ fontSize: 14.5 }}>{r.title}</h4>
                <p style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 4, maxWidth: 260 }}>{r.desc}</p>
              </div>
            </div>
            <motion.button whileTap={{ scale: 0.96 }} onClick={r.action} className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 108, justifyContent: "center" }}>
              {justGenerated === r.key ? (<><FiCheck size={14} color="var(--success)" /> Done</>) : "Generate"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}

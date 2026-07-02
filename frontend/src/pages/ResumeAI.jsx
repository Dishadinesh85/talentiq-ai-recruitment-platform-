import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FiUploadCloud, FiFileText, FiDownload } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import ScoreRing from "../components/ScoreRing";
import { uploadResume } from "../services/api";
import { downloadTextFile } from "../utils/download";
import { featuredCandidate } from "../data/candidateData";

export default function ResumeAI() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((accepted) => {
    if (!accepted?.length) return;
    setFile(accepted[0]);
    setResult(null);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const runAnalysis = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await uploadResume(file);
      setResult(data);
    } catch (e) {
      // Backend not running locally — fall back to the flagship candidate's
      // pre-computed analysis so the UI still demos end to end.
      setResult({
        fileName: file.name,
        atsScore: featuredCandidate.atsScore,
        matchPercentage: featuredCandidate.matchPercentage,
        detectedSkills: featuredCandidate.skills.map((s) => s.toLowerCase()),
        missingSkills: ["tableau", "a/b testing", "hypothesis testing"],
        recommendedSkills: ["tableau", "hypothesis testing", "etl"],
        aiSummary:
          "Candidate shows strong proficiency in Python, SQL, and BI tooling across multiple end-to-end analytics projects.",
        recruiterRecommendation: "Strong Data Analyst fit — recommend for technical screen.",
      });
      setError("Backend not reachable — showing a demo analysis instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Resume AI" subtitle="Upload a resume for instant ATS scoring and skill analysis">
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <div
            {...getRootProps()}
            style={{
              border: `2px dashed ${isDragActive ? "var(--accent-blue)" : "var(--border)"}`,
              borderRadius: 18, padding: "40px 20px", textAlign: "center",
              background: isDragActive ? "rgba(37,99,235,.06)" : "transparent",
              cursor: "pointer", transition: "all .2s ease",
            }}
          >
            <input {...getInputProps()} />
            <FiUploadCloud size={34} color="var(--accent-blue)" />
            <p style={{ marginTop: 12, fontSize: 14, fontWeight: 600 }}>
              {isDragActive ? "Drop the PDF here" : "Drag & drop resume PDF"}
            </p>
            <p style={{ fontSize: 12.5, color: "var(--text-muted)", marginTop: 4 }}>or click to browse</p>
          </div>

          {file && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, fontSize: 13.5 }}>
              <FiFileText size={16} color="var(--accent-purple)" />
              {file.name}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={runAnalysis}
            disabled={!file || loading}
            className="btn-primary"
            style={{ width: "100%", marginTop: 18, opacity: !file || loading ? 0.6 : 1 }}
          >
            {loading ? "Analyzing..." : "Run AI Analysis"}
          </motion.button>

          {error && <p style={{ fontSize: 12, color: "var(--warning)", marginTop: 10 }}>{error}</p>}
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="card"
              style={{ padding: 26 }}
            >
              <div style={{ display: "flex", gap: 30, flexWrap: "wrap", marginBottom: 22 }}>
                <ScoreRing score={result.atsScore} label="ATS Score" />
                <ScoreRing score={result.matchPercentage} label="Resume Match" />
              </div>

              <Section title="Detected Skills">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {result.detectedSkills.map((s) => <span key={s} className="pill">{s}</span>)}
                </div>
              </Section>

              <Section title="Missing Skills">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {result.missingSkills.map((s) => (
                    <span key={s} className="badge-warning" style={{ padding: "6px 12px", borderRadius: 999, fontSize: 12 }}>{s}</span>
                  ))}
                </div>
              </Section>

              <Section title="Recommended Skills to Learn">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {result.recommendedSkills.map((s) => (
                    <span key={s} className="badge-success" style={{ padding: "6px 12px", borderRadius: 999, fontSize: 12 }}>{s}</span>
                  ))}
                </div>
              </Section>

              <Section title="AI Summary">
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6 }}>{result.aiSummary}</p>
              </Section>

              <Section title="Recruiter Recommendation">
                <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--success)" }}>{result.recruiterRecommendation}</p>
              </Section>

              <button
                onClick={() => {
                  const content = [
                    `TalentIQ AI — Resume Analysis`,
                    `File: ${result.fileName}`,
                    `ATS Score: ${result.atsScore}/100`,
                    `Resume Match: ${result.matchPercentage}%`,
                    ``,
                    `Detected Skills: ${result.detectedSkills.join(", ")}`,
                    `Missing Skills: ${result.missingSkills.join(", ")}`,
                    `Recommended Skills: ${result.recommendedSkills.join(", ")}`,
                    ``,
                    `AI Summary: ${result.aiSummary}`,
                    `Recruiter Recommendation: ${result.recruiterRecommendation}`,
                  ].join("\n");
                  downloadTextFile("resume-analysis.txt", content);
                }}
                className="btn-ghost"
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <FiDownload size={15} /> Export Analysis
              </button>
            </motion.div>
          ) : (
            <div className="card" style={{ padding: 26, display: "grid", placeItems: "center", color: "var(--text-muted)", fontSize: 13.5 }}>
              Upload a resume and run the analysis to see ATS scoring, skill gaps, and recommendations.
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.4 }}>{title}</h4>
      {children}
    </div>
  );
}

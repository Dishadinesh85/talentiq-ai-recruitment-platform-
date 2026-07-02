import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCpu, FiUser, FiClock } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import { interviewModes } from "../data/candidateData";
import { nextInterviewStep, generateInterviewReport } from "../services/api";

// Local fallback question banks mirror the backend so the UI still works
// fully offline / without the Express server running.
const LOCAL_BANKS = {
  hr: ["Tell me about yourself and what draws you to a Data Analyst role.", "Describe a time you explained a technical finding to a non-technical stakeholder.", "Why analytics over pure software engineering?", "How do you prioritize multiple analytics requests?", "Where do you see your analytics career in 3 years?"],
  technical: ["Walk me through cleaning a messy dataset with missing values in pandas.", "Write a SQL query to find the second-highest salary.", "Bar chart vs line chart vs heatmap — how do you decide?", "Correlation vs causation — explain with an example.", "How do you detect and handle outliers in sales data?"],
  behavioral: ["Tell me about a time your analysis changed a business decision.", "Describe a project where your hypothesis was wrong.", "How do you handle disagreement about which metric matters?", "Tell me about a tight deadline for a data deliverable.", "How do you stay organized across projects?"],
  data_analyst: ["How would you build a hiring funnel dashboard from raw applicant data?", "What KPIs would you track for recruiter productivity?", "How would you calculate MoM growth in applications using SQL?", "How would you design a Power BI report for a non-technical team?", "How do you validate dashboard accuracy before sharing?"],
  custom: ["Tell me about your most impactful data analytics project.", "What tools do you use most often, and why?", "How do you approach a completely new dataset?", "What business metric are you most passionate about improving?", "How do you communicate uncertainty in your analysis?"],
};

export default function AIRecruiter() {
  const [mode, setMode] = useState("data_analyst");
  const [started, setStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [transcript, setTranscript] = useState([]);
  const [complete, setComplete] = useState(false);
  const [report, setReport] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!started || complete) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [started, complete]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const bank = LOCAL_BANKS[mode];

  const startInterview = () => {
    setStarted(true);
    setComplete(false);
    setReport(null);
    setQIndex(0);
    setTranscript([]);
    setSeconds(0);
    setMessages([{ role: "ai", text: bank[0] }]);
  };

  const submitAnswer = async () => {
    if (!input.trim()) return;
    const answer = input.trim();
    setMessages((m) => [...m, { role: "user", text: answer }]);
    setInput("");

    let feedback = "Good answer — try adding a concrete example with numbers or tools next time.";
    let scores = { technical: 70, communication: 72, problemSolving: 68, confidence: 65 };
    try {
      const { data } = await nextInterviewStep({ mode, questionIndex: qIndex, answer });
      if (data.feedback) feedback = data.feedback;
      if (data.scores) scores = data.scores;
    } catch {
      /* offline fallback scores above */
    }

    const newTranscript = [...transcript, { question: bank[qIndex], answer, scores }];
    setTranscript(newTranscript);
    setMessages((m) => [...m, { role: "ai", text: feedback }]);

    const next = qIndex + 1;
    if (next >= bank.length) {
      setTimeout(() => finishInterview(newTranscript), 600);
    } else {
      setQIndex(next);
      setTimeout(() => setMessages((m) => [...m, { role: "ai", text: bank[next] }]), 700);
    }
  };

  const finishInterview = async (finalTranscript) => {
    setComplete(true);
    try {
      const { data } = await generateInterviewReport({ transcript: finalTranscript });
      setReport(data);
    } catch {
      const avg = (k) => Math.round(finalTranscript.reduce((s, t) => s + t.scores[k], 0) / finalTranscript.length);
      const overall = Math.round((avg("technical") + avg("communication") + avg("problemSolving") + avg("confidence")) / 4);
      setReport({
        technicalScore: avg("technical"), communicationScore: avg("communication"),
        problemSolvingScore: avg("problemSolving"), confidenceScore: avg("confidence"),
        overallScore: overall, recommendation: overall >= 75 ? "Hire" : overall >= 55 ? "Hold" : "Reject",
      });
    }
  };

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <AppLayout title="AI Recruiter" subtitle="Simulate a real interview and get instant, structured feedback">
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        <div className="card" style={{ padding: 20, height: "fit-content" }}>
          <h4 style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>Interview Mode</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {interviewModes.map((m) => (
              <button
                key={m.id}
                onClick={() => !started && setMode(m.id)}
                className="btn-ghost"
                style={{
                  textAlign: "left",
                  background: mode === m.id ? "rgba(37,99,235,.18)" : undefined,
                  border: mode === m.id ? "1px solid rgba(37,99,235,.4)" : undefined,
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
          {!started && (
            <button onClick={startInterview} className="btn-primary" style={{ width: "100%", marginTop: 18 }}>
              Start Interview
            </button>
          )}
          {started && !complete && (
            <div style={{ marginTop: 18, fontSize: 13, color: "var(--text-muted)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span>Question {qIndex + 1} / {bank.length}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><FiClock size={13} />{mins}:{secs}</span>
              </div>
              <div style={{ height: 6, borderRadius: 4, background: "rgba(148,163,184,.15)" }}>
                <motion.div
                  animate={{ width: `${(qIndex / bank.length) * 100}%` }}
                  style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, var(--accent-blue), var(--accent-purple))" }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column", height: 560 }}>
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            {!started && (
              <div style={{ margin: "auto", textAlign: "center", color: "var(--text-muted)" }}>
                <FiCpu size={30} style={{ marginBottom: 10 }} />
                <p style={{ fontSize: 13.5 }}>Choose a mode and start your mock interview.</p>
              </div>
            )}
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", gap: 10, alignSelf: m.role === "user" ? "flex-end" : "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row", maxWidth: "78%" }}
                >
                  <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "grid", placeItems: "center", background: m.role === "user" ? "var(--accent-blue)" : "var(--accent-purple)" }}>
                    {m.role === "user" ? <FiUser size={14} /> : <FiCpu size={14} />}
                  </div>
                  <div style={{ padding: "10px 14px", borderRadius: 14, fontSize: 13.5, background: m.role === "user" ? "rgba(37,99,235,.18)" : "rgba(148,163,184,.08)", border: "1px solid var(--border)" }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {complete && report && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 20, marginTop: 8 }}>
                <h4 style={{ fontSize: 14, marginBottom: 14 }}>Final Evaluation</h4>
                <ScoreRow label="Technical Score" value={report.technicalScore} />
                <ScoreRow label="Communication Score" value={report.communicationScore} />
                <ScoreRow label="Problem Solving Score" value={report.problemSolvingScore} />
                <ScoreRow label="Overall Score" value={report.overallScore} bold />
                <div style={{ marginTop: 12, fontSize: 13.5, fontWeight: 700, color: report.recommendation === "Hire" ? "var(--success)" : report.recommendation === "Hold" ? "var(--warning)" : "var(--danger)" }}>
                  Recommendation: {report.recommendation}
                </div>
              </motion.div>
            )}
          </div>

          {started && !complete && (
            <div style={{ display: "flex", gap: 10, padding: 16, borderTop: "1px solid var(--border)" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
                placeholder="Type your answer..."
                style={{ flex: 1, background: "rgba(148,163,184,.08)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", color: "var(--text)", outline: "none", fontSize: 13.5 }}
              />
              <button onClick={submitAnswer} className="btn-primary" style={{ display: "grid", placeItems: "center", padding: "0 18px" }}>
                <FiSend size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function ScoreRow({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: bold ? 14 : 13, fontWeight: bold ? 700 : 500 }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span>{value}/100</span>
    </div>
  );
}

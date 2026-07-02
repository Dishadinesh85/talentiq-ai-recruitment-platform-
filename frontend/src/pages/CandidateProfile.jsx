import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiGlobe, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import ScoreRing from "../components/ScoreRing";
import { featuredCandidate as c } from "../data/candidateData";

export default function CandidateProfile() {
  return (
    <AppLayout title="Candidate Profile" subtitle="Flagship profile — built from live resume data">
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 26 }}>
          <div
            style={{
              width: 84, height: 84, borderRadius: "50%", margin: "0 auto 14px",
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
              display: "grid", placeItems: "center", fontSize: 28, fontWeight: 700,
            }}
          >
            DP
          </div>
          <h2 style={{ textAlign: "center", fontSize: 19 }}>{c.name}</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 13.5, marginTop: 4 }}>{c.role}</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <span className="badge-success" style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
              {c.availability}
            </span>
          </div>

          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12, fontSize: 13.5 }}>
            <InfoRow icon={FiMail} text={c.email} />
            <InfoRow icon={FiPhone} text={c.phone} />
            <InfoRow icon={FiMapPin} text={c.location} />
          </div>

          <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--border)", fontSize: 13.5 }}>
            <Row label="Education" value={c.education} />
            <Row label="CGPA" value={c.cgpa} />
            <Row label="Experience" value={c.experience} />
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <a href={c.links.github} target="_blank" rel="noreferrer" className="btn-ghost" style={{ flex: 1, display: "flex", justifyContent: "center", gap: 6 }}>
              <FiGithub size={15} /> GitHub
            </a>
            <a href={c.links.linkedin} target="_blank" rel="noreferrer" className="btn-ghost" style={{ flex: 1, display: "flex", justifyContent: "center", gap: 6 }}>
              <FiLinkedin size={15} /> LinkedIn
            </a>
          </div>
          <a href={c.links.portfolio} target="_blank" rel="noreferrer" className="btn-primary" style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
            <FiGlobe size={15} /> Live Portfolio
          </a>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24, display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap" }}>
            <ScoreRing score={c.atsScore} label="ATS Score" />
            <ScoreRing score={c.matchPercentage} label="Role Match" />
            <div style={{ flex: 1, minWidth: 220 }}>
              <h3 style={{ fontSize: 15, marginBottom: 12 }}>Technical Skills</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {c.skills.map((s) => (
                  <span key={s} className="pill">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, marginBottom: 16 }}>Projects</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {c.projects.map((p) => (
                <div key={p.name} style={{ padding: 16, borderRadius: 16, background: "rgba(148,163,184,.05)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <h4 style={{ fontSize: 14.5 }}>{p.name}</h4>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.stack}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>{p.description}</p>
                  {p.links && (
                    <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12.5 }}>
                      {p.links.live && <a href={p.links.live} target="_blank" rel="noreferrer" style={{ color: "var(--accent-blue)" }}>Live Demo →</a>}
                      {p.links.github && <a href={p.links.github} target="_blank" rel="noreferrer" style={{ color: "var(--accent-blue)" }}>Source →</a>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, marginBottom: 14 }}>Certifications</h3>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5, color: "var(--text-muted)" }}>
              {c.certifications.map((cert) => <li key={cert}>{cert}</li>)}
            </ul>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}

function InfoRow({ icon: Icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)" }}>
      <Icon size={15} /> <span style={{ color: "var(--text)" }}>{text}</span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
      <span style={{ color: "var(--text-muted)" }}>{label}</span>
      <span style={{ fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiBell, FiZap } from "react-icons/fi";
import { featuredCandidate } from "../data/candidateData";

const NOTIFICATIONS = [
  { id: 1, text: "Interview completed for Aarav Mehta", time: "12m ago" },
  { id: 2, text: "Resume uploaded — Neha Sharma", time: "1h ago" },
  { id: 3, text: "Disha Dinesh Poojary shortlisted", time: "3h ago" },
];

export default function Header({ title, subtitle }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showNotifs, setShowNotifs] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const handleSearch = (e) => {
    if (e.key !== "Enter" || !query.trim()) return;
    navigate(`/candidates?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 32px", borderBottom: "1px solid var(--border)",
        background: "rgba(11,17,32,.6)", backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 10,
      }}
    >
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
          {subtitle || today}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(148,163,184,.08)", border: "1px solid var(--border)",
            borderRadius: 12, padding: "8px 14px", width: 260,
          }}
        >
          <FiSearch size={16} color="var(--text-muted)" />
          <input
            placeholder="Search candidates, roles... (Enter)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              background: "transparent", border: "none", outline: "none",
              color: "var(--text)", fontSize: 13, width: "100%",
            }}
          />
        </div>

        <button
          onClick={() => navigate("/ai-recruiter")}
          className="btn-ghost"
          title="Open AI Assistant"
          style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center" }}
        >
          <FiZap size={17} />
        </button>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifs((s) => !s)}
            className="btn-ghost"
            style={{ width: 40, height: 40, borderRadius: 12, display: "grid", placeItems: "center", position: "relative" }}
          >
            <FiBell size={17} />
            <span
              style={{
                position: "absolute", top: 6, right: 7, width: 8, height: 8,
                borderRadius: "50%", background: "var(--danger)",
              }}
            />
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="card"
                style={{ position: "absolute", right: 0, top: 48, width: 280, padding: 14, zIndex: 20 }}
              >
                <h4 style={{ fontSize: 13, marginBottom: 10, color: "var(--text-muted)" }}>Notifications</h4>
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} style={{ padding: "10px 0", borderTop: "1px solid var(--border)", fontSize: 12.5 }}>
                    <p>{n.text}</p>
                    <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{n.time}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 8 }}>
          <div
            style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
              display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14,
            }}
          >
            {featuredCandidate.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
        </div>
      </div>
    </header>
  );
}

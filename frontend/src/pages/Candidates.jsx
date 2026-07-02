import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import { candidateList } from "../data/candidateData";

const statusClass = {
  Selected: "badge-success",
  Interview: "pill",
  Pending: "badge-warning",
  Rejected: "badge-danger",
};

const STATUS_FILTERS = ["All", "Selected", "Interview", "Pending", "Rejected"];

export default function Candidates() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "All");
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = candidateList
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    .filter((c) => statusFilter === "All" || c.status === statusFilter);

  return (
    <AppLayout title="Candidates" subtitle="Search, filter, and rank applicants across all open roles">
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(148,163,184,.08)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 14px", width: 280 }}>
            <FiSearch size={15} color="var(--text-muted)" />
            <input
              placeholder="Search candidates..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 13, width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="btn-ghost"
                style={{
                  padding: "6px 14px", fontSize: 12.5,
                  background: statusFilter === s ? "rgba(37,99,235,.18)" : undefined,
                  border: statusFilter === s ? "1px solid rgba(37,99,235,.4)" : undefined,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <thead>
            <tr style={{ color: "var(--text-muted)", textAlign: "left" }}>
              {["Rank", "Candidate", "Role", "ATS Score", "Interview Score", "Status"].map((h) => (
                <th key={h} style={{ padding: "10px 12px", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: "24px 12px", textAlign: "center", color: "var(--text-muted)" }}>No candidates match this search/filter.</td></tr>
            )}
            {filtered.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => c.id === "cand-001" && navigate("/candidates/disha")}
                whileHover={{ backgroundColor: "rgba(148,163,184,.06)" }}
                style={{ cursor: c.id === "cand-001" ? "pointer" : "default", borderTop: "1px solid var(--border)" }}
              >
                <td style={{ padding: "14px 12px", fontWeight: 600 }}>#{c.rank}</td>
                <td style={{ padding: "14px 12px", fontWeight: 600 }}>{c.name}</td>
                <td style={{ padding: "14px 12px", color: "var(--text-muted)" }}>{c.role}</td>
                <td style={{ padding: "14px 12px" }}>{c.atsScore}</td>
                <td style={{ padding: "14px 12px" }}>{c.interviewScore || "—"}</td>
                <td style={{ padding: "14px 12px" }}>
                  <span className={statusClass[c.status]}>{c.status}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

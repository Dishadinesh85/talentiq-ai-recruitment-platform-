import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid, FiUsers, FiFile, FiCpu,
  FiBarChart2, FiFileText, FiSettings, FiLogOut, FiZap,
} from "react-icons/fi";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/candidates", label: "Candidates", icon: FiUsers },
  { to: "/resume-ai", label: "Resume AI", icon: FiFile },
  { to: "/ai-recruiter", label: "Interview AI", icon: FiCpu },
  { to: "/analytics", label: "Analytics", icon: FiBarChart2 },
  { to: "/reports", label: "Reports", icon: FiFileText },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: 250,
        flexShrink: 0,
        background: "linear-gradient(180deg, #0f172a, #0b1120)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 28px" }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 12,
            background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
            display: "grid", placeItems: "center",
          }}
        >
          <FiZap size={18} color="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
            TalentIQ <span className="gradient-text">AI</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Recruitment Intelligence</div>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px", borderRadius: 12, fontSize: 14, fontWeight: 500,
              color: isActive ? "#fff" : "var(--text-muted)",
              background: isActive
                ? "linear-gradient(90deg, rgba(37,99,235,.25), rgba(139,92,246,.18))"
                : "transparent",
              border: isActive ? "1px solid rgba(139,92,246,.35)" : "1px solid transparent",
              transition: "all .15s ease",
            })}
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <motion.button
        whileHover={{ x: 2 }}
        onClick={() => navigate("/login")}
        className="btn-ghost"
        style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-start" }}
      >
        <FiLogOut size={16} /> Logout
      </motion.button>
    </aside>
  );
}

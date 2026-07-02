import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid,
} from "recharts";
import { FiUsers, FiUserCheck, FiCalendar, FiTrendingUp } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import KpiCard from "../components/KpiCard";
import { candidateList } from "../data/candidateData";

const trend = [
  { month: "Jan", apps: 180 }, { month: "Feb", apps: 240 }, { month: "Mar", apps: 210 },
  { month: "Apr", apps: 300 }, { month: "May", apps: 340 }, { month: "Jun", apps: 410 },
];

const stats = [
  { label: "Open Jobs", value: 24 },
  { label: "AI Interviews", value: 812 },
  { label: "Recruiters", value: 12 },
  { label: "Resumes Processed", value: 3450 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <AppLayout title="Good afternoon, Disha 👋" subtitle="Here's what's happening with your hiring pipeline">
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 22 }}>
        <KpiCard label="Applications" value={1240} icon={FiUsers} accent="blue" trend="+18% this month" onClick={() => navigate("/candidates")} />
        <KpiCard label="Shortlisted" value={312} icon={FiUserCheck} accent="purple" trend="+9% this month" onClick={() => navigate("/candidates?status=Selected")} />
        <KpiCard label="Interviews" value={248} icon={FiCalendar} accent="green" trend="+14% this month" onClick={() => navigate("/ai-recruiter")} />
        <KpiCard label="Hiring Rate" value={5} suffix="%" icon={FiTrendingUp} accent="orange" trend="+1.2 pts" onClick={() => navigate("/analytics")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, marginBottom: 18 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, marginBottom: 18 }}>Applications Trend</h3>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.08)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10 }} />
              <Area type="monotone" dataKey="apps" stroke="#2563eb" fill="url(#colorApps)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, marginBottom: 18 }}>Top Statistics</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>{s.label}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, marginBottom: 18 }}>Top Ranked Candidates</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={candidateList} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.08)" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
            <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={12} width={140} />
            <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10 }} />
            <Bar dataKey="atsScore" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </AppLayout>
  );
}

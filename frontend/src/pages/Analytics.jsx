import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { FiSun } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import { fetchAnalytics } from "../services/api";

const COLORS = ["#2563eb", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444"];

const FALLBACK = {
  hiringFunnel: [
    { stage: "Applications", value: 1240 }, { stage: "Screened", value: 612 },
    { stage: "Interviewed", value: 248 }, { stage: "Selected", value: 63 },
  ],
  monthlyTrend: [
    { month: "Jan", interviews: 40 }, { month: "Feb", interviews: 52 }, { month: "Mar", interviews: 61 },
    { month: "Apr", interviews: 58 }, { month: "May", interviews: 74 }, { month: "Jun", interviews: 89 },
  ],
  skillDistribution: [
    { name: "Python", value: 32 }, { name: "SQL", value: 28 }, { name: "Power BI", value: 18 },
    { name: "Excel", value: 12 }, { name: "Machine Learning", value: 10 },
  ],
  departmentHiring: [
    { department: "Data Analytics", hires: 22 }, { department: "Engineering", hires: 34 },
    { department: "Product", hires: 11 }, { department: "Design", hires: 8 },
  ],
  insights: [
    "Applications increased 18% month-over-month.",
    "Python demand increased 24% across open analytics roles.",
    "Power BI is the fastest growing requested skill this quarter.",
    "SQL remains the most requested technology across all roles.",
    "Interview completion rate improved to 91%.",
  ],
};

export default function Analytics() {
  const [data, setData] = useState(FALLBACK);

  useEffect(() => {
    fetchAnalytics().then((r) => setData(r.data)).catch(() => setData(FALLBACK));
  }, []);

  return (
    <AppLayout title="Analytics" subtitle="Enterprise-wide recruitment performance and AI-generated insights">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <ChartCard title="Hiring Funnel">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.hiringFunnel}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.08)" />
              <XAxis dataKey="stage" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Interview Trend">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.08)" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="interviews" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Skill Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.skillDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                {data.skillDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Department Hiring">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.departmentHiring}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.08)" />
              <XAxis dataKey="department" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="hires" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 15, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <FiSun size={17} color="var(--warning)" /> Recruiter Insights
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.insights.map((insight, i) => (
            <div key={i} style={{ fontSize: 13.5, color: "var(--text-muted)", display: "flex", gap: 10 }}>
              <span style={{ color: "var(--accent-blue)" }}>•</span>{insight}
            </div>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
}

function ChartCard({ title, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 22 }}>
      <h3 style={{ fontSize: 14.5, marginBottom: 14 }}>{title}</h3>
      {children}
    </motion.div>
  );
}

const tooltipStyle = { background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 12.5 };

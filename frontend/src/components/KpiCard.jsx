import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function KpiCard({ label, value, suffix = "", icon: Icon, accent = "blue", trend, onClick }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 900;
    const start = performance.now();
    const animate = (t) => {
      const progress = Math.min((t - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const accentColor = { blue: "var(--accent-blue)", purple: "var(--accent-purple)", green: "var(--success)", orange: "var(--warning)" }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ translateY: -3 }}
      onClick={onClick}
      className="card"
      style={{ padding: 22, flex: 1, minWidth: 200, cursor: onClick ? "pointer" : "default" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 500 }}>{label}</p>
          <h3 style={{ fontSize: 30, marginTop: 8 }}>
            {display.toLocaleString()}{suffix}
          </h3>
          {trend && (
            <span style={{ fontSize: 12, color: "var(--success)", fontWeight: 600 }}>{trend}</span>
          )}
        </div>
        {Icon && (
          <div
            style={{
              width: 42, height: 42, borderRadius: 12,
              background: `${accentColor}22`, display: "grid", placeItems: "center",
            }}
          >
            <Icon size={20} color={accentColor} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

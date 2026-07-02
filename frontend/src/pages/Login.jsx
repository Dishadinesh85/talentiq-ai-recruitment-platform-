import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiZap, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("dishapoojary85@gmail.com");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh", display: "grid", placeItems: "center",
        position: "relative", overflow: "hidden",
        background: "radial-gradient(circle at 20% 20%, #17213c 0%, #0b1120 60%)",
      }}
    >
      {[{ top: "10%", left: "8%", c: "var(--accent-blue)" }, { top: "60%", left: "80%", c: "var(--accent-purple)" }, { top: "80%", left: "15%", c: "var(--accent-blue)" }].map((g, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: g.top, left: g.left, width: 320, height: 320,
            borderRadius: "50%", background: g.c, filter: "blur(120px)", opacity: 0.35,
          }}
        />
      ))}

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{ width: 400, padding: "40px 36px", position: "relative", zIndex: 1 }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 56, height: 56, borderRadius: 16, marginBottom: 14,
              background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
              display: "grid", placeItems: "center",
            }}
          >
            <FiZap size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>
            TalentIQ <span className="gradient-text">AI</span>
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
            Enterprise Recruitment Intelligence
          </p>
        </div>

        <label style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 600 }}>Email</label>
        <div style={fieldStyle}>
          <FiMail size={16} color="var(--text-muted)" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={inputStyle}
          />
        </div>

        <label style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 600, marginTop: 16, display: "block" }}>
          Password
        </label>
        <div style={fieldStyle}>
          <FiLock size={16} color="var(--text-muted)" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0 20px", fontSize: 12.5 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)" }}>
            <input type="checkbox" /> Remember Me
          </label>
          <span style={{ color: "var(--accent-blue)", cursor: "pointer" }}>Forgot Password?</span>
        </div>

        <motion.button whileTap={{ scale: 0.98 }} type="submit" className="btn-primary" style={{ width: "100%" }}>
          Login
        </motion.button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ fontSize: 11.5, color: "var(--text-muted)" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <button type="button" onClick={handleLogin} className="btn-ghost" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <FcGoogle size={18} /> Continue with Google
        </button>
      </motion.form>
    </div>
  );
}

const fieldStyle = {
  display: "flex", alignItems: "center", gap: 10,
  background: "rgba(148,163,184,.08)", border: "1px solid var(--border)",
  borderRadius: 12, padding: "11px 14px", marginTop: 6,
};
const inputStyle = { background: "transparent", border: "none", outline: "none", color: "var(--text)", width: "100%", fontSize: 14 };

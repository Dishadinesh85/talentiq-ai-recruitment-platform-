import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import AppLayout from "../components/AppLayout";
import { featuredCandidate } from "../data/candidateData";

const TABS = ["Profile", "Notifications", "API Configuration"];

export default function Settings() {
  const [tab, setTab] = useState("Profile");
  const [profile, setProfile] = useState({
    name: featuredCandidate.name,
    email: featuredCandidate.email,
    phone: featuredCandidate.phone,
    location: featuredCandidate.location,
  });
  const [notifs, setNotifs] = useState({
    interview: true, resume: true, shortlist: true,
  });
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    alert("Saved successfully!");
  };

  const saveProfile = () => {
    localStorage.setItem("talentiq_profile", JSON.stringify(profile));
    showSaved();
  };

  const saveNotifs = (key) => {
    setNotifs((n) => {
      const updated = { ...n, [key]: !n[key] };
      localStorage.setItem("talentiq_notifs", JSON.stringify(updated));
      return updated;
    });
  };

  const updateKey = () => {
    localStorage.setItem("talentiq_api_key", apiKey);
    showSaved();
  };

  return (
    <AppLayout title="Settings" subtitle="Manage your profile, notifications, and integrations">
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="btn-ghost"
            style={{ background: tab === t ? "rgba(37,99,235,.18)" : undefined, border: tab === t ? "1px solid rgba(37,99,235,.4)" : undefined }}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 26, maxWidth: 560 }}>
        {tab === "Profile" && (
          <>
            <Field label="Full Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
            <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
            <Field label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
            <Field label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} />
            <ActionButton onClick={saveProfile} saved={saved} label="Save Changes" />
          </>
        )}
        {tab === "Notifications" && (
          <>
            {[
              { key: "interview", label: "Interview completed" },
              { key: "resume", label: "Resume uploaded" },
              { key: "shortlist", label: "Candidate shortlisted" },
            ].map((n) => (
              <label key={n.key} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, fontSize: 13.5, cursor: "pointer" }}>
                <input type="checkbox" checked={notifs[n.key]} onChange={() => saveNotifs(n.key)} /> {n.label}
              </label>
            ))}
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>Preferences save automatically.</p>
          </>
        )}
        {tab === "API Configuration" && (
          <>
            <Field label="AI Provider" value="OpenAI / Groq" onChange={() => {}} disabled />
            <Field label="API Key" value={apiKey} onChange={setApiKey} placeholder="sk-..." type="password" />
            <ActionButton onClick={updateKey} saved={saved} label="Update Key" ghost />
          </>
        )}
      </motion.div>
    </AppLayout>
  );
}

function Field({ label, value, onChange, disabled, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12.5, color: "var(--text-muted)", fontWeight: 600 }}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        style={{
          display: "block", width: "100%", marginTop: 6, background: "rgba(148,163,184,.08)",
          border: "1px solid var(--border)", borderRadius: 12, padding: "11px 14px", color: "var(--text)", fontSize: 13.5,
          opacity: disabled ? 0.6 : 1,
        }}
      />
    </div>
  );
}

function ActionButton({ onClick, saved, label, ghost }) {
  return (
    <motion.button whileTap={{ scale: 0.97 }} onClick={onClick} className={ghost ? "btn-ghost" : "btn-primary"} style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
      <AnimatePresence mode="wait">
        {saved ? (
          <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FiCheck size={15} /> Saved
          </motion.span>
        ) : (
          <motion.span key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{label}</motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

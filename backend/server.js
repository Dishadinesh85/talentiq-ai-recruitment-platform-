import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRoutes from "./routes/chat.js";
import resumeRoutes from "./routes/resume.js";
import analyticsRoutes from "./routes/analytics.js";
import reportRoutes from "./routes/report.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "TalentIQ AI backend" });
});

app.use("/chat", chatRoutes);
app.use("/resume", resumeRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/report", reportRoutes);
app.use("/upload", uploadRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`TalentIQ AI backend running on http://localhost:${PORT}`);
});

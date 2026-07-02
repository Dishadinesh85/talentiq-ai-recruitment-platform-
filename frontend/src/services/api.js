import axios from "axios";

// In local dev, Vite proxies "/api" to http://localhost:5000 (see vite.config.js).
// In production (Vercel), there is no such proxy, so we call the deployed
// backend directly. Set VITE_API_URL in Vercel's project settings to override.
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL,
  timeout: 20000,
});

export const uploadResume = (file) => {
  const form = new FormData();
  form.append("resume", file);
  return api.post("/resume/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const fetchAnalytics = () => api.get("/analytics");

export const nextInterviewStep = (payload) => api.post("/chat/interview", payload);

export const generateInterviewReport = (payload) => api.post("/chat/interview/report", payload);

export const downloadInterviewPdf = (payload) =>
  api.post("/report/interview-pdf", payload, { responseType: "blob" });

export default api;

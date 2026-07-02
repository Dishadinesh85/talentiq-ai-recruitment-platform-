import axios from "axios";

const api = axios.create({
  baseURL: "/api",
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

import express from "express";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Generic upload endpoint, kept separate from /resume/upload so the frontend
// can reuse it for other attachment types (profile photos, exported reports, etc).
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({
    fileName: req.file.originalname,
    sizeKb: Math.round(req.file.size / 1024),
    mimeType: req.file.mimetype,
  });
});

export default router;

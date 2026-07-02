import express from "express";
import { upload } from "../middleware/upload.js";
import { extractTextFromPdf, analyzeResumeText } from "../utils/resumeParser.js";

const router = express.Router();

router.post("/upload", upload.single("resume"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded (field name: 'resume')" });
    }

    const text = await extractTextFromPdf(req.file.buffer);
    const analysis = analyzeResumeText(text);

    res.json({
      fileName: req.file.originalname,
      sizeKb: Math.round(req.file.size / 1024),
      ...analysis,
    });
  } catch (err) {
    next(err);
  }
});

export default router;

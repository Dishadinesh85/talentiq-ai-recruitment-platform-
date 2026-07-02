import express from "express";
import PDFDocument from "pdfkit";

const router = express.Router();

router.post("/interview-pdf", (req, res) => {
  const {
    candidateName = "Candidate",
    mode = "custom",
    overallScore = 0,
    technicalScore = 0,
    communicationScore = 0,
    problemSolvingScore = 0,
    recommendation = "Hold",
    transcript = [],
  } = req.body;

  const doc = new PDFDocument({ margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=interview-report.pdf");
  doc.pipe(res);

  doc.fontSize(20).text("TalentIQ AI — Interview Report", { align: "left" });
  doc.moveDown();
  doc.fontSize(12).text(`Candidate: ${candidateName}`);
  doc.text(`Interview Mode: ${mode}`);
  doc.text(`Recommendation: ${recommendation}`);
  doc.moveDown();

  doc.fontSize(14).text("Scores");
  doc.fontSize(12).text(`Overall Score: ${overallScore}/100`);
  doc.text(`Technical Score: ${technicalScore}/100`);
  doc.text(`Communication Score: ${communicationScore}/100`);
  doc.text(`Problem Solving Score: ${problemSolvingScore}/100`);
  doc.moveDown();

  doc.fontSize(14).text("Transcript");
  transcript.forEach((t, i) => {
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor("#2563EB").text(`Q${i + 1}: ${t.question}`);
    doc.fillColor("#000000").text(`A: ${t.answer || "(no answer recorded)"}`);
  });

  doc.end();
});

export default router;

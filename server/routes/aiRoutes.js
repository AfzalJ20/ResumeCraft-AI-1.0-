const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
generateAISummary,
improveAISummary,
analyzeResumeATS,
analyzeJobDescription,
} = require("../controllers/aiController");

const router = express.Router();

// Generate AI Summary
router.post(
"/generate-summary",
protect,
generateAISummary
);

// Improve AI Summary
router.post(
"/improve-summary",
protect,
improveAISummary
);

router.post(
"/ats-score",
protect,
analyzeResumeATS
);

router.post(
"/job-match",
protect,
analyzeJobDescription
);

module.exports = router;
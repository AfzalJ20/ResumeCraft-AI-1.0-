
const {
generateSummary,
improveSummary,
analyzeResume,
analyzeJobMatch,
} = require("../services/geminiService");

const generateAISummary = async (req, res, next) => {
try {
    const { role, skills, experience } = req.body;

    if (!role || !skills) {
    return res.status(400).json({
        success: false,
        message: "Role and Skills are required",
    });
    }

    const summary = await generateSummary(
    role,
    skills,
    experience || "Fresher"
    );

    res.status(200).json({
    success: true,
    summary,
    });

} catch (error) {
    next(error);
}
};
const improveAISummary = async (req, res, next) => {

try {

    const { summary } = req.body;

    if (!summary) {

    return res.status(400).json({
        success: false,
        message: "Summary is required",
    });

    }

    const improved = await improveSummary(summary);

    res.json({
    success: true,
    summary: improved,
    });

} catch (error) {
    next(error);
}

};

const analyzeResumeATS = async (req, res, next) => {
try {
    const resume = req.body;

    const result = await analyzeResume(resume);

    const parsed = JSON.parse(result);

    res.json({
    success: true,
    analysis: parsed,
    });

} catch (error) {
    next(error);
}
};
const analyzeJobDescription = async (req, res, next) => {
try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
    return res.status(400).json({
        success: false,
        message: "Resume and Job Description are required",
    });
    }

    const result = await analyzeJobMatch(
    resume,
    jobDescription
    );

    const parsed = JSON.parse(result);

    res.json({
    success: true,
    analysis: parsed,
    });

} catch (error) {
    next(error);
}
};

module.exports = {
generateAISummary,
improveAISummary,
analyzeResumeATS,
analyzeJobDescription,
};
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY,
});

const generateSummary = async (role, skills, experience) => {
const prompt = `
You are an expert resume writer.

Generate a professional resume summary.

Role:
${role}

Skills:
${skills}

Experience:
${experience}

Rules:
- 80 to 120 words
- Professional tone
- ATS friendly
- No bullet points
- Return only the summary text.
`;

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
});

return response.text;
};


const improveSummary = async (summary) => {

const prompt = `
You are a professional resume writer.

Improve this resume summary.

Rules:

- ATS friendly
- Professional
- 80-120 words
- Better grammar
- Better vocabulary
- Keep the original meaning
- Return only the improved summary.

Summary:

${summary}
`;

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
});

return response.text;
};

const analyzeResume = async (resume) => {
const prompt = `
You are an ATS (Applicant Tracking System) expert.

Analyze the following resume and return ONLY valid JSON.

Resume:
${JSON.stringify(resume, null, 2)}

Return exactly in this format:

{
"score": 85,
"strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
],
"suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
]
}

Rules:
- Score must be between 0 and 100.
- Return ONLY JSON.
- No markdown.
- No explanation.
`;

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
});

return response.text;
};

const analyzeJobMatch = async (resume, jobDescription) => {
const prompt = `
You are an ATS Resume Expert.

Compare the resume with the following job description.

Resume:
${JSON.stringify(resume, null, 2)}

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
"matchScore": 82,
"matchedSkills": [
    "React",
    "Node.js"
],
"missingSkills": [
    "Docker",
    "AWS"
],
"suggestions": [
    "Learn Docker",
    "Add AWS projects",
    "Mention REST APIs"
]
}

Rules:
- Return JSON only.
- Match score must be between 0 and 100.
- No markdown.
- No explanation.
`;

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
});

return response.text;
};
module.exports = {
generateSummary,
improveSummary,
analyzeResume,
analyzeJobMatch,
};
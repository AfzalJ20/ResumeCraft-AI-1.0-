import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import "./ResumePreview.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResumePreview() {
const { id } = useParams();

const resumeRef = useRef();

const [resume, setResume] = useState(null);
const [analysis, setAnalysis] = useState(null);
const [loadingATS, setLoadingATS] = useState(false);
const [jobDescription, setJobDescription] = useState("");
const [jobAnalysis, setJobAnalysis] = useState(null);
const [loadingJobMatch, setLoadingJobMatch] = useState(false);

useEffect(() => {
    fetchResume();
}, []);

const fetchResume = async () => {
    try {
    const token = localStorage.getItem("token");

    const response = await api.get(`/resume/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    setResume(response.data.resume);
    } catch (error) {
    console.error(error);
    }
};

const downloadPDF = async () => {
    const canvas = await html2canvas(resumeRef.current);

    const image = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
    image,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
    );

    pdf.save("Resume.pdf");
};

const analyzeATS = async () => {
    try {
    setLoadingATS(true);

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/ai/ats-score",
        resume,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

    setAnalysis(response.data.analysis);
    } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to analyze resume.");
    } finally {
    setLoadingATS(false);
    }
};

const analyzeJobMatch = async () => {
try {
    setLoadingJobMatch(true);

    const token = localStorage.getItem("token");

    const response = await api.post(
    "/ai/job-match",
    {
        resume,
        jobDescription,
    },
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }
    );

    setJobAnalysis(response.data.analysis);
} catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to analyze job match.");
} finally {
    setLoadingJobMatch(false);
}
};
if (!resume) {
    return <h2>Loading...</h2>;
}

return (
    <DashboardLayout>
    <button
        onClick={downloadPDF}
        style={{
        marginBottom: "20px",
        padding: "12px 20px",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        }}
    >
        📄 Download PDF
    </button>

    <button
        onClick={analyzeATS}
        style={{
        marginLeft: "10px",
        marginBottom: "20px",
        padding: "12px 20px",
        background: "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        }}
    >
        {loadingATS ? "Analyzing..." : "✨ Analyze ATS Score"}
    </button>

    <div className="resume-preview" ref={resumeRef}>
        <h1>{resume.personalInfo.fullName}</h1>

        <p>{resume.personalInfo.email}</p>

        <p>{resume.personalInfo.phone}</p>

        <hr />

        <h2>Professional Summary</h2>

        <p>{resume.summary}</p>

        <hr />

        <h2>Skills</h2>

        <ul>
        {resume.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
        ))}
        </ul>
    </div>

    {analysis && (
        <div
        style={{
            marginTop: "30px",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)",
        }}
        >
        <h2>ATS Resume Analysis</h2>

        <h1 style={{ color: "#2563eb" }}>
            {analysis.score}/100
        </h1>

        <h3>Strengths</h3>

        <ul>
            {analysis.strengths.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
        </ul>

        <h3>Suggestions</h3>

        <ul>
            {analysis.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
        </ul>
        </div>
    )}
    <div style={{ marginTop: "30px" }}>
<h2>Job Description Match</h2>

<textarea
    rows={8}
    placeholder="Paste the Job Description here..."
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    style={{
    width: "100%",
    padding: "15px",
    borderRadius: "10px",
    }}
/>

<button
    onClick={analyzeJobMatch}
    style={{
    marginTop: "15px",
    padding: "12px 20px",
    background: "#9333ea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    }}
>
    {loadingJobMatch
    ? "Analyzing..."
    : "🎯 Analyze Job Match"}
</button>
</div>
{jobAnalysis && (
<div
    style={{
    marginTop: "25px",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,.1)",
    }}
>
    <h2>Job Match Score</h2>

    <h1 style={{ color: "#9333ea" }}>
    {jobAnalysis.matchScore}%
    </h1>

    <h3>Matched Skills</h3>

    <ul>
    {jobAnalysis.matchedSkills.map((skill, index) => (
        <li key={index}>✅ {skill}</li>
    ))}
    </ul>

    <h3>Missing Skills</h3>

    <ul>
    {jobAnalysis.missingSkills.map((skill, index) => (
        <li key={index}>❌ {skill}</li>
    ))}
    </ul>

    <h3>Suggestions</h3>

    <ul>
    {jobAnalysis.suggestions.map((item, index) => (
        <li key={index}>💡 {item}</li>
    ))}
    </ul>
</div>
)}
    </DashboardLayout>
);
}

export default ResumePreview;
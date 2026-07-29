import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

function CreateResume() {
const navigate = useNavigate();

const [loadingAI, setLoadingAI] = useState(false);

const [resume, setResume] = useState({
    title: "",
    role: "",
    experience: "",
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
});

const handleChange = (e) => {
    setResume({
    ...resume,
    [e.target.name]: e.target.value,
    });
};

  // ===========================
  // Generate AI Summary
  // ===========================
const generateSummary = async () => {
    try {
    setLoadingAI(true);

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/ai/generate-summary",
        {
        role: resume.role,
        skills: resume.skills,
        experience: resume.experience,
        },
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

    setResume((prev) => ({
        ...prev,
        summary: response.data.summary,
    }));
    } catch (error) {
    console.error(error.response?.data || error.message);
    alert("Failed to generate AI summary.");
    } finally {
    setLoadingAI(false);
    }
};

  // ===========================
  // Create Resume
  // ===========================
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const token = localStorage.getItem("token");

    await api.post(
        "/resume/create",
        {
        title: resume.title,
        personalInfo: {
            fullName: resume.fullName,
            email: resume.email,
            phone: resume.phone,
        },
        summary: resume.summary,
        skills: resume.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
        },
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

    alert("Resume Created Successfully!");

    navigate("/resumes");
    } catch (error) {
    console.error(error.response?.data || error.message);
    }
};

return (
    <DashboardLayout>
    <h1>Create Resume</h1>

    <form onSubmit={handleSubmit}>

        <input
        type="text"
        name="title"
        placeholder="Resume Title"
        value={resume.title}
        onChange={handleChange}
        />

        <input
        type="text"
        name="role"
        placeholder="Job Role (e.g. Full Stack Developer)"
        value={resume.role}
        onChange={handleChange}
        />

        <input
        type="text"
        name="experience"
        placeholder="Experience (e.g. Fresher / 2 Years)"
        value={resume.experience}
        onChange={handleChange}
        />

        <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={resume.fullName}
        onChange={handleChange}
        />

        <input
        type="email"
        name="email"
        placeholder="Email"
        value={resume.email}
        onChange={handleChange}
        />

        <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={resume.phone}
        onChange={handleChange}
        />

        <input
        type="text"
        name="skills"
        placeholder="React, Node.js, MongoDB"
        value={resume.skills}
        onChange={handleChange}
        />

        <button
        type="button"
        onClick={generateSummary}
        disabled={loadingAI}
        style={{
            margin: "15px 0",
            background: "#2563eb",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
        }}
        >
        {loadingAI
            ? "Generating AI Summary..."
            : "✨ Generate AI Summary"}
        </button>

        <textarea
        name="summary"
        rows="6"
        placeholder="Professional Summary"
        value={resume.summary}
        onChange={handleChange}
        />

        <button type="submit">
        Create Resume
        </button>

    </form>
    </DashboardLayout>
);
}

export default CreateResume;
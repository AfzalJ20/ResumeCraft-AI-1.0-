import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./MyResumes.css";


function MyResumes() {
const navigate = useNavigate(); 
const [resumes, setResumes] = useState([]);

useEffect(() => {
    fetchResumes();
}, []);

const fetchResumes = async () => {
    try {
    const token = localStorage.getItem("token");

    const response = await api.get("/resume/all", {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    setResumes(response.data.resumes);
    } catch (error) {
    console.error(error);
    }
};

const deleteResume = async (id) => {
    const confirmDelete = window.confirm(
    "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
    const token = localStorage.getItem("token");

    await api.delete(`/resume/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    alert("Resume deleted successfully!");

    fetchResumes();
    } catch (error) {
    console.error(error.response?.data || error.message);
    }
};

return (
    <DashboardLayout>
    <h1>My Resumes</h1>

    {resumes.length === 0 ? (
        <p>No resumes found.</p>
    ) : (
        resumes.map((resume) => (
        <div key={resume._id} className="resume-card">
            <div className="resume-header">
            <h2>{resume.title}</h2>

            <span>
                {new Date(resume.createdAt).toLocaleDateString()}
            </span>
            </div>

            <p className="resume-summary">
            {resume.summary}
            </p>

            <div className="skills">
            {resume.skills?.map((skill, index) => (
                <span key={index} className="skill">
                {skill}
                </span>
            ))}
            </div>

            <div className="actions">
            <button
            onClick={() => navigate(`/preview/${resume._id}`)}
            >
            👁 Preview
            </button>

            <button className="edit-btn"
            onClick={() => navigate(`/edit/${resume._id}`)}
            >
            ✏ Edit
            </button>

            <button
                className="delete-btn"
                onClick={() => deleteResume(resume._id)}
            >
                🗑 Delete
            </button>
            </div>
        </div>
        ))
    )}
    </DashboardLayout>
);
}

export default MyResumes;
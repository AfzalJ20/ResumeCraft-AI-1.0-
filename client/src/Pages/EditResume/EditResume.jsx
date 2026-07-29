import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";

function EditResume() {

const { id } = useParams();

const navigate = useNavigate();

const [resume, setResume] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
});

useEffect(() => {
    loadResume();
}, []);

const loadResume = async () => {
try {
    const token = localStorage.getItem("token");

    const response = await api.get(`/resume/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });

    const data = response.data.resume;

    setResume({
    title: data.title,
    fullName: data.personalInfo.fullName,
    email: data.personalInfo.email,
    phone: data.personalInfo.phone,
    summary: data.summary,
    skills: data.skills.join(", "),
    });

} catch (error) {
    console.error(error);
}
};

const handleChange = (e) => {
setResume({
    ...resume,
    [e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
    const token = localStorage.getItem("token");

    await api.put(
    `/resume/${id}`,
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
        .map((skill) => skill.trim()),
    },
    {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }
    );

    alert("Resume Updated Successfully!");

    navigate("/my-resumes");

} catch (error) {
    console.error(error.response?.data || error.message);
}
};

return (
<DashboardLayout>
    <h1>Edit Resume</h1>

    <form onSubmit={handleSubmit}>

    <input
        type="text"
        name="title"
        placeholder="Resume Title"
        value={resume.title}
        onChange={handleChange}
    />

    <br /><br />

    <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={resume.fullName}
        onChange={handleChange}
    />

    <br /><br />

    <input
        type="email"
        name="email"
        placeholder="Email"
        value={resume.email}
        onChange={handleChange}
    />

    <br /><br />

    <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={resume.phone}
        onChange={handleChange}
    />

    <br /><br />

    <textarea
        name="summary"
        placeholder="Summary"
        value={resume.summary}
        onChange={handleChange}
        rows="5"
    />

    <br /><br />

    <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        value={resume.skills}
        onChange={handleChange}
    />

    <br /><br />

    <button type="submit">
        Update Resume
    </button>

    </form>

</DashboardLayout>
);
}

export default EditResume;
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../../services/api";
import "./Login.css";


function Login() {
const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
    const response = await api.post("/auth/login", formData);

    // Save token
    localStorage.setItem("token", response.data.token);

    // Save user
    localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
    );

    console.log("Login Successful");

    // Redirect
    window.location.href = "/dashboard";

} catch (error) {
    console.error(error.response?.data || error.message);
}
};


return (
<div className="login-container">
    <div className="login-card">
    <h1>ResumeCraft AI</h1>
    <p>Login to continue</p>

    <form onSubmit={handleSubmit}>
        <div className="input-group">
        <FaEnvelope />
        <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
        />
        </div>

        <div className="input-group">
        <FaLock />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
        />
        </div>

        <button type="submit">
        Login
        </button>
    </form>

    <p>
        Don't have an account?
        <Link to="/register"> Register</Link>
    </p>
    </div>
</div>
);
}

export default Login;
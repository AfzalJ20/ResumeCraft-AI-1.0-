import { Link, useLocation } from "react-router-dom";
import {
FaHome,
FaFileAlt,
FaPlusCircle,
FaUser,
FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
const location = useLocation();

const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
};

return (
    <div className="sidebar">
    <h2 className="logo">ResumeCraft AI</h2>

    <nav>
        <Link
        className={location.pathname === "/dashboard" ? "active" : ""}
        to="/dashboard"
        >
        <FaHome /> Dashboard
        </Link>

        <Link
        className={location.pathname === "/resumes" ? "active" : ""}
        to="/resumes"
        >
        <FaFileAlt /> My Resumes
        </Link>

        <Link
        className={location.pathname === "/create" ? "active" : ""}
        to="/create"
        >
        <FaPlusCircle /> Create Resume
        </Link>

        <Link
        className={location.pathname === "/profile" ? "active" : ""}
        to="/profile"
        >
        <FaUser /> Profile
        </Link>
    </nav>

    <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt /> Logout
    </button>
    </div>
);
}

export default Sidebar;
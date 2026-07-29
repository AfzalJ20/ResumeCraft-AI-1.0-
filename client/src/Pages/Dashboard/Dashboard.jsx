import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/Card/StatsCard";

import {
FaFileAlt,
FaRobot,
FaDownload,
FaUserCheck,
} from "react-icons/fa";

function Dashboard() {
const user = JSON.parse(localStorage.getItem("user"));

return (
    <DashboardLayout>
    <h1>Welcome back, {user?.name} 👋</h1>

    <p>Manage your AI resumes from one place.</p>

    <div
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginTop: "30px",
        }}
    >
        <StatsCard
        title="Total Resumes"
        value="1"
        icon={<FaFileAlt />}
        />

        <StatsCard
        title="AI Generated"
        value="0"
        icon={<FaRobot />}
        />

        <StatsCard
        title="Downloads"
        value="0"
        icon={<FaDownload />}
        />

        <StatsCard
        title="Profile"
        value="Complete"
        icon={<FaUserCheck />}
        />
    </div>
    </DashboardLayout>
);
}

export default Dashboard;
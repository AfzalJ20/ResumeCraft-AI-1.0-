import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateResume from "./pages/CreateResume/CreateResume";
import MyResumes from "./pages/MyResumes/MyResumes";
import EditResume from "./pages/EditResume/EditResume";
import ResumePreview from "./pages/ResumePreview/ResumePreview";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resumes" element={<MyResumes />} />
      <Route path="/create" element={<CreateResume />} />
      <Route path="/edit/:id" element={<EditResume />} />
      <Route path="/preview/:id" element={<ResumePreview />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-resume" element={<CreateResume />} />
      <Route path="/my-resumes" element={<MyResumes />} />
      <Route path="/resume/:id" element={<ResumePreview />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
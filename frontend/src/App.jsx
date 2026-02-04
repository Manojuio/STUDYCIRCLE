import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import QuestionDetail from "./pages/QuestionDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Group Page */}
        <Route path="/group/:groupId" element={<Group />} />
        <Route path="/question/:questionId" element={<QuestionDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

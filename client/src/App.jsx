import { Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Signup />} />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
            />
        </Routes>
    );
}

export default App;
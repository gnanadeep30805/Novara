import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, GraduationCap, Shield } from "lucide-react";

function Login() {
    const navigate = useNavigate();

    const [role, setRole] = useState("student");
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    ...formData,
                    role,
                },
                {
                    withCredentials: true,
                }
            );

            const user = res.data.user;

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            alert(
                error.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-600">
                        Novara
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Prepare. Practice. Perform.
                    </p>
                </div>

                {/* Role Selector */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-8">

                    <button
                        onClick={() => setRole("student")}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${role === "student"
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600"
                            }`}
                    >
                        <GraduationCap size={18} />
                        Student
                    </button>

                    <button
                        onClick={() => setRole("admin")}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${role === "admin"
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600"
                            }`}
                    >
                        <Shield size={18} />
                        Admin
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="mb-5">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="block mb-2 text-gray-700 font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
                            />

                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-500"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right mb-6">
                        <Link
                            to="/forgot-password"
                            className="text-indigo-600 text-sm hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                    >
                        Login as{" "}
                        {role === "admin"
                            ? "Admin"
                            : "Student"}
                    </button>

                    {/* Signup */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-indigo-600 font-semibold"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
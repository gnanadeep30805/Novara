import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (formData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData,
                { withCredentials: true }
            );
            const userData = res.data.user;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }
    };

    const signup = async (formData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData,
                { withCredentials: true }
            );
            const userData = res.data.user;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Signup failed",
            };
        }
    };

    const forgotPassword = async (email) => {
        try {
            await axios.post("http://localhost:5000/api/auth/forgot-password", {
                email,
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    "Failed to send reset email",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, signup, forgotPassword, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
    const { user, logout, resendVerification } = useAuth();
    const [resendStatus, setResendStatus] = useState("");
    const [resending, setResending] = useState(false);

    const handleResend = async () => {
        setResending(true);
        setResendStatus("");
        const result = await resendVerification(user.email);
        setResending(false);
        setResendStatus(
            result.success ? "Verification email sent!" : result.error
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Dashboard</h2>
                <div className="mb-4">
                    <p className="text-gray-700"><strong>Name:</strong> {user?.name}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
                    <p className="text-gray-700"><strong>Role:</strong> {user?.role}</p>
                    {user?.isVerified && <p className="text-green-600 mt-2">✓ Email Verified</p>}
                    {!user?.isVerified && (
                        <div className="mt-2">
                            <p className="text-amber-600">✗ Email Not Verified</p>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resending}
                                className="mt-2 text-sm text-indigo-600 hover:underline disabled:opacity-50"
                            >
                                {resending ? "Sending..." : "Resend verification email"}
                            </button>
                            {resendStatus && (
                                <p className="text-sm mt-1 text-gray-600">{resendStatus}</p>
                            )}
                        </div>
                    )}
                </div>
                <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;

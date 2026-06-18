import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

//Interview
app.use("/api/interviews", interviewRoutes);
// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK" });
});

export default app;

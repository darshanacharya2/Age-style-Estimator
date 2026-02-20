import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { analyzeRoute } from "./routes/analyze.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);
app.use(express.json());

// Rate limiter — 15 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  message: { error: "Too many requests. Please wait a moment and try again." },
});
app.use("/api", limiter);

// Routes
app.use("/api", analyzeRoute);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`🎨 Age & Style Estimator API running at http://localhost:${PORT}`);
});

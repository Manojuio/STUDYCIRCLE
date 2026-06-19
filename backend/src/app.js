import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import resourceRoutes from "./routes/resource.routes.js";
import questionRoutes from "./routes/question.routes.js";

const app = express();

// Secure CORS configuration for production
app.use(cors({
  origin: [
    "http://localhost:5173", // Local Vite development server
    /\.vercel\.app$/        // Matches any deployment preview or production domain on Vercel
  ],
  credentials: true          // Allows session cookies/headers if you use them now or in the future
}));

app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groups", resourceRoutes);
app.use("/api/groups", questionRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;

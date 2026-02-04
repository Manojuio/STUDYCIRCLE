import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import resourceRoutes from "./routes/resource.routes.js";
import questionRoutes from "./routes/question.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groups", resourceRoutes);
app.use("/api/groups", questionRoutes);



app.use(errorMiddleware);

export default app;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./utils/errorHandler.js";

// Routes
import authRouter from "./routes/authRoutes.js";
import heroRouter from "./routes/heroRoutes.js";
import aboutRouter from "./routes/aboutRoutes.js";
import serviceRouter from "./routes/serviceRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

const app = express();

// --- Global Middlewares ---
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// --- API Endpoints ---
app.get("/", (req, res) => {
  res.status(200).json({ message: "Portfolio API is working perfectly." });
});

app.use("/api/auth", authRouter);
app.use("/api/hero", heroRouter);
app.use("/api/about-me", aboutRouter);
app.use("/api/services", serviceRouter);
app.use("/api/projects", projectRouter);

// --- 404 Handler ---
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// --- Global Error Handler ---
app.use(errorHandler);

export default app;

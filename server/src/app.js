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
import contactRouter from "./routes/contactRoutes.js";
import miscellaneousRouter from "./routes/miscellaneousRoutes.js";
import visitorRouter from "./routes/visitorsRoutes.js";
import skillsRouter from "./routes/skillsRoutes.js";

const app = express();

// --- Global Middlewares ---
app.use(helmet());
app.use(morgan("dev"));

const allowedOrigins = [process.env.ADMIN_URL, process.env.CLIENT_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      // Postman বা Server-to-Server call এর জন্য (origin undefined)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // ✅ Allow
      } else {
        callback(new Error(`CORS blocked: ${origin}`)); // ❌ Block
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
app.use("/api/about", aboutRouter);
app.use("/api/services", serviceRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectRouter);
app.use("/api/contact", contactRouter);
app.use("/api/miscellaneous", miscellaneousRouter);

app.use("/api/visitors", visitorRouter);

// --- 404 Handler ---
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// --- Global Error Handler ---
app.use(errorHandler);

export default app;

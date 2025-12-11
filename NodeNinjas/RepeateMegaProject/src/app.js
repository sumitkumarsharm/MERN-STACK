import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares yaha hai
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes import kiya
import helthCheckRoutes from "./routes/helthcheck.routes.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import noteRoutes from "./routes/note.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

// yaha routes hai
app.use("/api/v1/helthcheck", helthCheckRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/notes", noteRoutes);

// Error handler yaha hai
app.use(errorHandler);

export default app;

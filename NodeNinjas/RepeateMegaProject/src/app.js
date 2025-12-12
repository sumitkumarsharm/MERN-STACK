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
import projectMemberRoutes from "./routes/projectMember.routes.js";
import taskRouter from "./routes/task.routes.js";
import subtaskRouter from "./routes/subtask.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
import taskAttachmentRoutes from "./routes/taskAttachment.routes.js";

// yaha routes hai
app.use("/api/helthcheck", helthCheckRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projectMember", projectMemberRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tasks", taskRouter);
app.use("/api/subtasks", subtaskRouter);
app.use("/api/taskAttachments", taskAttachmentRoutes);

// Error handler yaha hai
app.use(errorHandler);

export default app;

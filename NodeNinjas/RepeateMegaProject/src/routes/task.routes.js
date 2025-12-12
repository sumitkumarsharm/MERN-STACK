// routes/task.routes.js
import express from "express";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  updateTaskStatus,
  reassignTask,
  deleteTask,
} from "../controllers/task.controllers.js";
import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = express.Router();
router.use(verifyUser);

router.post("/", createTask);
router.get("/project/:projectId", getTasksByProject);
router.get("/:taskId", getTaskById);
router.put("/:taskId", updateTask);
router.put("/:taskId/status", updateTaskStatus);
router.put("/:taskId/reassign", reassignTask);
router.delete("/:taskId", deleteTask);

export default router;

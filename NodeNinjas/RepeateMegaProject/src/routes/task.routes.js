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

router.post("/", verifyUser, createTask);
router.get("/project/:projectId", verifyUser, getTasksByProject);
router.get("/:taskId", verifyUser, getTaskById);
router.put("/:taskId", verifyUser, updateTask);
router.put("/:taskId/status", verifyUser, updateTaskStatus);
router.put("/:taskId/reassign", verifyUser, reassignTask);
router.delete("/:taskId", verifyUser, deleteTask);

export default router;

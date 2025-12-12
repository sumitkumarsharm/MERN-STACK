import express from "express";
import {
  createSubTask,
  getSubTasks,
  updateSubTask,
  toggleSubTask,
  deleteSubTask,
} from "../controllers/subtask.controller.js";

import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = express.Router();

router.post("/", verifyUser, createSubTask);

router.get("/:taskId", verifyUser, getSubTasks);

router.patch("/:subtaskId", verifyUser, updateSubTask);

router.patch("/toggle/:subtaskId", verifyUser, toggleSubTask);

router.delete("/:subtaskId", verifyUser, deleteSubTask);

export default router;

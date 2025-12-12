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
router.use(verifyUser);

router.post("/", createSubTask);
router.get("/:taskId", getSubTasks);
router.patch("/:subtaskId", updateSubTask);
router.patch("/toggle/:subtaskId", toggleSubTask);
router.delete("/:subtaskId", deleteSubTask);

export default router;

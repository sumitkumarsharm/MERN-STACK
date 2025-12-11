import { Router } from "express";
import {
  createProject, // tested-1
  getProjectById, // tested - 2
  getProjects, //tested - 3
  updateProject, // Tested - 4
  deleteProject, // Tested - 5
} from "../controllers/project.controllers.js";
import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = Router();
// project related routes
router.post("/", verifyUser, createProject);
router.get("/:projectId", verifyUser, getProjectById);
router.get("/", verifyUser, getProjects);
router.put("/:projectId", verifyUser, updateProject);
router.delete("/:projectId", verifyUser, deleteProject);
export default router;

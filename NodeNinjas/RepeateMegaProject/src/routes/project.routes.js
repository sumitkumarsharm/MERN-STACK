import { Router } from "express";
import {
  // project related controllers

  createProjects, // tested-1
  getProjectById, // tested - 2
  getProjects, //tested - 3
  updateProject, // Tested - 4
  deleteProject, // Tested - 5

  // member related controllers
  addMemberToProject, // Tested - 6
  updateProjectMembers, // Tested - 7
  removeMember, // tested - 8
  getProjectMembers, // tested - 9
  updateMemberRole, // tested -10
} from "../controllers/project.controllers.js";
import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = Router();
// project related routes
router.post("/", verifyUser, createProjects);
router.get("/:projectId", verifyUser, getProjectById);
router.get("/", verifyUser, getProjects);
router.put("/:projectId", verifyUser, updateProject);
router.delete("/:projectId", verifyUser, deleteProject);

// member related routes
router.post("/:projectId/members", verifyUser, addMemberToProject);
router.get("/:projectId/members", verifyUser, getProjectMembers);
router.delete("/:projectId/members/:memberId", verifyUser, removeMember);
router.put("/:projectId/members", verifyUser, updateProjectMembers);
router.put("/:projectId/members/:memberId/role", verifyUser, updateMemberRole);

export default router;

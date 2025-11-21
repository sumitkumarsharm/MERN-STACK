import { Router } from "express";
import {
  addMemberToProject,
  createProjects,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  removeMember,
  updateMemberRole,
  updateProject,
  updateProjectMembers,
} from "../controllers/project.controllers.js";
import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = Router();

router.get("/", verifyUser, getProjects);
router.get("/:projectId", verifyUser, getProjectById);
router.post("/", verifyUser, createProjects);
router.put("/:projectId", verifyUser, updateProject);
router.delete("/:projectId", verifyUser, deleteProject);

// member side se
router.post("/:projectId/members", verifyUser, addMemberToProject);
router.get("/:projectId/members", verifyUser, getProjectMembers);
router.put("/:projectId/members", verifyUser, updateProjectMembers);
router.put("/:projectId/members/:memberId/role", verifyUser, updateMemberRole);
router.delete("/:projectId/members/:memberId", verifyUser, removeMember);

export default router;

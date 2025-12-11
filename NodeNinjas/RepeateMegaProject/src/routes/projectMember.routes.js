import express from "express";
import {
  addMember,
  getMembers,
  updateMemberRole,
  removeMember,
} from "../controllers/projectMember.controller.js";

import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = express.Router();

router.get("/:projectId", verifyUser, getMembers);
router.post("/:projectId", verifyUser, addMember);

router.put("/:projectId/:memberId", verifyUser, updateMemberRole);
router.delete("/:projectId/:memberId", verifyUser, removeMember);

export default router;

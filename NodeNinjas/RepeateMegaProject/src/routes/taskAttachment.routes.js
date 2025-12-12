import express from "express";
import {
  uploadAttachment,
  deleteAttachment,
  getAttachments,
} from "../controllers/taskAttachment.controller.js";
import { verifyUser } from "../middlewares/verify.middlewares.js";
import { uploadSingle } from "../middlewares/upload.middlewares.js";

const router = express.Router();

router.post(
  "/:taskId/attachments",
  verifyUser,
  uploadSingle("file"),
  uploadAttachment,
);

router.get("/:taskId/attachments", verifyUser, getAttachments);

router.delete("/:taskId/attachments/:publicId", verifyUser, deleteAttachment);

export default router;

import mongoose from "mongoose";
import { Task } from "../models/task.models.js";
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "../utils/uploadToCloudinary.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { canModifyAttachment, canAccessProject } from "../utils/permissions.js";

export const uploadAttachment = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canModifyAttachment(req.user, task)))
    throw new ApiError(403, "You cannot upload attachment");

  if (!req.file) throw new ApiError(400, "File required");

  const uploaded = await uploadBufferToCloudinary(req.file.buffer);

  const attachment = {
    url: uploaded.secure_url,
    mimetype: req.file.mimetype,
    size: req.file.size,
    public_id: uploaded.public_id,
  };

  task.attachments.push(attachment);
  await task.save();

  return res
    .status(201)
    .json(new ApiResponse(201, attachment, "Attachment uploaded", true));
});

export const getAttachments = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canAccessProject(req.user, task.project)))
    throw new ApiError(403, "Not allowed");

  return res
    .status(200)
    .json(new ApiResponse(200, task.attachments, "Attachments fetched", true));
});

export const deleteAttachment = asyncHandler(async (req, res) => {
  const { taskId, publicId } = req.params;

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canModifyAttachment(req.user, task)))
    throw new ApiError(403, "Not allowed");

  let cloudId = publicId;
  if (!cloudId.startsWith("task_attachments/")) {
    cloudId = `task_attachments/${cloudId}`;
  }

  await deleteFromCloudinary(cloudId).catch(() => {});

  task.attachments = task.attachments.filter((a) => a.public_id !== cloudId);

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Attachment deleted", true));
});

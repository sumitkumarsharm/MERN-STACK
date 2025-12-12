import mongoose from "mongoose";
import { SubTask } from "../models/subtask.models.js";
import { Task } from "../models/task.models.js";
import { ProjectMemeber } from "../models/projectmember.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { isProjectAdmin } from "../utils/isProjectAdmin.js";

const isProjectMember = async (userId, projectId) => {
  const member = await ProjectMemeber.findOne({
    user: userId,
    project: projectId,
  });
  return !!member;
};

export const createSubTask = asyncHandler(async (req, res) => {
  const { title, taskId } = req.body;

  if (!title || !taskId) throw new ApiError(400, "title & taskId required");
  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Invalid taskId");

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  const isAdmin = await isProjectAdmin(req.user, task.project);
  const isAssignee = String(task.assignedTo) === String(req.user.userId);

  if (!isAdmin && !isAssignee)
    throw new ApiError(403, "Only assignee or admin can add subtasks");

  const subtask = await SubTask.create({
    title,
    task: taskId,
    createdBy: req.user.userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, subtask, "Subtask created", true));
});

export const getSubTasks = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Invalid taskId");

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  const isMember = await isProjectMember(req.user.userId, task.project);
  const isAdmin = req.user.role === "admin";

  if (!isMember && !isAdmin)
    throw new ApiError(403, "You are not allowed to view subtasks");

  const subtasks = await SubTask.find({ task: taskId }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, subtasks, "Subtasks fetched", true));
});

export const updateSubTask = asyncHandler(async (req, res) => {
  const { subtaskId } = req.params;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(subtaskId))
    throw new ApiError(400, "Invalid subtaskId");
  if (!title) throw new ApiError(400, "Title required");

  const subtask = await SubTask.findById(subtaskId);
  if (!subtask) throw new ApiError(404, "Subtask not found");

  const task = await Task.findById(subtask.task);
  if (!task) throw new ApiError(404, "Task not found");

  const isAdmin = await isProjectAdmin(req.user, task.project);
  const isAssignee = String(task.assignedTo) === String(req.user.userId);

  if (!isAdmin && !isAssignee)
    throw new ApiError(403, "Only assignee or admin can update subtask");

  subtask.title = title;
  await subtask.save();

  return res
    .status(200)
    .json(new ApiResponse(200, subtask, "Subtask updated", true));
});

export const toggleSubTask = asyncHandler(async (req, res) => {
  const { subtaskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(subtaskId))
    throw new ApiError(400, "Invalid subtaskId");

  const subtask = await SubTask.findById(subtaskId);
  if (!subtask) throw new ApiError(404, "Subtask not found");

  const task = await Task.findById(subtask.task);
  if (!task) throw new ApiError(404, "Task not found");

  const isAdmin = await isProjectAdmin(req.user, task.project);
  const isAssignee = String(task.assignedTo) === String(req.user.userId);

  if (!isAdmin && !isAssignee)
    throw new ApiError(403, "Only assignee or admin can complete subtask");

  subtask.isCompleted = !subtask.isCompleted;
  await subtask.save();

  return res
    .status(200)
    .json(new ApiResponse(200, subtask, "Subtask status updated", true));
});

export const deleteSubTask = asyncHandler(async (req, res) => {
  const { subtaskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(subtaskId))
    throw new ApiError(400, "Invalid subtaskId");

  const subtask = await SubTask.findById(subtaskId);
  if (!subtask) throw new ApiError(404, "Subtask not found");

  const task = await Task.findById(subtask.task);
  if (!task) throw new ApiError(404, "Task not found");

  const isAdmin = await isProjectAdmin(req.user, task.project);
  const isAssignee = String(task.assignedTo) === String(req.user.userId);

  if (!isAdmin && !isAssignee)
    throw new ApiError(403, "Only assignee or admin can delete subtask");

  await SubTask.findByIdAndDelete(subtaskId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Subtask deleted", true));
});

import mongoose from "mongoose";
import { SubTask } from "../models/subtask.models.js";
import { Task } from "../models/task.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { canAccessProject, canModifySubtask } from "../utils/permissions.js";

export const createSubTask = asyncHandler(async (req, res) => {
  const { title, taskId } = req.body;

  if (!title || !taskId) throw new ApiError(400, "title & taskId required");

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canModifySubtask(req.user, task)))
    throw new ApiError(403, "You cannot create subtask");

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

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canAccessProject(req.user, task.project)))
    throw new ApiError(403, "Not allowed");

  const subtasks = await SubTask.find({ task: taskId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, subtasks, "Subtasks fetched", true));
});

export const updateSubTask = asyncHandler(async (req, res) => {
  const { subtaskId } = req.params;
  const { title } = req.body;

  const subtask = await SubTask.findById(subtaskId);
  if (!subtask) throw new ApiError(404, "Subtask not found");

  const task = await Task.findById(subtask.task);

  if (!(await canModifySubtask(req.user, task)))
    throw new ApiError(403, "Not allowed");

  subtask.title = title;
  await subtask.save();

  return res
    .status(200)
    .json(new ApiResponse(200, subtask, "Subtask updated", true));
});

export const toggleSubTask = asyncHandler(async (req, res) => {
  const { subtaskId } = req.params;

  const subtask = await SubTask.findById(subtaskId);
  if (!subtask) throw new ApiError(404, "Subtask not found");

  const task = await Task.findById(subtask.task);

  if (!(await canModifySubtask(req.user, task)))
    throw new ApiError(403, "Not allowed");

  subtask.isCompleted = !subtask.isCompleted;
  await subtask.save();

  return res
    .status(200)
    .json(new ApiResponse(200, subtask, "Subtask status updated", true));
});

export const deleteSubTask = asyncHandler(async (req, res) => {
  const { subtaskId } = req.params;

  const subtask = await SubTask.findById(subtaskId);
  if (!subtask) throw new ApiError(404, "Subtask not found");

  const task = await Task.findById(subtask.task);

  if (!(await canModifySubtask(req.user, task)))
    throw new ApiError(403, "Not allowed");

  await SubTask.findByIdAndDelete(subtaskId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Subtask deleted", true));
});

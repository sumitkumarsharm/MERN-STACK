import mongoose from "mongoose";
import { Task } from "../models/task.models.js";
import { SubTask } from "../models/subtask.models.js";
import { ProjectMemeber } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  canEditTask,
  canUpdateStatus,
  canReassignTask,
  canAccessProject,
} from "../utils/permissions.js";

const isProjectMemberOrAdmin = async (reqUser, projectId) => {
  if (reqUser.role === "admin") return true;
  const member = await ProjectMemeber.findOne({
    user: reqUser.userId,
    project: projectId,
  });
  return !!member;
};

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, project, assignedTo, dueDate } = req.body;

  if (!title || !description || !project)
    throw new ApiError(400, "title, description and project are required");

  if (!mongoose.Types.ObjectId.isValid(project))
    throw new ApiError(400, "Invalid project id");

  const can = await isProjectMemberOrAdmin(req.user, project);
  if (!can) throw new ApiError(403, "You are not a member of this project");

  if (!assignedTo || !mongoose.Types.ObjectId.isValid(assignedTo))
    throw new ApiError(400, "Valid assignedTo userId required");

  const assignee = await User.findById(assignedTo);
  if (!assignee) throw new ApiError(404, "Assigned user not found");

  const assigneeIsMember = await ProjectMemeber.findOne({
    user: assignedTo,
    project,
  });
  if (!assigneeIsMember && req.user.role !== "admin")
    throw new ApiError(400, "Assigned user is not part of the project");

  const task = await Task.create({
    title,
    description,
    project,
    assignedTo,
    assignedBy: req.user.userId,
    dueDate: dueDate || null,
  });

  return res.status(201).json(new ApiResponse(201, task, "Task created", true));
});

export const getTasksByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new ApiError(400, "Invalid projectId");

  const can = await isProjectMemberOrAdmin(req.user, projectId);
  if (!can) throw new ApiError(403, "You are not a member of this project");

  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.min(100, parseInt(req.query.limit || "20"));
  const skip = (page - 1) * limit;

  const filter = { project: projectId };
  if (req.query.status) filter.status = req.query.status;

  const tasks = await Task.find(filter)
    .populate("assignedTo", "username email")
    .populate("assignedBy", "username email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments(filter);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { tasks, page, limit, total },
        "Tasks fetched",
        true,
      ),
    );
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Invalid taskId");

  const task = await Task.findById(taskId)
    .populate("assignedTo", "username email")
    .populate("assignedBy", "username email")
    .lean();

  if (!task) throw new ApiError(404, "Task not found");

  if (
    !(await canAccessProject(req.user, task.project)) &&
    String(task.assignedTo?._id || "") !== String(req.user.userId)
  )
    throw new ApiError(403, "Access denied");

  return res.status(200).json(new ApiResponse(200, task, "Task fetched", true));
});

export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Invalid taskId");

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canEditTask(req.user, task)))
    throw new ApiError(403, "Only assigner or admin can update task");

  const allowed = {};
  if (req.body.title) allowed.title = req.body.title;
  if (req.body.description) allowed.description = req.body.description;
  if (req.body.dueDate) allowed.dueDate = req.body.dueDate;
  if (Object.keys(allowed).length === 0)
    throw new ApiError(400, "Nothing to update");

  Object.assign(task, allowed);
  await task.save();

  const populated = await Task.findById(taskId).populate(
    "assignedTo assignedBy",
    "username email",
  );
  return res
    .status(200)
    .json(new ApiResponse(200, populated, "Task updated", true));
});

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Invalid taskId");
  if (!status) throw new ApiError(400, "Status required");

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canUpdateStatus(req.user, task)))
    throw new ApiError(403, "Only assignee or admin can update status");

  task.status = status;
  await task.save();

  const populated = await Task.findById(taskId).populate(
    "assignedTo assignedBy",
    "username email",
  );
  return res
    .status(200)
    .json(new ApiResponse(200, populated, "Task status updated", true));
});

export const reassignTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { newAssigneeId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Invalid taskId");
  if (!mongoose.Types.ObjectId.isValid(newAssigneeId))
    throw new ApiError(400, "Invalid newAssigneeId");

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canReassignTask(req.user, task)))
    throw new ApiError(403, "Only project admin can reassign task");

  const newAssignee = await User.findById(newAssigneeId);
  if (!newAssignee) throw new ApiError(404, "New assignee not found");

  const member = await ProjectMemeber.findOne({
    user: newAssigneeId,
    project: task.project,
  });
  if (!member)
    throw new ApiError(400, "New assignee is not a member of the project");

  task.assignedTo = newAssigneeId;
  await task.save();

  const populated = await Task.findById(taskId).populate(
    "assignedTo assignedBy",
    "username email",
  );
  return res
    .status(200)
    .json(new ApiResponse(200, populated, "Task reassigned", true));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId))
    throw new ApiError(400, "Invalid taskId");

  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (!(await canEditTask(req.user, task)))
    throw new ApiError(403, "Only assigner or admin can delete task");

  await Promise.all([
    Task.findByIdAndDelete(taskId),
    SubTask.deleteMany({ task: taskId }),
  ]);

  return res.status(200).json(new ApiResponse(200, null, "Task deleted", true));
});

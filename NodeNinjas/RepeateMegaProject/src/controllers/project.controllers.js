import mongoose from "mongoose";
import { Project } from "../models/project.models.js";
import { ProjectMemeber } from "../models/projectmember.models.js";
import { Task } from "../models/task.models.js";
import { ProjectNote } from "../models/note.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

import { canAccessProject, canManageProject } from "../utils/permissions.js";

export const getProjects = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.min(100, parseInt(req.query.limit || "20"));
  const skip = (page - 1) * limit;
  const search = (req.query.search || "").trim();

  const joined = await ProjectMemeber.find({ user: req.user.userId })
    .populate({
      path: "project",
      match: search ? { name: { $regex: search, $options: "i" } } : {},
    })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

  const projects = joined
    .map((entry) => entry.project)
    .filter((p) => p !== null);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { projects, page, limit }, "Projects fetched", true),
    );
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new ApiError(400, "Invalid projectId");

  if (!(await canAccessProject(req.user, projectId)))
    throw new ApiError(403, "Access denied");

  const project = await Project.findById(projectId).lean();
  if (!project) throw new ApiError(404, "Project not found");

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched", true));
});

export const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    throw new ApiError(400, "Name and description are required");

  const exists = await Project.findOne({ name });
  if (exists) throw new ApiError(400, "Project name already exists");

  const project = await Project.create({
    name,
    description,
    createdBy: req.user.userId,
  });

  await ProjectMemeber.create({
    user: req.user.userId,
    project: project._id,
    role: "admin",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully", true));
});

export const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new ApiError(400, "Invalid projectId");

  if (!(await canManageProject(req.user, projectId)))
    throw new ApiError(403, "Only admin can update project");

  const allowed = {};
  if (req.body.name) allowed.name = req.body.name;
  if (req.body.description) allowed.description = req.body.description;

  if (Object.keys(allowed).length === 0)
    throw new ApiError(400, "Nothing to update");

  const updated = await Project.findByIdAndUpdate(projectId, allowed, {
    new: true,
  });

  if (!updated) throw new ApiError(404, "Project not found");

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Project updated successfully", true));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new ApiError(400, "Invalid projectId");

  if (!(await canManageProject(req.user, projectId)))
    throw new ApiError(403, "Only admin can delete project");

  await Promise.all([
    Project.findByIdAndDelete(projectId),
    ProjectMemeber.deleteMany({ project: projectId }),
    Task.deleteMany({ project: projectId }),
    ProjectNote.deleteMany({ project: projectId }),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Project deleted successfully", true));
});

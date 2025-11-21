import { ProjectNote } from "../models/note.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMemeber } from "../models/projectmember.models.js";
import { Task } from "../models/task.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// get all projects
const getProjects = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const projects = await ProjectMemeber.find({ user: userId }).populate(
    "project",
  );

  const formatted = projects.map((pm) => pm.project);

  return res
    .status(200)
    .json(new ApiResponse(200, formatted, "Projects fetched successfully"));
});

// get project by id
const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json(new ApiError(404, "Project not found"));
  }

  const isMember = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
  });

  if (!isMember) {
    return res.status(403).json(new ApiError(403, "Access denied"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

// create project
const createProjects = asyncHandler(async (req, res) => {
  const { name, discription } = req.body;

  if (!name || !discription) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const existing = await Project.findOne({ name });
  if (existing) {
    return res
      .status(400)
      .json(new ApiError(400, "Project name already exists"));
  }

  const project = await Project.create({
    name,
    discription,
    createdBy: req.user.userId,
  });

  await ProjectMemeber.create({
    user: req.user.userId,
    project: project._id,
    role: "admin",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

// update projects
const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, discription } = req.body;

  if (!name || !discription) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can update project"));
  }

  const updated = await Project.findByIdAndUpdate(
    projectId,
    { name, discription },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Project updated successfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can delete project"));
  }

  await Project.findByIdAndDelete(projectId);
  await ProjectMemeber.deleteMany({ project: projectId });
  await Task.deleteMany({ project: projectId });
  await ProjectNote.deleteMany({ project: projectId });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Project deleted successfully"));
});

// add member to project
const addMemberToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can add members"));
  }

  const already = await ProjectMemeber.findOne({
    user: userId,
    project: projectId,
  });

  if (already) {
    return res.status(400).json(new ApiError(400, "User already added"));
  }

  const member = await ProjectMemeber.create({
    user: userId,
    project: projectId,
    role: role || "member",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, member, "Member added successfully"));
});

// project members
const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const members = await ProjectMemeber.find({ project: projectId }).populate(
    "user",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Members fetched successfully"));
});

// update MemberRole
const updateMemberRole = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;
  const { role } = req.body;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can update member role"));
  }

  const updated = await ProjectMemeber.findByIdAndUpdate(
    memberId,
    { role },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Role updated successfully"));
});

// update project members
const updateProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { members } = req.body;
  // members = [{ userId, role }, { userId, role }...]

  if (!members || !Array.isArray(members)) {
    return res.status(400).json(new ApiError(400, "Members array is required"));
  }

  // 1. Check kr rhe hai current user admin hai ya nhi
  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can update members"));
  }

  // 2. Delete old members
  await ProjectMemeber.deleteMany({ project: projectId });

  // 3. Insert new members
  const newMembers = members.map((m) => ({
    user: m.userId,
    project: projectId,
    role: m.role || "member",
  }));

  const insertedMembers = await ProjectMemeber.insertMany(newMembers);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        insertedMembers,
        "Project members updated successfully",
      ),
    );
});

// remove member
const removeMember = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin) {
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can remove members"));
  }

  await ProjectMemeber.findByIdAndDelete(memberId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Member removed successfully"));
});

export {
  getProjects,
  getProjectById,
  createProjects,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
  updateProjectMembers,
  updateMemberRole,
  removeMember,
};

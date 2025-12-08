import { ProjectNote } from "../models/note.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMemeber } from "../models/projectmember.models.js";
import { Task } from "../models/task.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const getProjects = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const joined = await ProjectMemeber.find({ user: userId })
    .populate("project")
    .sort({ updatedAt: -1 });

  const projects = [
    ...new Map(joined.map((p) => [p.project._id, p.project])).values(),
  ];

  return res
    .status(200)
    .json(
      new ApiResponse(200, projects, "Projects fetched successfully", true),
    );
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project)
    return res.status(404).json(new ApiError(404, "Project not found", false));

  const isMember = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
  });
  if (!isMember)
    return res.status(403).json(new ApiError(403, "Access denied", false));

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully", true));
});

const createProjects = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).json(new ApiError(400, "All fields are required"));

  const exists = await Project.findOne({ name });
  if (exists)
    return res
      .status(400)
      .json(new ApiError(400, "Project name already exists"));

  const project = await Project.create({
    name,
    description,
    createdBy: req.user.userId,
  });

  const admin = await ProjectMemeber.create({
    user: req.user.userId,
    project: project._id,
    role: "admin",
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { project, admin },
        "Project created successfully",
        true,
      ),
    );
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name, description } = req.body;

  if (!name || !description)
    return res.status(400).json(new ApiError(400, "All fields are required"));

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });
  if (!isAdmin)
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can update", false));

  const updated = await Project.findByIdAndUpdate(
    projectId,
    { name, description },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Project updated successfully", true));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });
  if (!isAdmin)
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can delete project", false));

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

const addMemberToProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });
  if (!isAdmin)
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can add members"));

  const exists = await ProjectMemeber.findOne({
    user: userId,
    project: projectId,
  });
  if (exists)
    return res.status(400).json(new ApiError(400, "User already in project"));

  const member = await ProjectMemeber.create({
    user: userId,
    project: projectId,
    role: role || "member",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, member, "Member added successfully", true));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const members = await ProjectMemeber.find({ project: projectId }).populate(
    "user",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Members fetched successfully", true));
});

const updateMemberRole = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;
  const { role } = req.body;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });
  if (!isAdmin)
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can change role"));

  const updateMemberRole = asyncHandler(async (req, res) => {
    const { projectId, memberId } = req.params;
    const { role } = req.body;

    // Admin check
    const isAdmin = await ProjectMemeber.findOne({
      user: req.user.userId,
      project: projectId,
      role: "admin",
    });

    if (!isAdmin) {
      return res
        .status(403)
        .json(new ApiError(403, "Only admin can update role"));
    }

    // Update & return full updated member with user data populated
    const updated = await ProjectMemeber.findByIdAndUpdate(
      memberId,
      { role },
      { new: true },
    ).populate("user", "name email _id"); // 🔥 now data return always

    if (!updated) {
      return res.status(404).json(new ApiError(404, "Member not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Role updated successfully", true));
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Role updated", true));
});

const updateProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { members } = req.body;

  if (!Array.isArray(members))
    return res.status(400).json(new ApiError(400, "Members array required"));

  if (!members.some((m) => m.role === "admin"))
    return res.status(400).json(new ApiError(400, "At least 1 admin required"));

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });
  if (!isAdmin)
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can update members"));

  await ProjectMemeber.deleteMany({ project: projectId });

  const inserted = await ProjectMemeber.insertMany(
    members.map((m) => ({
      user: m.userId,
      project: projectId,
      role: m.role || "member",
    })),
  );

  return res
    .status(200)
    .json(new ApiResponse(200, inserted, "Members updated successfully", true));
});

const removeMember = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });
  if (!isAdmin)
    return res
      .status(403)
      .json(new ApiError(403, "Only admin can remove members"));

  await ProjectMemeber.findByIdAndDelete(memberId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Member removed", true));
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

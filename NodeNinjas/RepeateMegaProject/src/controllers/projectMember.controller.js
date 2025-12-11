import { ProjectMemeber } from "../models/projectmember.models.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// Add Member
const addMember = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin)
    return res.status(403).json(new ApiError(403, "Only admin can add"));

  const exists = await ProjectMemeber.findOne({
    user: userId,
    project: projectId,
  });

  if (exists)
    return res.status(400).json(new ApiError(400, "User already added"));

  const member = await ProjectMemeber.create({
    user: userId,
    project: projectId,
    role: role || "member",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, member, "Member added", true));
});

// Update Role
const updateMemberRole = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;
  const { role } = req.body;

  if (!role) return res.status(400).json(new ApiError(400, "Role is required"));

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin)
    return res.status(403).json(new ApiError(403, "Only admin can update"));

  const updated = await ProjectMemeber.findByIdAndUpdate(
    memberId,
    { role },
    { new: true },
  ).populate("user", "username email");

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Role updated", true));
});

// Get Members
const getMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const members = await ProjectMemeber.find({ project: projectId }).populate(
    "user",
    "username email avatar role",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Members fetched", true));
});

// Remove Member
const removeMember = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;

  const isAdmin = await ProjectMemeber.findOne({
    user: req.user.userId,
    project: projectId,
    role: "admin",
  });

  if (!isAdmin)
    return res.status(403).json(new ApiError(403, "Only admin can remove"));

  await ProjectMemeber.findByIdAndDelete(memberId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Member removed", true));
});

export { addMember, updateMemberRole, getMembers, removeMember };

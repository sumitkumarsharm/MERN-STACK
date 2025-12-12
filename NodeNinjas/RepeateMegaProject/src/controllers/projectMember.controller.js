import mongoose from "mongoose";
import { ProjectMemeber } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js";

import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

import { canAccessProject, canManageProject } from "../utils/permissions.js";

export const addMember = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new ApiError(400, "Invalid projectId");

  if (!mongoose.Types.ObjectId.isValid(userId))
    throw new ApiError(400, "Invalid userId");

  if (!(await canManageProject(req.user, projectId)))
    throw new ApiError(403, "Only admin can add members");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const exists = await ProjectMemeber.findOne({
    user: userId,
    project: projectId,
  });
  if (exists) throw new ApiError(400, "User already added");

  const member = await ProjectMemeber.create({
    user: userId,
    project: projectId,
    role: role || "member",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, member, "Member added successfully", true));
});

export const getMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new ApiError(400, "Invalid projectId");

  if (!(await canAccessProject(req.user, projectId)))
    throw new ApiError(403, "Not authorized to view project members");

  const members = await ProjectMemeber.find({ project: projectId }).populate(
    "user",
    "username email role",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, members, "Members fetched successfully", true));
});

export const updateMemberRole = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;
  const { role } = req.body;

  if (!role) throw new ApiError(400, "Role is required");

  if (!mongoose.Types.ObjectId.isValid(memberId))
    throw new ApiError(400, "Invalid memberId");

  if (!(await canManageProject(req.user, projectId)))
    throw new ApiError(403, "Only admin can update roles");

  const updated = await ProjectMemeber.findByIdAndUpdate(
    memberId,
    { role },
    { new: true },
  ).populate("user", "username email role");

  if (!updated) throw new ApiError(404, "Member not found");

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Member role updated", true));
});

export const removeMember = asyncHandler(async (req, res) => {
  const { projectId, memberId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(memberId))
    throw new ApiError(400, "Invalid memberId");

  if (!(await canManageProject(req.user, projectId)))
    throw new ApiError(403, "Only admin can remove members");

  await ProjectMemeber.findByIdAndDelete(memberId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Member removed successfully", true));
});

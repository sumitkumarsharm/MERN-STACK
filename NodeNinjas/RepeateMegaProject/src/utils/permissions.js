import { ProjectMemeber } from "../models/projectmember.models.js";
import { isProjectAdmin } from "./isProjectAdmin.js";

export const canAccessProject = async (user, projectId) => {
  if (user.role === "admin") return true;

  const member = await ProjectMemeber.findOne({
    user: user.userId,
    project: projectId,
  });

  return !!member;
};

export const canManageProject = async (user, projectId) => {
  return await isProjectAdmin(user, projectId);
};

export const canEditTask = async (user, task) => {
  const isAdmin = await isProjectAdmin(user, task.project);
  const isAssigner = String(task.assignedBy) === String(user.userId);
  return isAdmin || isAssigner;
};

export const canUpdateStatus = async (user, task) => {
  const isAssignee = String(task.assignedTo) === String(user.userId);
  const isAdmin = user.role === "admin";
  return isAssignee || isAdmin;
};

export const canReassignTask = async (user, task) => {
  return await isProjectAdmin(user, task.project);
};

export const canModifySubtask = async (user, task) => {
  const isAdmin = await isProjectAdmin(user, task.project);
  const isAssignee = String(task.assignedTo) === String(user.userId);
  return isAdmin || isAssignee;
};

export const canModifyAttachment = async (user, task) => {
  const isAdmin = await isProjectAdmin(user, task.project);
  const isAssigner = String(task.assignedBy) === String(user.userId);
  const isAssignee = String(task.assignedTo) === String(user.userId);
  return isAdmin || isAssigner || isAssignee;
};

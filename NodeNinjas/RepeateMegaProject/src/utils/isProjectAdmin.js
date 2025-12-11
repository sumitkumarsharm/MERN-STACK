import { ProjectMemeber } from "../models/projectmember.models.js";

export const isProjectAdmin = async (reqUser, projectId) => {
  if (!projectId) return false;

  if (reqUser.role === "admin") return true;

  const member = await ProjectMemeber.findOne({
    user: reqUser.userId,
    project: projectId,
    role: { $regex: /^admin$/i },
  });

  return !!member;
};

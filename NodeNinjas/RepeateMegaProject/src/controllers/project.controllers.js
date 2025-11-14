const getProjects = asyncHandler(async (req, res) => {});
const getProjectById = asyncHandler(async (req, res) => {});
const createProjects = asyncHandler(async (req, res) => {});
const updateProject = asyncHandler(async (req, res) => {});
const deleteProject = asyncHandler(async (req, res) => {});
const addMemberToProject = asyncHandler(async (req, res) => {});
const getProjectMembers = asyncHandler(async (req, res) => {});
const updateProjectMembers = asyncHandler(async (req, res) => {});
const updateMemberRole = asyncHandler(async (req, res) => {});
const removeMember = asyncHandler(async (req, res) => {});

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

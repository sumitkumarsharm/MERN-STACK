import { ApiResponse } from "../utils/api-response.js";
const helthCheck = async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "server is running" }));
};

export { helthCheck };

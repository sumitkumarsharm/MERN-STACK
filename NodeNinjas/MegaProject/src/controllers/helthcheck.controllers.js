import { ApiResponse } from "../utils/api-response.js";
const helthCheck = async (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, { message: "server is running" }));
  } catch (error) {
    
  }
};

export { helthCheck };

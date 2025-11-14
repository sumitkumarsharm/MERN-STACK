import { asyncHandler } from "../utils/async-handler.js";

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
export { register };

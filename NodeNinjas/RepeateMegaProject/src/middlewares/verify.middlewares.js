import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";

const verifyUser = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded.id).select(
    "-password -emailVerificationToken -forgotPasswordToken",
  );

  if (!user) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }

  req.user = user;
  next();
});

export { verifyUser };

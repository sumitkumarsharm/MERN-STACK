import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";

const verifyUser = asyncHandler(async (req, res, next) => {
  let token;

  // 1. token cookie or authorization header se aa rha hai kya
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (
    req.headers?.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. Token hai ya nhi
  if (!token) {
    return res.status(401).json(new ApiError(401, "Unauthorized"));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).json(new ApiError(401, "Invalid or expired token"));
  }

  // 3. check user hai ya nhi
  const user = await User.findById(decoded.id).select(
    "-password -emailVerificationToken -forgotPasswordToken",
  );

  if (!user) {
    return res.status(401).json(new ApiError(401, "User not found"));
  }

  req.user = user;
  req.userId = user._id;

  next();
});

export { verifyUser };

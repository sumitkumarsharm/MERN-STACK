import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";

const verifyUser = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json(new ApiError(401, "Unauthorized - No Token Provided"));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    return res.status(401).json(new ApiError(401, "Invalid or Expired Token"));
  }

  const userId = decoded.id || decoded._id;

  const user = await User.findById(userId).select(
    "-password -emailVerificationToken -forgotPasswordToken",
  );

  if (!user) return res.status(401).json(new ApiError(401, "User not found"));

  req.user = {
    ...user._doc,
    id: user._id,
    userId: user._id,
  };

  next();
});

export { verifyUser };

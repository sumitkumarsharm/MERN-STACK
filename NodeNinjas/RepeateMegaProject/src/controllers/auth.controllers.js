import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import dotenv from "dotenv";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import {
  emailVerifyContent,
  forgetPasswordContent,
  sendMail,
} from "../utils/mail.js";

dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json(new ApiError(409, "User already exists"));
  }

  const user = await User.create({
    email,
    password,
    firstname,
    lastname,
    username,
    role,
    mobile,
  });

  const { unHeshedToken, tokenExpiry } = user.generateVerificationToken();

  user.emailVerificationToken = unHeshedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;

  await user.save();

  // user email token
  const verifyUrl = `${process.env.BASE_URL}/api/v1/auth/verify-email/${unHeshedToken}`;
  // send verification email
  await sendMail({
    email,
    subject: "Email Verification",
    mailGenContent: emailVerifyContent(username, verifyUrl),
  });

  const sanitizedUser = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", sanitizedUser));
});

// <------------------ verifiation ------------------>

const verifyUserEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found", false));
  }

  if (user.emailVerificationTokenExpiry < Date.now()) {
    return res.status(400).json(new ApiError(400, "Token expired", false));
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiry = undefined;
  user.isEmailVerified = true;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Email verified successfully", true));
});

// <----------------------- Login User ----------------------->

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found", false));
  }

  const ok = await user.isPasswordMatched(password);

  if (!ok) {
    return res
      .status(404)
      .json(new ApiError(404, "Invalid credentials", false));
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: true,
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "strict",
  });

  const sanitizedUser = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged in successfully", sanitizedUser));
});

// <----------------------- logOutUser ----------------------->

const logOutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res
      .status(200)
      .json(new ApiResponse(200, "User already logged out", true));
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found", false));
  }

  user.refreshToken = "";

  await user.save({ validateBeforeSave: false });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully", true));
});

// <----------------------- resendVerificationEmail ----------------------->
const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json(new ApiResponse(200, "User not found", true));
  }

  if (user.isEmailVerified) {
    return res
      .status(400)
      .json(new ApiError(400, "Email already verified", false));
  }

  const { unHeshedToken, tokenExpiry } = user.generateVerificationToken();

  user.emailVerificationToken = unHeshedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${process.env.BASE_URL}/api/v1/auth/verify-email/${unHeshedToken}`;

  await sendMail({
    email: email,
    subject: "Email Verification",
    mailGenContent: emailVerifyContent(user.username, verifyUrl),
  });

  const sanitizedUser = {
    _id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Verification email sent successfully",
        sanitizedUser,
      ),
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, "Unauthorized - Refresh token missing");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "Unauthorized - User not found");
  }
  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Refresh token mismatch");
  }

  const newRefreshToken = user.generateRefreshToken();
  const newAccessToken = user.generateAccessToken();

  user.refreshToken = newRefreshToken;

  await user.save({ validateBeforeSave: false });

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: true,
    sameSite: "strict",
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Access token refreshed successfully"));
});

const forgetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json(new ApiResponse(200, "User not found", true));
  }

  const { unHeshedToken, tokenExpiry } = user.generateVerificationToken();

  user.forgotPasswordToken = unHeshedToken;
  user.forgotPasswordTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password/${unHeshedToken}`;

  await sendMail({
    email: email,
    subject: "Password Reset",
    mailGenContent: forgetPasswordContent(user.username, resetUrl),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset email sent successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(200).json(new ApiResponse(200, "User not found", true));
  }

  const isPasswordMatched = await user.isPasswordMatched(currentPassword);

  if (!isPasswordMatched) {
    return res
      .status(400)
      .json(new ApiError(400, "Current password is incorrect", false));
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  console.log(token);

  const user = await User.findOne({ forgotPasswordToken: token });

  if (!user) {
    return res.status(200).json(new ApiResponse(200, "User not found", true));
  }

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(200).json(new ApiResponse(200, "User not found", true));
  }

  return res.status(200).json(new ApiResponse(200, "User found", user));
});

export {
  registerUser,
  loginUser,
  logOutUser,
  verifyUserEmail,
  resendVerificationEmail,
  refreshAccessToken,
  forgetPasswordRequest,
  changeCurrentPassword,
  resetPassword,
  getCurrentUser,
};

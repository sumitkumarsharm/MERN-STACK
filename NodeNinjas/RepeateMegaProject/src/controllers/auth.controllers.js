import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import crypto from "crypto";
import dotenv from "dotenv";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerifyContent, sendMail } from "../utils/mail.js";

dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json(new ApiResponse(409, "User already exists"));
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

  const { unHeshedToken, hashedToken, tokenExpiry } =
    user.generateVerificationToken();

  user.emailVerificationToken = hashedToken;
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

const verifyUserEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log(token);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
const logOutUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
const forgetPasswordRequest = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
const getCurrentUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
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
  getCurrentUser,
};

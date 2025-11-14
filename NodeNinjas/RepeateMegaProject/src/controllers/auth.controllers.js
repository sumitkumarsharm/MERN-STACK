import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

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

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
const logOutUser = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, username, role, mobile } =
    req.body;
});
const verifyUserEmail = asyncHandler(async (req, res) => {
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

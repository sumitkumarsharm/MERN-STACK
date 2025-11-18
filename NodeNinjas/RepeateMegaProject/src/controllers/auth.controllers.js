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
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log("user ----> ", user);

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found", false));
  }

  const isPasswordMatched = await user.isPasswordMatched(password);

  if (!isPasswordMatched) {
    return res
      .status(401)
      .json(new ApiError(401, "Invalid credentials", false));
  }

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
  const { user } = req.body;
});

// const resendVerificationEmail = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname, username, role, mobile } =
//     req.body;
// });
// const refreshAccessToken = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname, username, role, mobile } =
//     req.body;
// });
// const forgetPasswordRequest = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname, username, role, mobile } =
//     req.body;
// });
// const changeCurrentPassword = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname, username, role, mobile } =
//     req.body;
// });
// const getCurrentUser = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname, username, role, mobile } =
//     req.body;
// });
export {
  registerUser,
  loginUser,
  // logOutUser,
  verifyUserEmail,
  // resendVerificationEmail,
  // refreshAccessToken,
  // forgetPasswordRequest,
  // changeCurrentPassword,
  // getCurrentUser,
};

import { Router } from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import {
  userLoginValidatorSchema,
  userRegistrationValidatorSchema,
} from "../validators/auth.velidators.js";
import {
  forgetPasswordRequest,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
  resendVerificationEmail,
  verifyUserEmail,
} from "../controllers/auth.controllers.js";
import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = Router();

router.post(
  "/register",
  userRegistrationValidatorSchema(),
  validate,
  registerUser,
);

router.post("/verify-email/:token", verifyUserEmail);

router.post("/login", userLoginValidatorSchema(), validate, loginUser);
router.post("/logout", verifyUser, logOutUser);
router.post("/resend-verification-mail", resendVerificationEmail);
router.post("/refresh", refreshAccessToken);
router.post("/forget-password", verifyUser, forgetPasswordRequest);

export default router;

import { Router } from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import {
  userLoginValidatorSchema,
  userRegistrationValidatorSchema,
} from "../validators/auth.velidators.js";
import {
  loginUser,
  logOutUser,
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

export default router;

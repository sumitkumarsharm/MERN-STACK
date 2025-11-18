import { Router } from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import {
  userLoginValidatorSchema,
  userRegistrationValidatorSchema,
} from "../validators/auth.velidators.js";
import {
  loginUser,
  registerUser,
  verifyUserEmail,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post(
  "/register",
  userRegistrationValidatorSchema(),
  validate,
  registerUser,
);

router.post("/verify-email/:token", verifyUserEmail);

router.post("/login", userLoginValidatorSchema(), validate, loginUser);

export default router;

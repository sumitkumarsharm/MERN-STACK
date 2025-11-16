import { Router } from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import { userRegistrationValidatorSchema } from "../validators/auth.velidators.js";
import {
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

export default router;

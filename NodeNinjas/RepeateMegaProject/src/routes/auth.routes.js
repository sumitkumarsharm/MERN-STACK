import { Router } from "express";
import { validate } from "../middlewares/validate.middlewares.js";
import { userRegistrationValidatorSchema } from "../validators/auth.velidators.js";
import { registerUser } from "../controllers/auth.controllers.js";

const router = Router();

router.post(
  "/register",
  userRegistrationValidatorSchema(),
  validate,
  registerUser,
);

export default router;

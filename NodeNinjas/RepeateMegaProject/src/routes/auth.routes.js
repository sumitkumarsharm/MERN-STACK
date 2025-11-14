import { Router } from "express";
import { register } from "../controllers/auth.controllers.j";
import { validate } from "../middlewares/validate.middlewares.js";
import { userRegistrationValidatorSchema } from "../validators/auth.velidators.js";

const router = Router();

// router.post("/register", userRegistrationValidatorSchema(), validate, );

export default router;

// jitn tum kam code likhoge utna behtr hoga
// error handling
// validation
// js - logic express -> docs

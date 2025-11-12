import { Router } from "express";
import { register } from "../controllers/auth.controllers.j";
import { validate } from "../middlewares/validate.middlewares.js";

const router = Router();

router.post("/register", register);

export default router;

import {Router} from "express";
import { registerUser } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", registerUser)

export default router;

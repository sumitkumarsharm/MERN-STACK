import express from "express";
import { login, registerUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/register", registerUser);
router.get("/login", login);

export default router;

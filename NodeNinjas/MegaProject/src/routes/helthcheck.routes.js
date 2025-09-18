import {Router} from "express";
import { helthCheck } from "../controllers/helthcheck.controllers.js";

const router = Router();

router.get("/",helthCheck)
// another syntext for writting router
// router.route("/").get(helthCheck)

export default router;

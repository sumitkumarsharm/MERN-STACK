import { Router } from "express";
import {
  CreateNote,
  deleteNote,
  GetNotesByProject,
  getSingleNote,
  updateNote,
} from "../controllers/note.controllers.js";
import { verifyUser } from "../middlewares/verify.middlewares.js";

const router = Router();

router.post("/", verifyUser, CreateNote);

router.get("/:projectId", GetNotesByProject);

router.get("/note/:noteId", getSingleNote);

router.patch("/:noteId", updateNote);

router.delete("/:noteId", deleteNote);

export default router;

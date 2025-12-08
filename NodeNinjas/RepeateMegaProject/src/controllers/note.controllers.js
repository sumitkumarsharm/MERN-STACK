import { ProjectNote } from "../models/note.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const CreateNote = asyncHandler(async (req, res) => {
  const { content, projectId } = req.body;
  const userId = req.user.id;

  if (!content || !projectId) {
    return res
      .status(400)
      .json(new ApiError(400, "Content & Project ID required", false));
  }

  const note = await ProjectNote.create({
    content,
    project: projectId,
    createdBy: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, note, "Note created successfully", true));
});

const GetNotesByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const notes = await ProjectNote.find({ project: projectId })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, notes, "Notes fetched successfully", true));
});

const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;

  const note = await ProjectNote.findById(noteId);
  if (!note)
    return res.status(404).json(new ApiError(404, "Note not found", false));

  if (note.createdBy.toString() !== req.user.id) {
    return res.status(403).json(new ApiError(403, "Not authorized", false));
  }

  if (content) note.content = content;
  await note.save();

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note updated successfully", true));
});

const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const note = await ProjectNote.findById(noteId);
  if (!note)
    return res.status(404).json(new ApiError(404, "Note not found", false));

  if (note.createdBy.toString() !== req.user.id) {
    return res.status(403).json(new ApiError(403, "Not authorized", false));
  }

  await ProjectNote.findByIdAndDelete(noteId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Note deleted successfully", true));
});

const getSingleNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const note = await ProjectNote.findById(noteId).populate(
    "createdBy",
    "name email",
  );

  if (!note)
    return res.status(404).json(new ApiError(404, "Note not found", false));

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note retrieved successfully", true));
});

export { CreateNote, GetNotesByProject, updateNote, deleteNote, getSingleNote };

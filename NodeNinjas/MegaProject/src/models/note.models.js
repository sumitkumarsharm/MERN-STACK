import mongoose from "mongoose";

const projectNoteSchema = new mongoose.Schema({})

const ProjectNote = mongoose.model("projectNote", projectNoteSchema)
export default ProjectNote
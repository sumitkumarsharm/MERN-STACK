import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({})

const Project = mongoose.model("project", projectSchema)
export default Project
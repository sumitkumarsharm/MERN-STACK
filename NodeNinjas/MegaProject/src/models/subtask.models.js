import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({})

const SubTask = mongoose.model("SubTask", subTaskSchema)
export default SubTask 
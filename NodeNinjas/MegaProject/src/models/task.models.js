import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({})

const Task = mongoose.model("Task", taskSchema)
export default Task 
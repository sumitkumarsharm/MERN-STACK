import mongoose from "mongoose";
import {AvialableTaskStatus,taskStatusEnum} from "../utils/constants.js"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status :{
        type : String,
        enum : AvialableTaskStatus,
        default : taskStatusEnum.TODO
    }
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;

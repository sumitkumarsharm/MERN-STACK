import mongoose from "mongoose";
import {AvialableUserRole, userRolesEnum} from "../utils/constants.js"
const projectMemberSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    role : {
        type: String,
        enum : AvialableUserRole,
        default: userRolesEnum.MEMBER,
        required: true
    }
}, {timestamps: true})

const ProjectMember = mongoose.model("projectMember", projectMemberSchema)
export default projectMember 
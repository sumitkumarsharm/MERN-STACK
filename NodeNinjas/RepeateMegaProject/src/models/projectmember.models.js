import mongoose, { Schema } from "mongoose";
import { AvailableUserRole, UserRoleEnum } from "../utils/constants";

const projectMemeberSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    project :{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    role : {
        type : String,
        enum : AvailableUserRole,
        default: UserRoleEnum.MEMBER,
        required : true
    }
},{timestamps:true})

export const ProjectMemeber = mongoose.model('ProjectMemeber', projectMemeberSchema)
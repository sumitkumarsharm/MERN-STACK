import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name :{
        String,
        required : true,
        unique : true,
        trim : true
    },
    discription:{
        type : String,
        required : true
    },
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

},
{timestamps: true})

const Project = mongoose.model("Project", projectSchema)
export default Project
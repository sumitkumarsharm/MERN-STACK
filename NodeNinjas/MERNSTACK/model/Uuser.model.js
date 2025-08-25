import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: true
    },
    resetPasswordExpiry: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

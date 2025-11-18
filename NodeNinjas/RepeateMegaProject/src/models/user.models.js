import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { AvailableUserRole, UserRoleEnum } from "../utils/constants.js";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        loaclpath: String,
      },
      default: {
        url: "https://placehold.com/600x400",
        loaclpath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRole,
      default: UserRoleEnum.MEMBER,
    },
    mobile: {
      type: String,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: Boolean,
      default: false,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

// making hooks

// hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// comparing password
userSchema.methods.isPasswordMatched = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generating generateAccessToken
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

// generating refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
};

// generating verification token
userSchema.methods.generateVerificationToken = function () {
  const unHeshedToken = crypto.randomBytes(32).toString("hex");

  const tokenExpiry = Date.now() + 30 * 60 * 1000;

  return {
    tokenExpiry,
    unHeshedToken,
  };
};

export const User = mongoose.model("User", userSchema);

import { log } from "console";
import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

// User Registration
const registerUser = async (req, res) => {

    // All steps for user registration
    // get data
    // validate data // validate mean user email sahi hai ya nhi password hai ya nhi hai
    // check if data is already registered ot not
    // create a user in database
    // create a verification token
    // save the token into database 
    // send the token as  email to user
    // send the sucess status to user

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {

        // check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(401).json({
                message: "User Already Exists"
            });
        }

        // create user in database
        const user = await User.create({
            name,
            email,
            password
        })

        // check if user is created or not in databse
        if (!user) {
            return res.status(400).json({
                message: "User Registration Failed"
            });
        }

        // creating Token using crypto 
        const Token = crypto.randomBytes(32).toString("hex");

        user.verificationToken = Token;

        // console.log(Token);


        // saving user to databse
        await user.save();

        // sending Gmail to user
        // Create a transporter for SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });


        // Create the email options
        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "Please verify your email",
            text: `please click on the following link : ${process.env.BASE_URL}/api/users/verify/${Token}`,
            html: `<p>Your verification token is <strong>${Token}</strong></p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions)

        // Sending response
        res.status(201).json({
            message: "User Registered Successfully. Please check your email to verify your account.",
            success: true,

        });


        // handling error
    } catch (error) {
        res.status(400).json({
            message: "User not registered",
            success: false,
            error: error.message
        });
    }
};

// User verification
const verifyUser = async (req, res) => {
    // get data from url
    // validate
    // find user based on token
    // is verified field  to true
    // remove verification token
    // save the user
    // return sucess message

    const { token } = req.params;


    if (!token) {
        res.status(400).json({
            message: "Invalid Token",
            success: false
        });
    }

    const user = await User.findOne({ verificationToken: token })

    if (!user) {
        res.status(400).json({
            message: "Invalid Token",
            success: false
        });
    }
    user.isVerified = true;
    user.verificationToken = undefined

    await user.save();

    res.status(200).json({
        message: "User verified successfully",
        success: true
    });
}

const loginUser = async (req, res) => {
    // get the data
    // validate the data
    // find the data to database
    // check password matched or not
    // create and send token

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: "Email and password are required",
            success: false
        });
    }


    // verifing the user


    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password",
                success: false
            });
        }


        if (!user.isVerified) {
            return res.status(401).json({
                message: "Please verify your email",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        // console.log(isMatch);

        if (!isMatch) {
            return res.status(404).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: "1h" })
        // console.log(token);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 3600000 // 1 hour
        }

        res.cookie("token", token, cookieOptions);


        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                isVerified: user.isVerified,

            }
        });

    } catch (error) {
        res.status(401).json({
            message: "Login failed",
            success: false,
            error: error.message
        });

    }

}


// profile controller
const getMe = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password");

        console.log("Servide");

        if (!user) {
            console.log("Hello");

            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        return res.status(200).json(
            {
                message: "User found successfully",
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    isVerified: user.isVerified,
                }
            })

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        })

    }
}

const logOutUser = async (req, res) => {

    try {
        res.cookie.Token = null
        res.status(200).json({
            message: "Logout successful",
            success: true,
        })
        console.log(res.cookie);

    } catch (error) {
        res.status(500).json({
            message: "Logout failed",
            success: false,
            error: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    // get the email
    // validate the email
    // find the user based on email
    // create reset password token + expiration time
    // send email to user
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({
            message: "Email is required",
            success: false
        });
    }
    try {
        const user = await User.findOne({ email });
        console.log(" forgotcontroller User found :-->", user);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        // create reset password token + expiration time
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        console.log("resetPasswordToken forgotcontroller : --->", resetPasswordToken);

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes



        // save the user
        await user.save();

        // send email to user
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });


        // Create the email options
        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "Please verify your email",
            text: `please click on the following link : ${process.env.BASE_URL}/api/users/resetpassword/${resetPasswordToken}`,
            html: `<p>Your verification token is <strong>${resetPasswordToken}</strong></p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions)

        // const resetPasswordUrl = `http://localhost:3000/resetpassword/${resetPasswordToken}`;
        // await sendEmail(user.email, "Password Reset", `Click on the link to reset your password: ${resetPasswordUrl}`);

        return res.status(200).json({
            message: "Password reset email sent",
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
}

const resetPassword = async (req, res) => {

    // get the token and new password from url and body
    // validate the data
    // find the user based on token and make sure token is not expired

    const { token } = req.params;
    const { password } = req.body;

    console.log("Token  resetPassword: --->", token);
    console.log("New Password  resetPassword: --->", password);

    try {
        if (!token || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        console.log("User found  resetPassword: --->", user);

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired token",
                success: false,
                user
            });
        }

        // update the password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        // send success message
        return res.status(200).json({
            message: "Password reset successful",
            success: true,
            user
        });

    } catch (error) {

    }
}

export { registerUser, verifyUser, loginUser, getMe, logOutUser, resetPassword, forgotPassword };

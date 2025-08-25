import { log } from "console";
import User from "../model/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// User Registration
const registerUser = async (req, res) => {

    // All steps for user registration
    // get data
    // validate data
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


        console.log(user);
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
            text: `please click on the following link : ${process.env.BASE_URL}/api/user/verify/${Token}`,
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
    console.log(token);
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


export { registerUser, verifyUser };

import { PrismaClient } from "@prisma/client/extension";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
// ye upar rhega kyu ki yahi sab kuchh krta hai baat krta check krta hai update krta hai
const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || phone) {
    console.log("Please provide all the required fields");

    return res.status(400).json({
      status: "fail",
      message: "Please provide all the required fields",
      success: false,
    });
  }

  try {
    const existingUser = await prisma.user.findUique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
        success: false,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        hashedPassword,
        verificationToken,
      },
    });

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
    await transporter.sendMail(mailOptions);

    // saving user to db
  } catch (error) {}
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
      success: false,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User does not exist",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if(!isMatch){
      return res.status(400).json({
        status: "fail",
        message: "Invalid username and Password",
        success: false,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true
    }
    res.cookie("token",token,cookieOptions)

    return res.status(201).json({
      status: "success",
      message: "User logged in successfully",
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token
    });


  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
      success: false,
    });
  }
};

import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { ApiError } from "./api-error.js";

export const sendMail = async (options) => {
  const generateMail = new Mailgen({
    theme: "default",
    product: {
      name: "Task Management System",
      link: "https://mailgen.js/",
    },
  });

  const planeText = generateMail.generatePlaintext(options.mailGenContent);
  const htmlText = generateMail.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailDetails = {
    from: process.env.MAILTRAP_SENDEREMAIL,
    to: options.email,
    subject: options.subject,
    text: planeText,
    html: htmlText,
  };

  try {
    await transporter.sendMail(mailDetails);
  } catch (error) {
    throw new ApiError(500, "Failed to send email", error);
  }
};

// reuseable factory function for mail template
const buildEmailTemplate = (username, intro, buttonText, actionUrl, outro) => ({
  body: {
    name: username,
    intro,
    action: {
      instructions: "Please click the button below:",
      button: {
        color: "#22BC66",
        text: buttonText,
        link: actionUrl,
      },
    },
    outro,
  },
});

export const emailVerifyContent = (username, verificationUrl) => {
  return buildEmailTemplate(
    username,
    "Welcome! Please verify your email to activate your Task Management System account.",
    "Verify Email",
    verificationUrl,
    "If you did not create this account, please ignore this message.",
  );
};

const forgetPasswordContent = (username, resetUrl) => {
  return buildEmailTemplate(
    username,
    "We received a request to reset your password for your Task Management System account.",
    "Reset Password",
    resetUrl,
    "If you did not request a password reset, you can ignore this email.",
  );
};

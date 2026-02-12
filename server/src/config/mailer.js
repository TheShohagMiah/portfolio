import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // Make sure these match the names in your .env file exactly
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_USER_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Nothing website" <${process.env.SMTP_USER_EMAIL}>`,
    to,
    subject,
    html,
  });
};

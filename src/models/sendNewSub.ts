require("dotenv").config();
import nodemailer from "nodemailer";
import fs from "fs";

const transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
  user: process.env.MAIL,
  pass: process.env.MAIL_PASS,
 },
});
const sendEmailNew = async (toEmail: string): Promise<void> => {
 try {
  const htmlTemplate = fs.readFileSync("./Emails/newSub.html", "utf-8");
  const mailOptions = {
   from: process.env.MAIL,
   to: toEmail,
   subject: "Welcome To NewsLetter",
   html: htmlTemplate,
  };
  await transporter.sendMail(mailOptions);
 } catch (error) {
  console.log("Error Sending Email", error);
 }
};

export default sendEmailNew;

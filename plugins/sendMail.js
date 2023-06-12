import fp from "fastify-plugin";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import url, { fileURLToPath } from "url";
import fs from "fs";
dotenv.config();

export default fp(async (fastify, opts) => {
  fastify.decorate("sendMailOtp", async (to, otp) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const __fileName = fileURLToPath(import.meta.url);
      // const templatePath = path.join(__dirname, "../templates/otpFormat.ejs");
      const __dirname = path.dirname(__fileName);
      const templatePath = path.join(__dirname, "../templates/otpFormat.ejs");
      const template = fs.readFileSync(templatePath, "utf8");
      const renderedTemplate = ejs.render(template, { otp });

      let send = await transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        subject: "OTP Verification Code from Todo App",
        html: renderedTemplate,
      });

      console.log("Message sent: %s", send.messageId);
    } catch (err) {
      console.log(err);
    }
  });

  fastify.decorate("sendMailWelcome", async (to) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const name = to.split("@")[0];

      const __fileName = fileURLToPath(import.meta.url);
      // const templatePath = path.join(__dirname, "../templates/otpFormat.ejs");
      const __dirname = path.dirname(__fileName);
      const templatePath = path.join(__dirname, "../templates/welcome.ejs");
      const template = fs.readFileSync(templatePath, "utf8");
      const renderedTemplate = ejs.render(template, { name });

      let send = await transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        subject: `Welcome to Todo App, ${name}!`,
        html: renderedTemplate,
      });

      console.log("Message sent: %s", send.messageId);
    } catch (err) {
      console.log(err);
    }
  });
});

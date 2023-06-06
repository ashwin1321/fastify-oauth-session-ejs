import fp from "fastify-plugin";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default fp(async (fastify, opts) => {
  fastify.decorate("sendMail", async (to, otp) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      let send = await transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        subject: "OTP verification Code from Todo App",
        text: `Your OTP for Todo App is ${otp}.\n Please do not share it with anyone.`,
      });
      console.log("Message sent: %s", send.messageId);
    } catch (err) {
      console.log(err);
    }
  });
});

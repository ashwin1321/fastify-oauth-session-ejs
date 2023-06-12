import fastify from "fastify";

export default {
  registerUser: async (request, reply) => {
    try {
      const { email, password } = request.body;

      const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };

      if (!validateEmail(email)) {
        return reply.view("templates/register.ejs", {
          message: "Invalid email format",
          user: "",
        });
      }

      const user = await request.server.Users.findOne({ where: { email } }); // Retrieve the user from the Users table
      if (user) {
        return reply.view("templates/register.ejs", {
          message: "User already exists",
          user: "",
        });
      }

      if (password.length < 8) {
        return reply.view("templates/register.ejs", {
          message: "Password should be at least 8 characters long",
          user: "",
        });
      }

      const newUser = await request.server.Users.create({ email, password }); // Create a new user in the Users table

      request.server.sendMailWelcome(email); // Send a welcome email to the user
      reply.redirect("/user/login");
    } catch (error) {
      console.error("Error creating a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  loginUser: async (request, reply) => {
    try {
      const { email, password } = request.body;
      const user = await request.server.Users.findOne({ where: { email } });

      if (!user || user.password !== password) {
        return reply.view("templates/login.ejs", {
          message: "Wrong credentials",
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      await request.server.Users.update(
        { otp },
        { where: { email } }
      ); /* Update the user's otp in the Users table */

      request.server.sendMailOtp(email, otp); // Send the OTP to the user's email

      request.session.email = email; // Store the user's email in the session
      return reply.redirect("/user/otp");
    } catch (error) {
      console.error("Error logging in a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  verifyOtp: async (request, reply) => {
    try {
      const { otp } = request.body;
      const email = request.session.email; // Retrieve the user's email from the session
      const user = await request.server.Users.findOne({ where: { email } });
      if (!user || user.otp != otp) {
        return reply.view("templates/otp.ejs", {
          message: "Wrong OTP, please try again",
        });
      }

      request.session.userId = user.UserId; // Store the user's id in the session
      reply.redirect("/todo");
    } catch (error) {
      console.error("Error logging in a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  logoutUser: async (request, reply) => {
    try {
      request.session.destroy(); // Destroy the session
      reply.send("Logged out successfully");
    } catch (error) {
      console.error("Error logging out a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },
};

export default {
  registerUser: async (request, reply) => {
    try {
      const { email, password } = request.body;

      const user = await request.server.Users.findOne({ where: { email } }); // Retrieve the user from the Users table
      if (user) {
        return reply.view("templates/register.ejs", {
          message: "User already exists",
        });
      }

      if (password.length < 8) {
        return reply.view("templates/register.ejs", {
          message: "Password should be at least 8 characters long",
          user: "",
        });
      }

      const newUser = await request.server.Users.create({ email, password }); // Create a new user in the Users table
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
          user: "",
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      await request.server.Users.update(
        { otp },
        { where: { email } }
      ); /* Update the user's otp in the Users table */

      return reply.view("templates/otp.ejs", {
        message: "",
        user: "",
      });
    } catch (error) {
      console.error("Error logging in a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  verifyOtp: async (request, reply) => {
    try {
      const { email, otp } = request.body;
      const user = await request.server.Users.findOne({ where: { email } });

      if (!user || user.otp !== otp) {
        return reply.view("templates/otp.ejs", {
          message: "Wrong OTP, please try again",
        });
      }
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

export default {
  registerUser: async (request, reply) => {
    try {
      const { email, password } = request.body;

      const user = await request.server.Users.findOne({ where: { email } }); // Retrieve the user from the Users table
      if (user) {
        return reply.code(404).send("User already exists");
      }
      const newUser = await request.server.Users.create({ email, password }); // Create a new user in the Users table
      reply.code(201).send(newUser);
    } catch (error) {
      console.error("Error creating a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  loginUser: async (request, reply) => {
    try {
      const { email, password } = request.body;
      const user = await request.server.Users.findOne({ where: { email } }); // Retrieve the user from the Users table
      if (!user) {
        return reply.code(404).send("User not found");
      }
      if (user.password !== password) {
        return reply.code(401).send("Incorrect password");
      }
      // Store the user ID in the session
      request.session.userId = user.UserId;

      console.log("Session", request.session);

      reply.code(200).send("Login successful");
    } catch (error) {
      console.error("Error logging in a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  logoutUser: async (request, reply) => {
    try {
      request.session.destroy(); // Destroy the session
      reply.code(200).send("Logout successful");
    } catch (error) {
      console.error("Error logging out a user", error);
      reply.code(500).send("Internal Server Error");
    }
  },
};

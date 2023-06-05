import fp from "fastify-plugin";
import axios from "axios";

export default fp(async function (fastify, opts) {
  fastify.get(
    "/getuserdata",
    { preHandler: fastify.authenticate, onRequest: fastify.csrfProtection },
    async (request, reply) => {
      //   reply.send(request.users);
      //   return;
      const { id, url, token, user } = request.users;

      // Set the authorization header with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        // Fetch the repositories using the GitHub REST API
        const response = await axios.get(
          `https://api.github.com/users/${user.login}/repos`,
          {
            headers,
          }
        );

        // Extract the repositories from the response
        const repositories = response.data.map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
        }));

        reply.send(repositories);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        reply.status(500).send("Error fetching repositories");
      }
    }
  );
});

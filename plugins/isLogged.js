import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  fastify.decorate("isLogged", async (request, reply) => {
    if (request.session.userId) {
      return reply.redirect("/todo");
    }
  });
});

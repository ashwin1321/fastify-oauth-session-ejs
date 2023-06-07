import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  fastify.decorate("isLogged", async (request, reply) => {
    if (request.session.userId) {
      return reply.redirect("/todo");
    }
  });

  fastify.addHook("preValidation", async (request, reply) => {
    const user = request.session.userId;
    reply.locals = reply.locals || {};
    reply.locals.user = user;
    return;
  });
});

export default async function (fastify, opts) {
  fastify.get(
    "/",
    { preHandler: fastify.isLogged },
    async function (request, reply) {
      const user = request.session.userId;
      return await reply.view("templates/index.ejs", { user });
    }
  );
}

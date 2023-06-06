export default async function (fastify, opts) {
  fastify.get(
    "/",
    { preHandler: fastify.isLogged },
    async function (request, reply) {
      return await reply.view("templates/index.ejs");
    }
  );
}

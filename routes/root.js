export default async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return await reply.view("templates/index.ejs");
  });
}

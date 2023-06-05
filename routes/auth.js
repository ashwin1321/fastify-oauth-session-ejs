export default async function (fastify, opts) {
  fastify.get("/login", async function (request, reply) {
    return reply.send("Login page");
  });
  fastify.get("/register", async function (request, reply) {
    return reply.send("Register page");
  });
}

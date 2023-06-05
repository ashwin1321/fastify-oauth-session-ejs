export default async function (fastify, opts) {
  fastify.get("/user/login", async function (request, reply) {
    return await reply.view("templates/login.ejs", { message: "" });
  });
  fastify.get("/user/register", async function (request, reply) {
    return reply.view("templates/register.ejs", { message: "" });
  });
}

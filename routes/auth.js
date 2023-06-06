import fastify from "fastify";

export default async function (fastify, opts) {
  fastify.get(
    "/user/login",
    { preHandler: fastify.isLogged },
    async function (request, reply) {
      return await reply.view("templates/login.ejs", { message: "", user: "" });
    }
  );
  fastify.get(
    "/user/register",
    { preHandler: fastify.isLogged },
    async function (request, reply) {
      return reply.view("templates/register.ejs", { message: "", user: "" });
    }
  );
}

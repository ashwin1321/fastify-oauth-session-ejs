import fastify from "fastify";

export default async function (fastify, opts) {
  fastify.get(
    "/user/login",
    { preHandler: fastify.isLogged },
    async function (request, reply) {
      return await reply.view("templates/login.ejs", { message: "" });
    }
  );
  fastify.get(
    "/user/register",
    { preHandler: fastify.isLogged },
    async function (request, reply) {
      return reply.view("templates/register.ejs", { message: "" });
    }
  );

  fastify.get(
    "/user/otp",
    { preHandler: fastify.isLogged },
    async function (request, reply) {
      const email = request.session.email;
      if (!email) {
        return reply.redirect("/user/login");
      }
      return reply.view("templates/otp.ejs", { message: "" });
    }
  );
}

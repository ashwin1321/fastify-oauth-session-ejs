import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";

export default fp(async (fastify, opts) => {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: "my-super-secret-key-with-a-length-of-32-or-more-characters",
    cookie: {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
  });

  fastify.decorate("authenticate", async (request, reply) => {
    if (!request.session.userId) {
      return reply.code(401).send("Unauthorized");
    }
    console.log("Session", request.session);
  });
});

import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";

export default fp(async function (fastify, opts) {
  fastify.register(fastifyCookie);

  fastify.register(fastifySession, {
    secret: `thisismythirtytwocharactersecretkeyandyoucannotguessit`,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    saveuninitialized: false,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const user = request.session.user;

      if (!user) {
        reply.code(401).send("unauthorized");
      }

      const accessToken = user.access_token;
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        reply.code(401).send("unauthorized here");
      }

      const body = await response.json();
      request.user = body;
      return;
    } catch (err) {
      reply.code(401).send(err);
    }
  });
});

// authenticate the user

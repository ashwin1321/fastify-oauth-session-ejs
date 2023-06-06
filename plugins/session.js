import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import connectSessionSequlize from "connect-session-sequelize";

export default fp(async (fastify, opts) => {
  fastify.register(fastifyCookie);
  var SequelizeStore = connectSessionSequlize(fastifySession.Store);

  fastify.register(fastifySession, {
    secret: "my-super-secret-key-with-a-length-of-32-or-more-characters",
    cookie: {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    store: new SequelizeStore({
      db: fastify.sequelize,
      tableName: "sessions",
    }),
  });

  fastify.decorate("authenticate", async (request, reply) => {
    if (!request.session.userId) {
      return await reply.redirect("/");
    }
    console.log("Session", request.session);
  });
});

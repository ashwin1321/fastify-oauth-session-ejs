import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

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

  fastify.register(import("@fastify/csrf-protection"), {
    // sessionPlugin: "@fastify/session",            // we can get the csrf token from the session where it is stored as  _csrf
    getToken: (req) => {
      // or we can get the csrf token from the header where it is stored as x-csrf-token or from session or cookies
      console.log(`req.session.csrfToken: \n \n\n\n${req.session.csrfToken}`);
      return req.session.csrfToken;
    },
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const users = request.session.user;

      if (!users) {
        reply.code(401).send("unauthorized");
      }

      const accessToken = users.access_token;

      const response = await axios.post(
        `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`,
        { access_token: accessToken },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              process.env.GITHUB_CLIENT_ID +
                ":" +
                process.env.GITHUB_CLIENT_SECRET
            ).toString("base64")}`,
          },
        }
      );

      if (!response) {
        reply.code(401).send("unauthorized here");
        return;
      }

      const { id, url, token, user } = response.data;

      request.users = { id, url, token, user };
      console.log(request.users);
      return;
    } catch (err) {
      reply.code(401).send(err);
    }
  });
});

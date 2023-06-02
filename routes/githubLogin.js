import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.get("/login/github/callback", async function (request, reply) {
    const token =
      await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
        request
      );
    console.log(token.token);

    request.session.user = token.token;
    const csrfToken = reply.generateCsrf();
    request.session.csrfToken = csrfToken;
    reply.send(
      `yo csrf token ho` +
        csrfToken +
        `yo token ho` +
        JSON.stringify(token.token)
    );
  });
});

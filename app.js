import path from "path";
import AutoLoad from "@fastify/autoload";
import { fileURLToPath } from "url";
import fastifyView from "@fastify/view";
import ejs from "ejs";
import fastifyFormbody from "@fastify/formbody";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pass --options via CLI arguments in command to enable these options.
export const options = {};

export default async function (fastify, opts) {
  // Place here your custom code!

  // Register the plugin with the view engine
  fastify.register(fastifyView, {
    engine: {
      ejs: ejs,
    },
    layout: "/templates/layout.ejs",
    includeViewExtension: true,
  });

  fastify.register(fastifyFormbody);
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "models"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  fastify.setNotFoundHandler(async (request, reply) => {
    return await reply.view("/templates/404page.ejs");
  });
}

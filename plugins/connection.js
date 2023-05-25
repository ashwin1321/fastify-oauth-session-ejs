import fp from "fastify-plugin";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export default fp(async (fastify, opts) => {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  fastify.decorate("sequelize", sequelize);
});

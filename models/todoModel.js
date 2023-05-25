import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  const sequelize = fastify.sequelize;

  const Todo = sequelize.define("TodosequelizePostges", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  try {
    await Todo.sync();
    console.log("Todos table created successfully");
  } catch (error) {
    console.error("Unable to create todos table:", error);
  }

  fastify.decorate("Todo", Todo);
});

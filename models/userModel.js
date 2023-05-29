import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  const sequelize = fastify.sequelize;

  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  try {
    await User.sync();
    console.log("User table created successfully");
  } catch (error) {
    console.error("Unable to create user table:", error);
  }

  fastify.decorate("User", User);
});

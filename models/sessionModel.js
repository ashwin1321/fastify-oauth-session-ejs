import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  const { sequelize } = fastify;
  const sessionModel = sequelize.define("sessions", {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });
  try {
    await sessionModel.sync();
  } catch (err) {
    console.log(err);
  }
  fastify.decorate("sessionModel", sessionModel);
});

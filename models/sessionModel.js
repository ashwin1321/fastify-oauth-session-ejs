import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  const { sequelize } = fastify;
  const sessionModel = sequelize.define(
    "session",
    {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      sess: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      expire: DataTypes.DATE,
      //   data: DataTypes.STRING(5000),
    },
    {
      tableName: "session",
      timestamps: false,
      // force: true,
    }
  );
  try {
    await sessionModel.sync();
  } catch (err) {
    console.log(err);
  }
  fastify.decorate("sessionModel", sessionModel);
});

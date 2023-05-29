import { DataTypes } from "sequelize";
import fp from "fastify-plugin";

export default fp(async (fastify, opts) => {
  const sequelize = fastify.sequelize;

  const Users = sequelize.define("User", {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
  });

  // Define the association
  Todo.belongsTo(Users, { foreignKey: "userId" });
  Users.hasMany(Todo, { foreignKey: "userId" });

  try {
    await sequelize.sync({ force: true });
    console.log("User and Todo tables created successfully");
  } catch (error) {
    console.error("Unable to create tables:", error);
  }

  fastify.decorate("Users", Users);
  fastify.decorate("Todo", Todo);
});

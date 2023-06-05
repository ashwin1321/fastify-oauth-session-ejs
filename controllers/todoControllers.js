import { where } from "sequelize";

export default {
  getTodos: async (request, reply) => {
    try {
      const user = request.session.userId; // Retrieve the user from the session

      const todos = await request.server.Todo.findAll({
        where: { userId: user },
      }); // Retrieve all todos from the Todos table

      if (todos.length === 0) {
        return reply.code(404).send("No todos found");
      }

      reply.code(200).send(todos);
    } catch (error) {
      console.error("Error retrieving todos", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  createTodo: async (request, reply) => {
    try {
      const { title, completed, userId } = request.body;
      const newTodo = await request.server.Todo.create({
        title,
        completed,
        userId,
      }); // Create a new todo in the Todos table
      reply.code(201).send(newTodo);
    } catch (error) {
      console.error("Error creating a todo", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  updateTodo: async (request, reply) => {
    try {
      const { id } = request.params;
      const { title, completed } = request.body;
      const [updatedRowsCount] = await request.server.Todo.update(
        { title, completed }, // Update the title and completed fields
        { where: { id } } // Filter by the todo ID
      );
      if (updatedRowsCount === 0) {
        return reply.code(404).send("Todo not found");
      }
      reply.code(200).send("Todo updated successfully");
    } catch (error) {
      console.error("Error updating a todo", error);
      reply.code(500).send("Internal Server Error");
    }
  },

  deleteTodo: async (request, reply) => {
    try {
      const { id } = request.params;
      const deletedRowsCount = await request.server.Todo.destroy({
        where: { id }, // Filter by the todo ID
      });
      if (deletedRowsCount === 0) {
        return reply.code(404).send("Todo not found");
      }
      reply.code(200).send("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting a todo", error);
      reply.code(500).send("Internal Server Error");
    }
  },
};

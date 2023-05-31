import todoControllers from "../../controllers/todoControllers.js";
import {
  getTodosOpts,
  createTodoOpts,
  updateTodoOpts,
  deleteTodoOpts,
} from "../../Schemas/todoSchema.js";

export default async function (fastify, opts) {
  fastify.get(
    "/",
    { preHandler: fastify.authenticate, schema: getTodosOpts.schema },
    todoControllers.getTodos
  );

  fastify.post(
    "/",
    { preHandler: fastify.authenticate, schema: createTodoOpts.schema },
    todoControllers.createTodo
  );

  fastify.put(
    "/:id",
    { preHandler: fastify.authenticate, schema: updateTodoOpts.schema },
    todoControllers.updateTodo
  );

  fastify.delete(
    "/:id",
    { preHandler: fastify.authenticate, schema: deleteTodoOpts.schema },
    todoControllers.deleteTodo
  );
}

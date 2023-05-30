import todoControllers from "../../controllers/todoControllers.js";
import {
  getTodosOpts,
  createTodoOpts,
  updateTodoOpts,
  deleteTodoOpts,
} from "../../Schemas/todoSchema.js";
import validateOauth from "../../middlewares/validation.js";

export default async function (fastify, opts) {
  fastify.get(
    "/",
    { preHandler: validateOauth, schema: getTodosOpts.schema },
    todoControllers.getTodos
  );

  fastify.post(
    "/",
    { preHandler: validateOauth, schema: createTodoOpts.schema },
    todoControllers.createTodo
  );

  fastify.put(
    "/:id",
    { preHandler: validateOauth, schema: updateTodoOpts.schema },
    todoControllers.updateTodo
  );

  fastify.delete(
    "/:id",
    { preHandler: validateOauth, schema: deleteTodoOpts.schema },
    todoControllers.deleteTodo
  );
}

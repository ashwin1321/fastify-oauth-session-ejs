import todoControllers from "../../controllers/todoControllers.js";
import {
  getTodosOpts,
  createTodoOpts,
  updateTodoOpts,
  deleteTodoOpts,
} from "../../Schemas/todoSchema.js";

import {
  createTodoJoi,
  updateTodoJoi,
  validateRequest,
} from "../../middlewares/JoiValidation.js";

export default async function (fastify, opts) {
  fastify.get("/", { schema: getTodosOpts.schema }, todoControllers.getTodos);

  fastify.post(
    "/",
    { preHandler: validateRequest(createTodoJoi) },
    todoControllers.createTodo
  );
  fastify.put(
    "/:id",
    { preHandler: validateRequest(updateTodoJoi) },
    todoControllers.updateTodo
  );

  fastify.delete(
    "/:id",
    { schema: deleteTodoOpts.schema },
    todoControllers.deleteTodo
  );
}

import todoControllers from "../../controllers/todoControllers.js";
import {
  getTodosOpts,
  createTodoOpts,
  updateTodoOpts,
  deleteTodoOpts,
} from "../../Schemas/todoSchema.js";

export default async function (fastify, opts) {
  fastify.get("/", { schema: getTodosOpts.schema }, todoControllers.getTodos);

  fastify.post(
    "/",
    { schema: createTodoOpts.schema },
    todoControllers.createTodo
  );

  fastify.put(
    "/:id",
    { schema: updateTodoOpts.schema },
    todoControllers.updateTodo
  );

  fastify.delete(
    "/:id",
    { schema: deleteTodoOpts.schema },
    todoControllers.deleteTodo
  );
}

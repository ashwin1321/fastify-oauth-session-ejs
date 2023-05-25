import todoControllers from "../../controllers/todoControllers.js";

export default async function (fastify, opts) {
  fastify.get("/", todoControllers.getTodos);
  fastify.post("/", todoControllers.createTodo);
  fastify.put("/:id", todoControllers.updateTodo);
  fastify.delete("/:id", todoControllers.deleteTodo);
}

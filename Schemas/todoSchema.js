const todo = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    completed: { type: "boolean" },
  },
};

// options for getting all todos
export const getTodosOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: todo,
      },
    },
  },
};

// options for creating a new todo
export const createTodoOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title", "completed"],
      properties: {
        title: { type: "string" },
        completed: { type: "boolean" },
      },
    },
    response: {
      201: todo,
    },
  },
};

// options for updating a todo
export const updateTodoOpts = {
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "integer" },
      },
    },
    body: {
      type: "object",
      required: ["title", "completed"],
      properties: {
        title: { type: "string" },
        completed: { type: "boolean" },
      },
    },
    response: {
      200: todo,
    },
  },
};

// options for deleting a todo
export const deleteTodoOpts = {
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

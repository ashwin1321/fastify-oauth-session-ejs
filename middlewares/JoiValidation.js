import Joi from "@hapi/joi";

// Joi validation schema for the request payload
export const createTodoJoi = Joi.object({
  title: Joi.string().required().min(5),
  completed: Joi.boolean().required(),
  userId: Joi.number().integer().required(),
});

// Joi validation schema for the request payload
export const updateTodoJoi = Joi.object({
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
});

// middleware function to validate the request payload

export const validateRequest = (schema) => async (request, reply) => {
  try {
    await schema.validateAsync(request.body);
  } catch (error) {
    console.error("Error validating request payload", error);
    reply.code(400).send(error, `Error validating request payload`);
  }
};

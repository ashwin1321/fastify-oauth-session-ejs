import UserController from "../../controllers/UserController.js";

export default async function (fastify, opts) {
  fastify.post("/register", UserController.registerUser);
  fastify.post("/login", UserController.loginUser);
  fastify.post("/logout", UserController.logoutUser);
  fastify.post("/otp", UserController.verifyOtp);
}

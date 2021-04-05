const express = require("express");
const usersController = require("../controllers/usersController");
const validator = require("express-joi-validation").createValidator();
const userValidation = require("../validations/userValidation");

const routes = (User) => {
	const userRouter = express.Router();
	const controller = usersController(User);

	userRouter
		.route("/users")
		.get(controller.getUsers)
		.post(validator.body(userValidation.bodySchema), controller.postUser);

	userRouter
		.route("/users/:userId")
		.get(controller.getUser)
		.delete(controller.deleteUser)
		.post(controller.updateUser);

	userRouter
		.route("/users/login")
		.post(validator.body(userValidation.loginSchema), controller.loginUser);
	userRouter.route("/users/byName/:userName").get(controller.getUserByName);

	return userRouter;
};

module.exports = routes;

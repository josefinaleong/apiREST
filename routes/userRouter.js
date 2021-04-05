const express = require("express");
const Joi = require("joi");
const usersController = require("../controllers/usersController");
const validator = require("express-joi-validation").createValidator();

const bodySchema = Joi.object({
	firstName: Joi.string().alphanum().min(3).max(30).required(),
	lastName: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] }
		})
		.required(),
	adress: Joi.string().required(),
	phone: Joi.number().required()
});

const routes = (User) => {
	const userRouter = express.Router();
	const controller = usersController(User);

	userRouter
		.route("/users")
		.get(controller.getUsers)
		.post(validator.body(bodySchema), controller.postUser);

	userRouter
		.route("/users/:userId")
		.get(controller.getUser)
		.delete(controller.deleteUser)
		.post(validator.body(bodySchema), controller.updateUser);

	userRouter
		.route("/users/login")
		.post(validator.body(bodySchema), controller.loginUser);
	userRouter.route("/users/byName/:userName").get(controller.getUserByName);

	return userRouter;
};

module.exports = routes;

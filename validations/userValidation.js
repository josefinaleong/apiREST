const Joi = require("joi");

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

const loginSchema = Joi.object({
	userName: Joi.string().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
});

module.exports = { bodySchema, loginSchema };

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const { Schema } = mongoose;

const usersModel = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	userName: { type: String, unique: true },
	password: { type: String },
	email: { type: String, unique: true },
	adress: { type: String },
	phone: { type: String }
});

module.exports = mongoose.model("User", usersModel);

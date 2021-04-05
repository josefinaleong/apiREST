const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersController = (User) => {
	const postUser = async (req, res) => {
		try {
			const { body } = req;
			const salt = 10;
			const encriptedPassword = await bcrypt.hash(body.password, salt);
			const newUserName = () => {
				return body.firstName + "." + body.lastName;
			};

			const newUser = {
				...body,
				userName: newUserName(),
				password: encriptedPassword
			};

			console.log(newUser);
			const user = new User(newUser);

			await user.save();
			return res.status(201).json(user);
		} catch (error) {
			throw error;
		}
	};

	const getUsers = async (req, res) => {
		try {
			const response = await User.find();
			return res.status(200).json(response);
		} catch (error) {
			throw error;
		}
	};

	const getUser = async (req, res) => {
		try {
			const { params } = req;
			const response = await User.findById(params.userId);
			return res.status(200).json(response);
		} catch (error) {
			throw error;
		}
	};

	const updateUser = async (req, res) => {
		try {
			const { params, body } = req;
			const response = await User.findByIdAndUpdate(
				{ _id: params.userId },
				{
					$set: {
						firstName: body.firstName,
						lastName: body.lastName,
						userName: (() => {
							if (body.lastName && body.firstName) {
								return body.firstName + "." + body.lastName;
							} else {
								return body.firstName ? body.firstName : body.lastName;
							}
						})(),
						password: body.password,
						email: body.email,
						address: body.address,
						phone: body.phone
					}
				},
				{ new: true }
			);
			return res.status(202).json(response);
		} catch (error) {
			throw error;
		}
	};
	const deleteUser = async (req, res) => {
		try {
			const { params } = req;
			await User.findByIdAndDelete(req.userId);
			return res
				.status(200)
				.json({ message: "El usuario ha sido eliminado con éxito" });
		} catch (error) {
			throw error;
		}
	};

	const loginUser = async (req, res) => {
		try {
			const { body } = req;
			const userFound = await User.findOne({ userName: body.userName });
			console.log(userFound);

			const isPasswordCorrect = await bcrypt.compare(
				body.password,
				userFound.password
			);

			if (userFound && isPasswordCorrect) {
				const userToken = {
					...user
				};

				const token = jwt.sign(userToken, "secret", { expiresIn: "1h" });

				return res.status(202).json({ message: "OK", token: token });
			} else {
				return res.status(202).json({ message: "Credenciales inválidas" });
			}
		} catch (error) {
			throw error;
		}
	};

	const getUserByName = async (req, res) => {
		try {
			const { params } = req;
			const response = await User.find({ userName: params.userName });
			return res.status(200).json(response);
		} catch (error) {
			throw error;
		}
	};
	return {
		postUser,
		getUsers,
		getUser,
		deleteUser,
		loginUser,
		getUserByName,
		updateUser
	};
};

module.exports = usersController;

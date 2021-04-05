const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);
const User = require("./models/userModel");
const userRouter = require("./routes/userRouter")(User);

const db = async () => {
	try {
		await mongoose.connect("mongodb://localhost/shopAPI");
	} catch (error) {
		throw error;
	}
};

db();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", bookRouter);
app.use("/api", userRouter);

const port = 3001;
app.listen(port, () => {
	console.log(`server started on port: ${port} `);
});

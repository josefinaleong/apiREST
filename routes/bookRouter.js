const express = require("express");
const validator = require("express-joi-validation").createValidator();
const booksController = require("../controllers/booksController");
const bookValidation = require("../validations/bookValidation");

const routes = (Book) => {
	const bookRouter = express.Router();

	const controller = booksController(Book);

	bookRouter
		.route("/books")
		.get(controller.getBooks)
		.post(validator.body(bookValidation.bodySchema), controller.postBook);

	bookRouter
		.route("/books/:bookId")
		.get(controller.getBookById)
		.put(validator.body(bookValidation.bodySchema), controller.upDateBook)
		.delete(controller.deleteBook);

	bookRouter.route("/books/byTitle/:bookTitle").get(controller.getBookByTitle);

	bookRouter
		.route("/books/byAuthor/:bookAuthor")
		.get(controller.getBookByAuthor);
	return bookRouter;
};

module.exports = routes;

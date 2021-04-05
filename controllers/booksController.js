const Book = require("../models/bookModel");

const booksController = (Book) => {
	const getBooks = async (req, res) => {
		try {
			const { query } = req;
			const response = await Book.find(query);
			return res.status(200).json(response);
		} catch (error) {
			throw error;
		}
	};

	const getBookById = async (req, res) => {
		try {
			const { params } = req;
			const response = await Book.findById(params.bookId);
			return res.status(200).json(response);
		} catch (error) {
			throw error;
		}
	};

	const postBook = async (req, res) => {
		try {
			console.log(req.body);
			const book = new Book(req.body);
			await book.save();
			return res.status(201).json(book);
		} catch (error) {
			throw error;
		}
	};

	const upDateBook = async (req, res) => {
		try {
			const { params, body } = req;
			const response = await Book.updateOne(
				{
					_id: params.bookId
				},
				{
					$set: {
						title: body.title,
						genre: body.genre,
						author: body.author,
						read: body.read
					}
				}
			);
			return res.status(200).json({ response });
		} catch (error) {
			throw error;
		}
	};

	const deleteBook = async (req, res) => {
		try {
			const { params } = req;
			await Book.findByIdAndDelete(req.bookId);
			return res
				.status(200)
				.json({ message: "El libro fue eliminado con éxito" });
		} catch (error) {
			throw error;
		}
	};

	const getBookByTitle = async (req, res) => {
		try {
			const { params } = req;
			const response = await Book.find({ title: params.bookTitle });
			return res.status(200).json(response);
		} catch (error) {
			throw error;
		}
	};

	const getBookByAuthor = async (req, res) => {
		try {
			const { params } = req;
			const response = await Book.find({ author: params.bookAuthor });
			return res.status(200).json(response);
		} catch (error) {
			throw error;
		}
	};

	return {
		getBooks,
		getBookById,
		getBookByTitle,
		getBookByAuthor,
		postBook,
		upDateBook,
		deleteBook
	};
};

module.exports = booksController;

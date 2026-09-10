import { getAllBooks, getBookById, createBook, updateBook, deleteBook, authorExists } from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to retrieve books.'
        });
    }
};

const getBookByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await getBookById(id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found.'
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to retrieve book.'
        });
    }
};

const createBookHandler = async (req, res) => {
    try {
        const {
            id,
            authorId,
            title,
            publicationDate
        } = req.body;

        if (!id || !authorId || !title || !publicationDate) {
            return res.status(400).json({
                message: 'Missing required book fields.'
            });
        }

        const existingBook = await getBookById(id);

        if (existingBook) {
            return res.status(400).json({
                message: 'Book id already exists.'
            });
        }

        const existingAuthor = await authorExists(authorId);

        if (!existingAuthor) {
            return res.status(400).json({
                message: 'Author not found.'
            });
        }

        const book = {
            id,
            authorId,
            title,
            publicationDate
        };

        const createdBook = await createBook(book);

        return res.status(201).json(createdBook);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to create book.'
        });
    }
};

const updateBookHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            authorId,
            title,
            publicationDate
        } = req.body;

        if (!authorId || !title || !publicationDate) {
            return res.status(400).json({
                message: 'Missing required book fields.'
            });
        }

        const existingBook = await getBookById(id);

        if (!existingBook) {
            return res.status(404).json({
                message: 'Book not found.'
            });
        }

        const existingAuthor = await authorExists(authorId);

        if (!existingAuthor) {
            return res.status(400).json({
                message: 'Author not found.'
            });
        }

        const updatedBook = await updateBook(id, {
            authorId,
            title,
            publicationDate
        });

        return res.status(200).json(updatedBook);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to update book.'
        });
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const existingBook = await getBookById(id);

        if (!existingBook) {
            return res.status(404).json({
                message: 'Book not found.'
            });
        }

        await deleteBook(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to delete book.'
        });
    }
};

export {
    getBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
};
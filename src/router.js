import express from 'express';
import { getBooksHandler } from './controllers/books.js';
console.log('BOOKS ROUTER LOADED');


const router = express.Router();

router.get('/books', getBooksHandler);

export default router;

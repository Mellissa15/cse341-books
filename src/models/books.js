import { getDb } from '../db/connect.js';
console.log('BOOKS CONTROLLER LOADED');


const getAllBooks = async () => {
    const db = getDb();
    const collection = db.collection('books');
    const books = await collection.find({}).toArray();
    return books;
};

export { getAllBooks };

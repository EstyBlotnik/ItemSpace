import React, { useState } from 'react';
import { IBook } from '../types/book';
import Book from './Book';
import { addBook } from '../servesies/bookActions';
interface BooksProps {
    books: IBook[];
    fetchData: () => void;
}
const Books = ({ books, fetchData }: BooksProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [publicationYear, setPublicationYear] = useState(0);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);

    const saveBook = () => {
        addBook(bookName, authorName, publicationYear, category, price);
        setShowDialog(false);
        fetchData();
    };

    return (
        <div className="flex flex-col gap-8 justify-center p-8 bg-gray-50 min-h-screen">
            {/* Displaying Books */}
            <div className="flex flex-wrap gap-6 justify-center">
                {books.map((book, index) => (
                    <div
                        key={index}
                        className="bg-white border rounded-lg shadow-lg p-6 flex flex-col w-full max-w-xs mx-2 mb-6 transition-transform transform hover:scale-105"
                    >
                        <Book book={book} fetchData={fetchData} />
                    </div>
                ))}
            </div>
            {/* Add Book Button */}
            <button
                onClick={() => setShowDialog(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Add a Book
            </button>

            {/* Modal Dialog */}
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-1/2 max-w-lg">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add a Book</h2>

                        {/* Input Fields */}
                        <div className="space-y-4">
                            <label className="block text-gray-700 font-medium">
                                Book Name:
                                <input
                                    type="text"
                                    value={bookName}
                                    onChange={(e) => setBookName(e.target.value)}
                                    className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>

                            <label className="block text-gray-700 font-medium">
                                Author Name:
                                <input
                                    type="text"
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>

                            <label className="block text-gray-700 font-medium">
                                Publication Year:
                                <input
                                    type="number"
                                    value={publicationYear}
                                    onChange={(e) => setPublicationYear(Number(e.target.value))}
                                    className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>

                            <label className="block text-gray-700 font-medium">
                                Category:
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>

                            <label className="block text-gray-700 font-medium">
                                Price:
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </label>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={saveBook}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowDialog(false)}
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Books;

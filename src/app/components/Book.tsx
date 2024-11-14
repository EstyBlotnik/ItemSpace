"use client";
import React, { useState } from 'react'
import { IBook } from '../types/book'
import { editBook, deleteBook } from '../servesies/bookActions'

const Book = ({ book }: { book: IBook }) => {
    const [bookName, setBookName] = useState(book.bookName);
    const [authorName, setAuthorName] = useState(book.authorName);
    const [publicationYear, setPublicationYear] = useState<number>(book.publicationYear);
    const [category, setCategory] = useState(book.category);
    const [price, setPrice] = useState<number>(book.price);
    const [localBook, setLocalBook] = useState<IBook>(book as IBook);
    const [isEdititng, setIsEdititng] = useState(false);
    const saveEdit = async () => {
        setIsEdititng(false);
        const answer = await editBook({
            bookName, authorName, publicationYear, category, price, _id: book._id ?? "0"
        });
        setLocalBook(answer.book);
    }
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">{localBook.bookName}</h3>
            <p className="text-gray-700">Author: {localBook.authorName}</p>
            <p className="text-gray-600">Publication Year: {localBook.publicationYear}</p>
            <p className="text-gray-600">Category: {localBook.category}</p>
            <p className="text-gray-800 font-medium">Price: ${localBook.price}</p>

            <div className="flex gap-4 justify-between mt-4">
                <button
                    onClick={() => setIsEdititng(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                    Edit
                </button>

                {book && book._id ? (
                    <button
                        onClick={() => deleteBook(String(book._id))}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                        Delete
                    </button>
                ) : null}

            </div>
            {isEdititng && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg  w-1/2 max-w-md">
                        <h2 className="text-xl font-semibold">Edit Book</h2>
                        <label>
                            book name:
                            <input
                                type="text"
                                value={bookName}
                                onChange={(e) => { setBookName(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            author name:
                            <input
                                type="text"
                                value={authorName}
                                onChange={(e) => { setAuthorName(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            publication year:
                            <input
                                type="number"
                                value={publicationYear}
                                onChange={(e) => { setPublicationYear(Number(e.target.value)) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            category:
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => { setCategory(e.target.value) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <label>
                            price:
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => { setPrice(Number(e.target.value)) }}
                                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                        <div className="mt-2">
                            <button onClick={saveEdit} className="bg-green-500 text-white py-1 px-2 rounded-lg">Save</button>
                            <button onClick={() => setIsEdititng(false)} className="bg-red-500 text-white py-1 px-2 rounded-lg ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default Book
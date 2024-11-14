import axios from 'axios';
import { IBook } from '@/app/types/book';

const apiUrl = 'http://localhost:3000/api/books';

export const fetchBooks = async (): Promise<IBook[]> => {
    try {
        const response = await axios.get<{ books: IBook[] }>(apiUrl); // מוודא את מבנה התגובה
        console.log("books:", response.data.books); // הדפסת הנתונים שהתקבלו
        return response.data.books; // החזרת מערך הספרים
    } catch (error) {
        console.error("Failed to fetch books:", error);
        return []; // החזרת מערך ריק במקרה של שגיאה
    }
};
type EditableBookFields = Pick<IBook, "bookName" | "authorName" | "publicationYear" | "category" | "price" | "_id">;

export const editBook = async (book: EditableBookFields) => {
    try {
        const response = await axios.put(`${apiUrl}/${book._id}`, {
            bookName: book.bookName,
            authorName: book.authorName,
            publicationYear: book.publicationYear,
            price: book.price,
            category: book.category
        });
        console.log("Book edited:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to edit book:", error);
        throw error;
    }
};

export const deleteBook = async (id: string) => {
    try {
        const response = await axios.delete(`${apiUrl}/${id}`); // ציין את מבנה התגובה
        return response.data;
    } catch (error) {
        console.error("Failed to edit book:", error);
        throw error;
    }
}

export const addBook = async (bookName: string, authorName: string, publicationYear: number, category: string, price: number) => {
    try {
        const response = await axios.post(apiUrl, {
            bookName: bookName,
            authorName: authorName,
            publicationYear: publicationYear,
            price: price,
            category: category
        });
        // אם רוצים להחזיר את התגובה או לעבד אותה כאן:
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;  // אפשר גם להחזיר שגיאה או לטפל בה אחרת
    }
};


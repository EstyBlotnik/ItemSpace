import connect from "@/app/lib/db/mongodb";
import Book from "@/app/lib/models/book";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        await connect();
        const { bookName, authorName, publicationYear, price, category } = await request.json();
        const book = await Book.findOne({ bookName, authorName, publicationYear });
        if (book) {
            return NextResponse.json({
                massege: "book already exist",
                book: book,
                status: 400
            })
        }
        const newBook = new Book({ bookName, authorName, publicationYear, price, category })
        await newBook.save();
        return NextResponse.json({
            message: "book added sucssesfully!",
            book: book,
            status: 201
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
}

export async function GET() {
    try {
        await connect();
        const books = await Book.find();
        console.log(books); // לוודא שהנתונים תקינים
        return NextResponse.json(
            {
                message: "all books",
                books: books, // זהו מפתח התגובה שאמור להיות מובן בפונקציה fetchBooks
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Error",
            },
            {
                status: 400,
            }
        );
    }
}

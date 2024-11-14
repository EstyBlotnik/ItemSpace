import connect from "@/app/lib/db/mongodb";
import Book from "@/app/lib/models/book";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const { id } = await params;
        console.log(id);
        if (!id) {
            return NextResponse.json({ message: "ID not provided", status: 400 });
        }
        const { bookName, authorName, publicationYear, price, category } = await request.json();
        console.log(bookName)
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                bookName,
                authorName,
                publicationYear,
                price,
                category
            },
            { new: true } // מחזיר את המסמך המעודכן
        );
        updatedBook?.save();
        await console.log(updatedBook)
        return NextResponse.json({
            message: "book changed succsesfully",
            book: updatedBook,
            status: 200
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    try {
        await connect();
        const { id } = await params;
        console.log(id)

        await Book.findByIdAndDelete(id);
        return NextResponse.json({
            message: "car deleted succsesfully",
            status: 200
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
};



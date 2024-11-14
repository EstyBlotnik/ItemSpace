import { IBook } from "@/app/types/book";
import mongoose, { Schema, Model } from 'mongoose';

const bookSchema: Schema<IBook> = new Schema({
    bookName: { type: String, required: true },
    authorName: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    publicationYear: { type: Number, required: true },
});

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema);

export default Book;

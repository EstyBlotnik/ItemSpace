import { Document } from 'mongoose';

export interface IBook extends Document {
    bookName: string;
    authorName: string;
    publicationYear: number;
    price: number;
    category: string;
}


import { Document } from 'mongoose';

export interface ICar extends Document {
    licensePlate: string;  // מספר רישוי
    chassisNumber: string; // מספר שלדה
    brand: string;         // מותג
    carModel: string;      // מודל (שנה את השם כאן כדי לא להתנגש עם השדה ב-Document)
    mileage: number;       // קילומטראז'
}


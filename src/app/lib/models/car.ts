import { ICar } from "@/app/types/car";
import mongoose, { Schema, Model } from 'mongoose';

const carSchema: Schema<ICar> = new Schema({
    licensePlate: { type: String, required: true, unique: true },
    chassisNumber: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    carModel: { type: String, required: true },
    mileage: { type: Number, required: true },
});


// יצירת המודל ובדיקה האם הוא כבר קיים
const Car: Model<ICar> = mongoose.models.Car || mongoose.model<ICar>('Car', carSchema);

export default Car;

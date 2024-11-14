import { IUser } from "@/app/types/user";
import mongoose, { Schema, Model } from 'mongoose';

const userSchema: Schema<IUser> = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


// יצירת המודל ובדיקה האם הוא כבר קיים
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
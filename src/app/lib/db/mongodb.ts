import mongoose from "mongoose"
const MONGODB_URI = process.env.MONGO_URI || "";

const connect = async () => {
    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env');
    }
    console.log(MONGODB_URI);
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Mongodb connection successfull !!!");
    } catch (error) {
        throw new Error("Error in connecting to mongoDB." + error);
    }
}
export default connect;
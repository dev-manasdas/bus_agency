import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connection to MongoDB successful');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

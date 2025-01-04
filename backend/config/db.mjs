import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to database")
  })
}

export default connectDB;
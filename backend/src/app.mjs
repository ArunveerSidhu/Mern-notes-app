import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "../config/db.mjs";

dotenv.config();

const port = process.env.PORT;

app.use(express.json());

connectDB();

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})

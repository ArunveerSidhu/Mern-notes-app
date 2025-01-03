import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.mjs";
import userRoutes from "../routes/user.routes.mjs"
import notesRoutes from "../routes/notes.routes.mjs"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})

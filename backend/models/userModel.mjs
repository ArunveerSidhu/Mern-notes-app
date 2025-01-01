import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"]
  },
  
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    minlength: [5, "Email must be at least 5 characters long"]
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    trim: true,
  }
})

const User = mongoose.model("user", userSchema);

export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type:String,
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
    minlength: [13, "Email must be at least 13 characters long"]
  },

  password: {
    type: String,
    rqeuired: true,
    minlength: [8, "Password must be at least 8 characters long"],
    trim: true,
  }

})

const User = mongoose.model("user", userSchema);

export default User;

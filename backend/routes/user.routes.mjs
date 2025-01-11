import express from 'express';
import User from '../models/userModel.mjs'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    const token = jwt.sign({ 
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email
    }, process.env.JWT_SECRET);

    res.status(201).json({
      msg: "User created successfully",
      token,
      userId: newUser._id,
      username: newUser.username
    })
  } catch (error) {
    res.status(500).json({
      message: "error creating user", 
      error: error.message
    });
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ 
      userId: foundUser._id,
      username: foundUser.username,
      email: foundUser.email
    }, process.env.JWT_SECRET);
    
    res.status(200).json({
      msg: "User logged in successfully",
      token,
      userId: foundUser._id,
      username: foundUser.username
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: error.message
    });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.userId).select("-password");

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({
      message: "error getting user profile",
      error: error.message
    })
  }
})

router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, email } = req.body;

    // Check if email is being updated and is not already taken
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: decoded.userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Check if username is being updated and is not already taken
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: decoded.userId } });
      if (existingUser) {
        return res.status(400).json({ message: "Username already in use" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: { username, email } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      msg: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile",
      error: error.message
    });
  }
})

export default router;
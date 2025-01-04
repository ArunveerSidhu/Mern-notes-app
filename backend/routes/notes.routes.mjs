import express from 'express';
import note from "../models/notesModel.mjs"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({msg:"unauthorized request"})
  }

  jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
    if(err){
      return res.status(401).json({msg:"unauthorized request"})
    }
    req.userId = decoded.userId;
    next();
  })
}

router.post('/', verifyToken, async (req, res) => {
  try {
    const {title, content} = req.body;
    const newNote = new note({
      title,
      content,
      user: req.userId
    })
    await newNote.save();
    res.status(201).json({msg:"Note created successfully", note: newNote});
  } catch (error) {
    res.status(500).json({msg:"Internal server error"});
  }
})

router.get('/', verifyToken, async(req,res)=>{
  try {
    const notes = await note.find({user: req.userId})
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      msg: "error getting notes",
      error: error.message
    })
  }
})

router.put('/:id', verifyToken, async(req,res)=>{
  try {
    const {title, content} = req.body
    const updatedNote = await note.findByIdAndUpdate(
      req.params.id,
      {title, content},
      {new: true, runValidators: true}
    )
    if (!updatedNote){
      return res.status(400).json({msg:"note not found"})
    }

    res.status(200).json({
      msg:"note updated successfully",
      note: updatedNote
    })
  } catch (error) {
    res.status(500).json({
      msg:"error updating note",
      error: error.message
    })
  }
})

router.delete('/:id', verifyToken, async(req,res)=>{
  try {
    const deletedNote = await note.findByIdAndDelete(req.params.id)
    if(!deletedNote){
      return res.status(400).json({
        msg: "note not found"
      })
    }
    res.status(200).json({
    msg: "note deleted successfully"
  })
  } catch (error) {
    res.status(500).json({
      msg: "error deleting note",
      error: error.message
    })
  }
})

router.patch('/:id/pin', verifyToken, async (req, res)=> {
  try {
    const notToUpdate = await note.findById(req.params.id)
    if (!notToUpdate) {
      return res.status(400).json({
        msg:"error finding the note"
      })
    }
    notToUpdate.isPinned = !notToUpdate.isPinned
    await notToUpdate.save()

    res.status(200).json({
      msg : "pin status updated successfully",
      note: notToUpdate
    })

  } catch (error) {
    res.status(500).json({
      msg: "error updating pin status",
      error: error.message
    })
  }
})

router.patch('/:id/archive', verifyToken, async(req,res)=>{
  try {
    const notToUpdate = await note.findById(req.params.id)
    if (!notToUpdate) {
      return res.status(400).json({
        msg:"error finding the note"
      })
    }

    notToUpdate.isArchived = !notToUpdate.isArchived
    await notToUpdate.save()

    res.status(200).json({
      msg : "archive status updated successfully",
      note: notToUpdate
    })
  } catch (error) {
    res.status(500).json({
      msg: "error updating archive status",
      error: error.message
    })
  }
})

export default router;

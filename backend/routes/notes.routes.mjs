import express from 'express';
import Note from '../models/notesModel.mjs';
import { verifyToken } from '../middleware/auth.mjs';

const router = express.Router();

// Create note
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const newNote = new Note({
            title,
            content,
            user: req.userId,
            isPinned: false,
            isArchived: false
        });

        await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({
            message: "Error creating note",
            error: error.message
        });
    }
});

// Get all notes for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({
            msg: "Error getting notes",
            error: error.message
        });
    }
});

// Update note
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title, content },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ msg: "Note not found" });
        }
        res.status(200).json({
            msg: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating note",
            error: error.message
        });
    }
});

// Toggle pin
router.put('/:id/pin', verifyToken, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.userId });
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }
        note.isPinned = !note.isPinned;
        await note.save();
        res.status(200).json({
            msg: "Pin toggled successfully",
            note
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error toggling pin",
            error: error.message
        });
    }
});

// Toggle archive
router.put('/:id/archive', verifyToken, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.userId });
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }
        note.isArchived = !note.isArchived;
        await note.save();
        res.status(200).json({
            msg: "Archive toggled successfully",
            note
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error toggling archive",
            error: error.message
        });
    }
});

// Delete note
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });
        if (!deletedNote) {
            return res.status(404).json({ msg: "Note not found" });
        }
        res.status(200).json({
            msg: "Note deleted successfully",
            note: deletedNote
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error deleting note",
            error: error.message
        });
    }
});

export default router;
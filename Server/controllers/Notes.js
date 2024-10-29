import Notes from '../models/Notes.js';
import { validationResult } from 'express-validator';

export const fetchNotes = async (req, res) => {
    try {
        // Retrieve all notes for the authenticated user
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const addNote = async (req, res) => {
    const { title, description, dueDate } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a new note
    try {
        const newNote = new Notes({
            title,
            description,
            dueDate,
            user: req.user.id
        });

        // Save the note to the database
        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        // Create a newNote object
        const updates = {};
        if (title) updates.title = title;
        if (description) updates.description = description;
        if (dueDate) updates.dueDate = dueDate;

        updates.updated_at = Date.now();

        const note = await Notes.findById(req.params.id);

        // Check if the note is present or not
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Allow updation only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        // Find the note to be updated and update it
        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        );

        // Return the updated note
        res.json({ note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        // Check if the note is present or not
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        // Find the note to be deleted and delete it
        await Notes.findByIdAndDelete(req.params.id);

        // Return the success message
        res.json({ success: 'Note has been deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const completeNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        // Check if the note is present or not
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Allow completion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        // Find the note to be completed and update it
        const completedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            { $set: { completed: true } },
            { new: true }
        );

        // Return the completed note
        res.json({ note: completedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
import express from 'express'
const router = express.Router();
import fetchUser from '../middleware/fetchUser.js';
import { body } from 'express-validator';
import {fetchNotes, addNote, updateNote, deleteNote, completeNote} from '../controllers/Notes.js';

// ROUTE 1: Get all the notes of the user: GET "/fetchnotes". Login required
router.get('/fetchnotes', fetchUser, fetchNotes);

// ROUTE 2: Add new notes of the user: POST "/addnotes". Login required
router.post('/addnotes', [
  body("title",),
  body("description",),
], fetchUser, addNote);

// ROUTE 3: Update an existing note: PUT "/updatenote/:id" (Login required)
router.put('/updatenote/:id', fetchUser, updateNote);

// ROUTE 4: Delete an existing note: DELETE "/deletenote/:id" (Login required)
router.delete('/deletenote/:id', fetchUser, deleteNote);

router.put('/completenote/:id', fetchUser, completeNote);

export default router;

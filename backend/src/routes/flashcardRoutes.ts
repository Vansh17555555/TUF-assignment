// src/routes/flashcardRoutes.ts
import express from 'express';
import { getFlashcards, addFlashcard, updateFlashcard, deleteFlashcard } from '../models/flashcardModel';

const router = express.Router();

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const flashcards = await getFlashcards();
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Add a flashcard
router.post('/', async (req, res) => {
  try {
    const flashcard = req.body;
    const newFlashcard = await addFlashcard(flashcard);
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update a flashcard
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = req.body;
    const updatedFlashcard = await updateFlashcard(parseInt(id), flashcard);
    res.json(updatedFlashcard);
  } catch (error) {
    res.status(500).json({ message: 'Error updating flashcard' });
  }
});

// Delete a flashcard
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteFlashcard(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flashcard' });
  }
});

export default router;

// src/models/flashcardModel.ts
import mysql from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// Create a connection pool to the local MySQL server
const db = mysql.createPool({
  host: 'localhost', // Use 'localhost' for a local server
  user: 'root',      // Use the root user (or another user if needed)
  password: '12345678Rt.', // Your MySQL root password
  database: 'flashcards_db', // Replace with your actual database name
});

// Get all flashcards
export const getFlashcards = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM flashcards');
    return rows;
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    throw new Error('Database error while fetching flashcards');
  }
};

// Add a flashcard
export const addFlashcard = async (flashcard: { question: string; answer: string }) => {
  try {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
      [flashcard.question, flashcard.answer]
    );
    return { id: result.insertId, ...flashcard }; // Access insertId from result
  } catch (error) {
    console.error('Error adding flashcard:', error);
    throw new Error('Database error while adding flashcard');
  }
};

// Update a flashcard
export const updateFlashcard = async (id: number, flashcard: { question: string; answer: string }) => {
  try {
    await db.query(
      'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
      [flashcard.question, flashcard.answer, id]
    );
    return { id, ...flashcard };
  } catch (error) {
    console.error('Error updating flashcard:', error);
    throw new Error('Database error while updating flashcard');
  }
};

// Delete a flashcard
export const deleteFlashcard = async (id: number) => {
  try {
    await db.query('DELETE FROM flashcards WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    throw new Error('Database error while deleting flashcard');
  }
};

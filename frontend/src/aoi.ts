// src/services/api.ts
import axios from 'axios';
import { Flashcard } from './types';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Adjust URL as necessary
});

// Get all flashcards
export const getFlashcards = async (): Promise<Flashcard[]> => {
  const response = await api.get<Flashcard[]>('/flashcards');
  return response.data;
};

// Add a new flashcard
export const addFlashcard = async (flashcard: Flashcard): Promise<Flashcard> => {
  const response = await api.post<Flashcard>('/flashcards', flashcard);
  return response.data;
};

// Update an existing flashcard
export const updateFlashcard = async (id: number, flashcard: Flashcard): Promise<Flashcard> => {
  const response = await api.put<Flashcard>(`http://localhost:3001/flashcards/${id}`, flashcard);
  return response.data;
};

// Delete a flashcard
export const deleteFlashcard = async (id: number): Promise<void> => {
  await api.delete(`http://localhost:3001/flashcards/${id}`);
};

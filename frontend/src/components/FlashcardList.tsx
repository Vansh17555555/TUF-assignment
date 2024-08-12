// src/components/FlashcardList.tsx
import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import axios from 'axios';
import { Flashcard as FlashcardType } from '../types';

const FlashcardList: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false); // Manage flip state at this level

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get<FlashcardType[]>('http://localhost:3001/api/flashcards');
        console.log('Fetched flashcards:', response.data); // Log fetched flashcards
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const nextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false); // Reset the flip state
  };

  const previousFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false); // Reset the flip state
  };

  return (
    <div>
      {flashcards.length > 0 ? (
        <Flashcard
          flashcard={flashcards[currentIndex]}
          onFlip={() => setIsFlipped((prev) => !prev)} // Toggle flip state
          isFlipped={isFlipped} // Pass the flip state
        />
      ) : (
        <p>No flashcards available.</p> // Handle case when there are no flashcards
      )}
      <button onClick={previousFlashcard} disabled={flashcards.length === 0}>Previous</button>
      <button onClick={nextFlashcard} disabled={flashcards.length === 0}>Next</button>
    </div>
  );
};

export default FlashcardList;

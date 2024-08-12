// src/components/Flashcard.tsx
import React, { useState, useEffect } from 'react';
import { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  flashcard: FlashcardType;
  onFlip: () => void; // function to notify when flipped
  isFlipped: boolean; // Prop to determine if the card is flipped
}

const Flashcard: React.FC<FlashcardProps> = ({ flashcard, onFlip, isFlipped }) => {
  // Sync the flipped state with the prop
  const [flipped, setFlipped] = useState<boolean>(isFlipped);

  // Update the local flipped state when the isFlipped prop changes
  useEffect(() => {
    setFlipped(isFlipped);
  }, [isFlipped]);

  const handleFlip = () => {
    setFlipped((prev) => !prev); // Toggle flip state
    onFlip(); // Call the onFlip function passed as a prop
  };

  return (
    <div className="flashcard" onClick={handleFlip} style={styles.flashcard}>
      {flipped ? (
        <div style={styles.back}>{flashcard.answer}</div>
      ) : (
        <div style={styles.front}>{flashcard.question}</div>
      )}
    </div>
  );
}

// Updated styles for the flashcard
const styles: { flashcard: React.CSSProperties; front: React.CSSProperties; back: React.CSSProperties } = {
  flashcard: {
    border: '2px solid #007bff',
    borderRadius: '12px',
    padding: '20px',
    margin: '10px',
    cursor: 'pointer',
    width: '250px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff', // Light background color
    transition: 'transform 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  front: {
    color: '#333',
    fontSize: '1.2rem',
  },
  back: {
    color: '#555',
    fontSize: '1.2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '10px',
  },
};

export default Flashcard;

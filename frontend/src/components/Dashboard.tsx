import React, { useState, useEffect } from 'react';
import { getFlashcards, addFlashcard, deleteFlashcard } from '../aoi';
import { Flashcard } from '../types';

const Dashboard: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [newFlashcard, setNewFlashcard] = useState<Flashcard>({ question: '', answer: '' });
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  useEffect(() => {
    const fetchFlashcards = async () => {
      const data = await getFlashcards();
      setFlashcards(data);
    };

    fetchFlashcards();
  }, []);

  const handleAddFlashcard = async () => {
    const addedCard = await addFlashcard(newFlashcard);
    setFlashcards([...flashcards, addedCard]);
    setNewFlashcard({ question: '', answer: '' });
  };

  const handleDeleteFlashcard = async (id: number) => {
    await deleteFlashcard(id);
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  // Filter flashcards based on the search term
  const filteredFlashcards = flashcards.filter(
    card => card.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
             card.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Search flashcards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Question"
        value={newFlashcard.question}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
      />
      <input
        type="text"
        placeholder="Answer"
        value={newFlashcard.answer}
        onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
      />
      <button onClick={handleAddFlashcard}>Add Flashcard</button>
      <ul>
        {filteredFlashcards.map((card) => (
          <li key={card.id}>
            {card.question} <button onClick={() => handleDeleteFlashcard(card.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

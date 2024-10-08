// src/index.ts
import express from 'express';
import cors from 'cors';
import flashcardRoutes from './routes/flashcardRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Use flashcard routes
app.use('/api/flashcards', flashcardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar.tsx'; // Import Navbar

const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> {/* Include Navbar */}
      <Routes>
          <Route path="/" element={<FlashcardList/>} />
          <Route path="/dashboard" element ={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;

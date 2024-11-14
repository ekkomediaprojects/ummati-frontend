// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Podcast from './pages/Podcast';
import Chapters from './pages/Chapters';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Membership from './pages/Membership';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/podcast" element={<Podcast />} /> {/* Route for Podcast page */}
        <Route path="/chapters" element={<Chapters />} /> {/* Route for Chapters page */}
        <Route path="/terms" element={<Terms />} /> {/* Route for Podcast page */} 
        <Route path="/FAQ" element={<FAQ />} /> {/* Route for Privacy page */}
        <Route path="/about" element={<About />} /> {/* Route for About page */}
        <Route path="/privacy" element={<Privacy />} /> {/* Route for Privacy page */}
        <Route path="/membership" element={<Membership />} /> {/* Route for Privacy page */}
      </Routes>
    </Router>
  );
}

export default App;

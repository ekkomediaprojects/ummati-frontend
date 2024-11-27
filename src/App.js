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
import Contact from './pages/Contact';
import Dallas from './pages/Chapters/Dallas';
import FortWorth from './pages/Chapters/FortWorth';
import LittleRock from './pages/Chapters/LittleRock';
import Houston from './pages/Chapters/Houston';
import Events from './pages/Events/EventsParent';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile/Profile';
import ScrollToTop from './pages/ScrollToTop';

function App() {
  return (
    <Router>
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile/>} />

        <Route path="/podcast" element={<Podcast />} /> {/* Route for Podcast page */}
        <Route path="/chapters" element={<Chapters />} /> {/* Route for Chapters page */}
        <Route path="/terms" element={<Terms />} /> {/* Route for Podcast page */} 
        <Route path="/faqs" element={<FAQ />} /> {/* Route for Privacy page */}
        <Route path="/about" element={<About />} /> {/* Route for About page */}
        <Route path="/privacy" element={<Privacy />} /> {/* Route for Privacy page */}
        <Route path="/membership" element={<Membership />} /> {/* Route for Privacy page */}
        <Route path="/contact" element={<Contact />} /> {/* Route for Privacy page */}
        <Route path="/chapters/dallas" element={<Dallas />} /> {/* Route for Dallas chapter page */}
        <Route path="/chapters/little-rock" element={<LittleRock />} /> {/* Route for Little Rock chapter page */}
        <Route path="/chapters/houston" element={<Houston />} /> {/* Route for Houston chapter page */}
        <Route path="/chapters/fort-worth" element={<FortWorth />} /> {/* Route for Fort Worth chapter page */}
        <Route path="/events" element={<Events />} /> {/* Route for Events page */}
      </Routes>
    </Router>
  );
}

export default App;

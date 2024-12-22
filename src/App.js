import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

function App() {
  useEffect(() => {
    // Function to fetch a new access token from Spotify
    const getSpotifyAccessToken = async () => {
      const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
      const credentials = btoa(client_id + ':' + client_secret);
      const scope = 'user-read-playback-position  user-modify-playback-state user-read-email'; // Example scopes


      try {
        const response = await axios.post('https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'client_credentials',
            scope: scope
          }),
          {
            headers: {
              'Authorization': `Basic ${credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        );

        const token = response?.data?.access_token;
        const expiresIn = response?.data?.expires_in;

        localStorage.setItem('AccessToken', token);
        localStorage.setItem('TokenExpiry', Date.now() + expiresIn * 1000);
        setTimeout(getSpotifyAccessToken, expiresIn * 1000 - 60000);
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    };
    const existingToken = localStorage.getItem('AccessToken');
    const tokenExpiry = localStorage.getItem('TokenExpiry');

    if (existingToken && tokenExpiry && Date.now() < tokenExpiry) {
      setTimeout(getSpotifyAccessToken, tokenExpiry - Date.now() - 60000); 
    } else {
      getSpotifyAccessToken();
    }

  }, []);

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

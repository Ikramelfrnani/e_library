import React from 'react';
import BooksSearch from './pages/BooksSearch';
import Discover from './pages/Discover';

import {Routes, Route } from 'react-router-dom';
import Favorite from './pages/Favorite';
import Book from './pages/Book';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Logout from './pages/Logout';




function App() {
  return (
      <div className="App" style={{ display: 'flex' }}>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/discover/:id" element={<Discover />} />
          <Route path="/searchbooks/:term/:id" element={<BooksSearch />} />
          <Route path="/favorite/:id" element={<Favorite />} />
          <Route path="/profil/:id" element={<Profile />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
  );
}

export default App;
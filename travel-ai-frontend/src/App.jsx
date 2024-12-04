import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Login from './components/Login';
import Register from './components/Register';
import MyTrips from './components/MyTrips';
import TripPlanner from './components/TripPlanner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trips" element={<MyTrips />} />
          <Route path="/planner" element={<TripPlanner />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
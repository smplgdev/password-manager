import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Passwords from './pages/Passwords';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passwords" element={<Passwords />} />
      </Routes>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            fontFamily: 'Arial, Geneva, Helvetica, sans-serif',
          },
        }}
      />
    </Router>
  );
}

export default App;
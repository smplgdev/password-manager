import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService.js';
import HomeButton from '../components/HomeButton.jsx';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          margin="normal"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </Box>
        <HomeButton />
      </Box>
    </Container>
  );
}

export default Register;

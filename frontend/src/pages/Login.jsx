import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService.js';
import HomeButton from '../components/HomeButton.jsx';
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginUser(email, password)
      .then(() => {
        toast.success("You successfully logged in!");
        navigate('/passwords');
      })
      .catch((error) => {
        setError(error.toString());
      })
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
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
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Log In
          </Button>
        </Box>
        <HomeButton />
      </Box>
    </Container>
  );
}

export default Login;

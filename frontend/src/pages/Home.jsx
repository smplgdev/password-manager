import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Home Page
        </Typography>
        <Typography variant="body1">
          This is the main landing page. Use the navigation to log in or register.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
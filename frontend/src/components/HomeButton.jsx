import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeButton() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <Button color="secondary" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </Box>
  );
}

export default HomeButton;

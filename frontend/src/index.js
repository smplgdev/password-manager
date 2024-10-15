import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const container = document.getElementById('root');
const root = createRoot(container);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // You can set your primary color here
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    h3: {
      fontSize: '2rem',
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <App tab="home"/>
  </ThemeProvider>,
);

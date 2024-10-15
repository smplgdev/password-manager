import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Header() {
  const [loggedIn, setLoggedIn] = useState(false)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId == null)
      return
      setLoggedIn(true);
  }, [userId])

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Password Manager
        </Typography>
        {loggedIn ? (
          <Button color="inherit" component={Link} to="/passwords">
            Passwords
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
            Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
        
      </Toolbar>
    </AppBar>
  );
}

export default Header;
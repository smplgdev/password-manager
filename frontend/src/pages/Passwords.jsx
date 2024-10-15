import React, { useState, useEffect, useMemo } from 'react';
import {Box, Typography, IconButton, TextField, Button, Icon } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LinkIcon from '@mui/icons-material/Link';
import CommentIcon from '@mui/icons-material/Comment';
import toast from 'react-hot-toast';

function Passwords() {
    const [passwords, setPasswords] = useState([]);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    console.log(showPassword === false);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPasswords = async () => {
          const token = localStorage.getItem('jwt');
          try {
            const response = await fetch(`http://localhost:8000/users/${userId}/passwords`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Attach JWT in Authorization header
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch passwords');
            }
    
            const data = await response.json();
            setPasswords(data); // Assuming the API returns an array of passwords
            setShowPassword(false);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchPasswords();
    }, [userId]);

    const handleClickTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return string; // Check for empty string
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleCopy = (type, text) => {
      navigator.clipboard.writeText(text);
      toast.success(`${capitalizeFirstLetter(type)} copied to clipboard!`);
    };

    if (error) {
      return <Typography color="error">{error}</Typography>;
    }

    return (
      <Box>
        {passwords.map((passwordObj, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid lightgray',
              borderRadius: 2,
              p: { xs: 1, sm: 2 }, // Padding adjusts to smaller values on extra-small screens
              mb: 2,
              width: { xs: '95%', sm: '35rem' }, // Full width on small screens, fixed width on larger
              margin: '20px auto',
            }}
          >

            {/* Website name section */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <LinkIcon sx={{ mr: 1 }}></LinkIcon>
                <Typography variant="h6">{passwordObj.website_name}</Typography>
            </Box>

            {/* Username Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle2">Username</Typography>
                <Typography variant="body1">{passwordObj.username}</Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => handleCopy('username', passwordObj.username)}
              >
                Copy
              </Button>
            </Box>

            {/* Password Section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="subtitle2">Password</Typography>
                <Typography variant="body1">
                  {showPassword ? passwordObj.password : '●●●●●●●●'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleClickTogglePassword} sx={{ mr: 1 }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopy('password', passwordObj.password)}
                >
                  Copy
                </Button>
              </Box>
            </Box>

            {/* Comment Section */}
            {passwordObj.comment && (
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 2,
                }}
                >
                    <CommentIcon sx={{mr: 1, opacity: 0.5}}></CommentIcon>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        {passwordObj.comment}
                    </Typography>
                </Box>
            )}
          </Box>
        ))}
      </Box>
    );
};

export default Passwords;

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { API_URL } from '../services/constants';
import { useNavigate } from 'react-router-dom';
import PasswordList from '../components/PasswordList';
import AddPasswordButton from '../components/AddPasswordButton';
import PasswordForm from '../components/PasswordForm';
import axios from 'axios';

function Passwords() {
  const [passwords, setPasswords] = useState([])
  const [isAdding, setIsAdding] = useState(false) // Whether a form is being added

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('jwt')

  useEffect(() => {
    const fetchPasswords = async () => {  // TODO: put this function to separate file
      try {
        const response = await fetch(API_URL + `/users/${userId}/passwords`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach JWT in Authorization header
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            toast.error("Please, log in once again. Your session expired")
            navigate('/login')
            return
          }
          throw new Error('Failed to fetch passwords');
        }

        const data = await response.json();
        setPasswords(data); // Assuming the API returns an array of passwords
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPasswords();
  }, [userId, navigate, token]);

  const handleSavePassword = async (websiteName, username, password, comment) => {
    const formData = {
      website_name: websiteName,
      username: username,
      password: password,
      comment: comment
    }

    await axios.post(API_URL + `/users/${userId}/passwords`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        const data = response.data
        setPasswords([...passwords, data])
        setIsAdding(false); // Close the form after saving
      })
      .catch(error => {
        toast.error('Error saving password:', error)
        console.log('Error saving password:', error)
      });
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <PasswordList passwords={passwords} />
      {isAdding ? (
        <PasswordForm onSave={handleSavePassword} />
      ) :
        (
          <AddPasswordButton onClick={() => setIsAdding(true)} />
        )
      }
    </Box>
  )
};

export default Passwords;

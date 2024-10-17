import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import toast from 'react-hot-toast';
import {API_URL} from '../services/constants';
import {useNavigate} from 'react-router-dom';
import PasswordList from '../components/PasswordList';
import AddPasswordButton from '../components/AddPasswordButton';
import PasswordForm from '../components/PasswordForm';
import axios from 'axios';
import fetchPasswords from "../services/fetchPasswords";

function Passwords() {
    const [passwords, setPasswords] = useState([])
    const [isAdding, setIsAdding] = useState(false) // Whether a form is being added
    const [reload, setReload] = useState(false) // Whether the list is updated

    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('jwt')

    useEffect( () => {
        const fetchData = async() => {
            fetchPasswords(userId, token)
                .then(response => {
                    setPasswords(response.data)
                })
                .catch(error => {
                    if (error.status === 401) {
                        toast.error('Please, log in once again. Your session expired')
                        navigate('/login')
                    } else {
                        toast.error('Failed to fetch passwords')
                    }
                })
        }

        fetchData()
    }, [userId, navigate, token, reload]);

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

    return (
        <Box>
            <PasswordList passwords={passwords ?? []} setReload={setReload} />
            {isAdding ? (
                    <PasswordForm onSave={handleSavePassword} />
                ) :
                (
                    <AddPasswordButton onClick={() => setIsAdding(true)} />
                )
            }
        </Box>
    )
}

export default Passwords

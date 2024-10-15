import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from './constants';

export const loginUser = async (username, password) => {
  const url = API_URL + '/auth/token';

  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);
  formData.append('scope', '');
  formData.append('client_id', 'string');
  formData.append('client_secret', 'string');

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = response.data

    const token = data.access_token;
    localStorage.setItem('jwt', token);

    const decodedToken = jwtDecode(token);
    localStorage.setItem('userId', decodedToken.user_id);

    return token;
  } catch (error) {
    throw new Error(error);
  }
}

  
export const registerUser = async (email, password) => {
    const response = await fetch(API_URL + '/auth/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data;
};
  
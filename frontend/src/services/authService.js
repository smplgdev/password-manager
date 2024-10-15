import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const loginUser = async (username, password) => {
  const url = 'http://localhost:8000/api/v1/auth/token';

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
    console.log('Success:', response.data);

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
    const response = await fetch('http://localhost:8000/api/v1/auth/register', {
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
  
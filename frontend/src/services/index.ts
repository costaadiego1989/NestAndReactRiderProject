import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
console.log('API URL:', apiUrl); // Debug

export const api = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
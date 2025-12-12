import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Adjust if needed
});

export default api;
import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://cineflix-movie-app-backend.onrender.com',
});

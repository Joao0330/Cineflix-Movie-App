import axios from 'axios';
import { env } from '../env';

export const TmdbApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		Authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`,
		Accept: 'application/json',
	},
});

import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

const fetchPopularMovies = async () => {
	const { data } = await api.get('/movies-popular');

	return data;
};

const fetchMovieGenres = async () => {
	const { data } = await api.get('/movies-genres');
	return data.genres;
};

export const useFetchPopularMovies = () => {
	return useQuery({
		queryKey: ['movies-popular'],
		queryFn: fetchPopularMovies,
		staleTime: 1000 * 60 * 60 * 24 * 7,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};

export const useFetchMovieGenres = () => {
	return useQuery({
		queryKey: ['movies-genres'],
		queryFn: fetchMovieGenres,
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};

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

const fetchMovieDetails = async (movieId: string) => {
	const { data } = await api.get(`/movies/${movieId}`);

	return data;
};

const fetchMovieSearch = async (query: string) => {
	const { data } = await api.get('/movies-search', {
		params: {
			query,
		},
	});

	return data;
};

const fetchMovieBrowse = async (params: { search?: string; genres?: string[]; year?: string; sortBy?: 'popularity' | 'release_date' | 'vote_average' | 'original_title'; order?: 'asc' | 'desc' }) => {
	const { data } = await api.get('/movies-browse', {
		params: {
			...params,
			genres: params.genres?.join(','),
		},
	});

	return data;
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

export const useFetchMovieDetails = (movieId: string) => {
	return useQuery({
		queryKey: ['movies', movieId],
		queryFn: () => fetchMovieDetails(movieId),
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};

export const useFetchMovieSearch = (query: string) => {
	return useQuery({
		queryKey: ['movies-search', query],
		queryFn: () => fetchMovieSearch(query),
		staleTime: 1000 * 60 * 60 * 24,
		retry: 1,
		refetchOnWindowFocus: false,
	});
};

export const useFetchMoviesBrowse = (params: {
	search?: string;
	genres?: string[];
	year?: string;
	sortBy?: 'popularity' | 'release_date' | 'vote_average' | 'original_title';
	order?: 'asc' | 'desc';
}) => {
	return useQuery({
		queryKey: ['movies-browse', params],
		queryFn: () => fetchMovieBrowse(params),
		staleTime: 1000 * 60 * 60 * 24,
		retry: 1,
		refetchOnWindowFocus: false,
		enabled: !!params.search || !!params.genres?.length || !!params.year || !!params.sortBy || !!params.order,
	});
};

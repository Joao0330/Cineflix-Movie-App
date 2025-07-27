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

const fetchMovieDetail = async (movieId: string): Promise<Movie> => {
	if (!movieId) throw new Error('No movie ID provided');
	const { data } = await api.get(`/movies/${movieId}`, { withCredentials: true });
	return data || {};
};

const fetchMultipleMovieDetails = async (movieIds: number[]): Promise<Movie[]> => {
	if (!movieIds || (Array.isArray(movieIds) && !movieIds.length)) return [];

	// Handle single ID or array of IDs
	const ids = Array.isArray(movieIds) ? movieIds : [movieIds];

	// Fetch details for each ID concurrently
	const moviePromises = ids.map(async id => {
		const { data } = await api.get(`/movies/${id}`, { withCredentials: true });
		return data; // Assuming /movies/:id returns a single Movie object
	});

	const movies = await Promise.all(moviePromises);
	return movies.filter(Boolean); // Filter out any null/undefined responses
};

const fetchMovieSearch = async (query: string) => {
	const { data } = await api.get('/movies-search', {
		params: {
			query,
		},
	});

	return data;
};

const fetchMovieBrowse = async (params: {
	search?: string;
	genres?: string[];
	year?: string;
	sortBy?: 'popularity' | 'release_date' | 'vote_average' | 'original_title';
	order?: 'asc' | 'desc';
	page?: number;
}) => {
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

export const useFetchMovieDetail = (movieId: string, options = {}) => {
	return useQuery<Movie>({
		queryKey: ['movieDetail', movieId],
		queryFn: () => fetchMovieDetail(movieId),
		enabled: !!movieId,
		refetchOnWindowFocus: false,
		...options,
	});
};

export const useFetchMultipleMovieDetails = (movieIds: number[], options = {}) => {
	return useQuery({
		queryKey: ['movies', movieIds],
		queryFn: () => fetchMultipleMovieDetails(movieIds),
		staleTime: Infinity,
		retry: 1,
		refetchOnWindowFocus: false,
		enabled: !!movieIds && movieIds.length > 0,
		...options,
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
	page?: number;
	enabled?: boolean;
}) => {
	return useQuery({
		queryKey: ['movies-browse', params],
		queryFn: () => fetchMovieBrowse(params),
		staleTime: 1000 * 60 * 60 * 24,
		retry: 1,
		refetchOnWindowFocus: false,
		enabled: params.enabled !== false && (!!params.search || !!params.genres?.length || !!params.year || !!params.sortBy || !!params.order),
	});
};

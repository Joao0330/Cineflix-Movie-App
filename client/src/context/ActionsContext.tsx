/* eslint-disable react-refresh/only-export-components */
import { api } from '@/lib/axios';
import { createContext, useContext, type ReactNode } from 'react';
import { toast } from 'sonner';

interface ActionsContextData {
	addFavorite: (externalId: number) => Promise<void>;
	getFavorites: () => Promise<[]>;
	deleteFavorite: (externalId: number) => Promise<void>;
	addList: (title: string) => Promise<void>;
	addMovieToList: (listId: number, externalId: number) => Promise<void>;
	getLists: () => Promise<[]>;
	deleteList: (listId: number) => Promise<void>;
	deleteMovieFromList: (listId: number, externalId: number) => Promise<void>;
	updateMovieFromList: (listId: number, externalId: number, status: 'WATCHING' | 'COMPLETED' | 'ON_HOLD' | 'DROPPED' | 'PLANNING') => Promise<void>;
	addReview: (movieId: number, content: string, rating: number) => Promise<void>;
	getMovieReviews: (movieId: number) => Promise<Review[]>;
	getUserReviews: () => Promise<Review[]>;
	deleteReview: (reviewId: number) => Promise<void>;
	updateReview: (reviewId: number, content: string, rating: number) => Promise<void>;
	getReviewsByUserId: (userId: number) => Promise<Review[]>;
}

interface ActionsProviderProps {
	children: ReactNode;
}

const ActionsContext = createContext({} as ActionsContextData);

export function ActionsProvider({ children }: ActionsProviderProps) {
	//! ********* Favorites *********

	const addFavorite = async (externalId: number) => {
		try {
			const { data } = await api.post('/favorites', { external_id: externalId }, { withCredentials: true });

			if (data) {
				console.log('Favorite added successfully:', data);
				toast.success('Favorite added successfully!');
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error adding favorite:', error);
			toast.error(error.response?.data?.error);
		}
	};

	const getFavorites = async () => {
		try {
			const { data } = await api.get('/favorites', { withCredentials: true });

			if (data) {
				console.log('Favorites fetched successfully:', data);
				return data;
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error fetching favorites:', error);
			toast.error(error.response?.data?.error);
		}
	};

	const deleteFavorite = async (externalId: number) => {
		try {
			await api.delete(`/favorites`, {
				data: { external_id: externalId },
				withCredentials: true,
			});

			console.log('Favorite deleted successfully:');
			toast.success('Favorite removed successfully!');
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error deleting favorite:', error);
			toast.error('Error removing favorite. Please try again.');
		}
	};

	//! ********* Lists *********

	const addList = async (title: string) => {
		try {
			const { data } = await api.post('/lists', { title }, { withCredentials: true });

			if (data) {
				console.log('List created successfully:', data);
				toast.success('List created successfully!');
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error creating list:', error);
			toast.error(error.response?.data?.error);
		}
	};

	const addMovieToList = async (listId: number, externalId: number) => {
		try {
			await api.post('/lists/movies', { listId, external_id: externalId }, { withCredentials: true });

			console.log('Movie added to list successfully:');
			toast.success('Movie added to list successfully!');
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error adding movie to list:', error);
			toast.error(error.response?.data?.error);
		}
	};

	const getLists = async () => {
		try {
			const { data } = await api.get('/lists', { withCredentials: true });

			if (data) {
				console.log('Lists fetched successfully:', data);
				return data;
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error fetching lists:', error);
			toast.error(error.response?.data?.error);
		}
	};

	const deleteList = async (listId: number) => {
		try {
			await api.delete(`/lists`, {
				data: { listId: listId },
				withCredentials: true,
			});

			console.log('List deleted successfully:');
			toast.success('List removed successfully!');
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error deleting list:', error);
			toast.error('Error removing list. Please try again.');
		}
	};

	const deleteMovieFromList = async (listId: number, externalId: number) => {
		try {
			await api.delete(`/lists/movies`, {
				data: { listId, external_id: externalId },
				withCredentials: true,
			});

			console.log('Movie removed from list successfully:');
			toast.success('Movie removed from list successfully!');
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error removing movie from list:', error);
			toast.error('Error removing movie from list. Please try again.');
		}
	};

	const updateMovieFromList = async (listId: number, externalId: number, status: 'WATCHING' | 'COMPLETED' | 'ON_HOLD' | 'DROPPED' | 'PLANNING') => {
		try {
			await api.put('/lists/movies', { listId, external_id: externalId, status }, { withCredentials: true });
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error updating movie status:', error);
			toast.error(error.response?.data?.error);
		}
	};

	//! ********* Reviews *********

	const addReview = async (movieId: number, content: string, rating: number) => {
		try {
			await api.post('/reviews', { movieId, content, rating }, { withCredentials: true });

			console.log('Review added successfully:');
			toast.success('Review added successfully!');
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error adding review:', error);
			toast.error(error.response?.data?.error);
			throw error;
		}
	};

	const getMovieReviews = async (movieId: number): Promise<Review[]> => {
		try {
			const { data } = await api.get(`/reviews/${movieId}`, { withCredentials: true });
			return data;
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error fetching reviews:', error);
			throw error;
		}
	};

	const getUserReviews = async () => {
		try {
			const { data } = await api.get('/reviews', { withCredentials: true });
			return data;
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error fetching user reviews:', error);
			throw error;
		}
	};

	const getReviewsByUserId = async (userId: number) => {
		try {
			const { data } = await api.get(`/reviews/user/${userId}`, { withCredentials: true });
			return data;
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error fetching user reviews by ID:', error);
			throw error;
		}
	};

	const deleteReview = async (reviewId: number) => {
		try {
			await api.delete('/reviews', {
				data: { reviewId },
				withCredentials: true,
			});

			console.log('Review deleted successfully:');
			toast.success('Review removed successfully!');
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error deleting review:', error);
			toast.error('Error removing review. Please try again.');
		}
	};

	const updateReview = async (reviewId: number, content: string, rating: number) => {
		try {
			await api.put(`/reviews/${reviewId}`, { content, rating }, { withCredentials: true });

			console.log('Review updated successfully:');
			toast.success('Review updated successfully!');
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error updating review:', error);
			toast.error('Error updating review. Please try again.');
			throw error;
		}
	};

	return (
		<ActionsContext.Provider
			value={{
				addFavorite,
				getFavorites,
				deleteFavorite,
				addList,
				addMovieToList,
				getLists,
				deleteList,
				deleteMovieFromList,
				updateMovieFromList,
				addReview,
				getMovieReviews,
				getUserReviews,
				deleteReview,
				updateReview,
				getReviewsByUserId,
			}}
		>
			{children}
		</ActionsContext.Provider>
	);
}

export function useActions() {
	const context = useContext(ActionsContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

/* eslint-disable react-refresh/only-export-components */
import { api } from '@/lib/axios';
import { createContext, useContext, type ReactNode } from 'react';
import { toast } from 'sonner';

interface ActionsContextData {
	addFavorite: (externalId: string) => Promise<void>;
	getFavorites: () => Promise<[]>;
	deleteFavorite: (externalId: string) => Promise<void>;
}

interface ActionsProviderProps {
	children: ReactNode;
}

const ActionsContext = createContext({} as ActionsContextData);

export function ActionsProvider({ children }: ActionsProviderProps) {
	const addFavorite = async (externalId: string) => {
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

	const deleteFavorite = async (externalId: string) => {
		try {
			const { data } = await api.delete(`/favorites`, {
				data: { external_id: externalId },
				withCredentials: true,
			});

			if (data) {
				console.log('Favorite deleted successfully:', data);
				toast.success('Favorite removed successfully!');
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error deleting favorite:', error);
			toast.error('Error removing favorite. Please try again.');
		}
	};

	return <ActionsContext.Provider value={{ addFavorite, getFavorites, deleteFavorite }}>{children}</ActionsContext.Provider>;
}

export function useActions() {
	const context = useContext(ActionsContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

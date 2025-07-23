import { useActions } from '@/context/ActionsContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useFavorites = () => {
	const { addFavorite, getFavorites, deleteFavorite } = useActions();

	const {
		data: favorites = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['favorites'],
		queryFn: getFavorites,
		refetchOnWindowFocus: false,
	});

	const addFavoriteMutation = useMutation({
		mutationFn: (externalId: number) => addFavorite(externalId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['favorites'] });
		},
	});

	const deleteFavoriteMutation = useMutation({
		mutationFn: (externalId: number) => deleteFavorite(externalId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['favorites'] });
		},
	});

	return { favorites, isLoading, error, addFavoriteMutation, deleteFavoriteMutation };
};

import { useActions } from '@/context/ActionsContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLists = () => {
	const { addList, addMovieToList, getLists, deleteList } = useActions();

	const {
		data: lists = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ['lists'],
		queryFn: getLists,
		refetchOnWindowFocus: false,
	});

	const addListMutation = useMutation({
		mutationFn: (title: string) => addList(title),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lists'] });
		},
	});

	const deleteListMutation = useMutation({
		mutationFn: (listId: number) => deleteList(listId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lists'] });
		},
	});

	const addMovieToListMutation = useMutation({
		mutationFn: ({ listId, externalId }: { listId: number; externalId: number }) => addMovieToList(listId, externalId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lists'] });
		},
	});

	return { lists, isLoading, error, addListMutation, addMovieToListMutation, deleteListMutation };
};

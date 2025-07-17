import { useActions } from '@/context/ActionsContext';
import { queryClient } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';

export const useLists = () => {
	const { addList, addMovieToList } = useActions();

	const addListMutation = useMutation({
		mutationFn: (title: string) => addList(title),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lists'] });
		},
	});

	const addMovieToListMutation = useMutation({
		mutationFn: ({ listId, externalId }: { listId: string; externalId: string }) => addMovieToList(listId, externalId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lists'] });
		},
	});

	return { addListMutation, addMovieToListMutation };
};

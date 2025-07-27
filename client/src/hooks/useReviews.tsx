import { useActions } from '@/context/ActionsContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useReviews = () => {
	const { addReview, getMovieReviews } = useActions();

	const useMovieReviewsQuery = (movieId: number) =>
		useQuery<Review[]>({
			queryKey: ['reviews', movieId],
			queryFn: () => getMovieReviews(movieId),
			enabled: !!movieId,
			refetchOnWindowFocus: false,
			select: data => data ?? [],
			retry: false,
		});

	const addReviewMutation = useMutation({
		mutationFn: ({ movieId, content, rating }: { movieId: number; content: string; rating: number }) => addReview(movieId, content, rating),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['review'] });
		},
	});

	return { addReviewMutation, useMovieReviewsQuery };
};

import { useActions } from '@/context/ActionsContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useReviews = () => {
	const { addReview, getMovieReviews, getUserReviews, deleteReview, updateReview } = useActions();

	const useMovieReviewsQuery = (movieId: number) =>
		useQuery<Review[]>({
			queryKey: ['reviews', movieId],
			queryFn: () => getMovieReviews(movieId),
			enabled: !!movieId,
			refetchOnWindowFocus: false,
			select: data => data ?? [],
			retry: false,
		});

	const useUserReviewsQuery = () =>
		useQuery<Review[]>({
			queryKey: ['userReviews'],
			queryFn: getUserReviews,
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

	const deleteReviewMutation = useMutation({
		mutationFn: (reviewId: number) => deleteReview(reviewId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userReviews'] });
		},
	});

	const updateReviewMutation = useMutation({
		mutationFn: ({ reviewId, content, rating }: { reviewId: number; content: string; rating: number }) => updateReview(reviewId, content, rating),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['userReviews'] });
		},
	});

	return { addReviewMutation, useMovieReviewsQuery, useUserReviewsQuery, deleteReviewMutation, updateReviewMutation };
};

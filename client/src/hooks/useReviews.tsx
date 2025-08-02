import { useActions } from '@/context/ActionsContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useReviews = () => {
	const { addReview, getMovieReviews, getUserReviews, deleteReview, updateReview, getReviewsByUserId } = useActions();

	const useMovieReviewsQuery = (movieId: number) =>
		useQuery<Review[]>({
			queryKey: ['userReviews', movieId],
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
			enabled: true,
			refetchOnWindowFocus: false,
			select: data => data ?? [],
			retry: false,
		});

	const useUserReviewsByIdQuery = (userId: number, options?: object) =>
		useQuery<Review[]>({
			queryKey: ['userReviewsById', userId],
			queryFn: () => getReviewsByUserId(userId),
			enabled: !!userId,
			refetchOnWindowFocus: false,
			select: data => data ?? [],
			retry: false,
			...options,
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

	return { addReviewMutation, useMovieReviewsQuery, useUserReviewsQuery, deleteReviewMutation, updateReviewMutation, useUserReviewsByIdQuery };
};

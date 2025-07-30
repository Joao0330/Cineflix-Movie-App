import { Loader } from '@/components/Loader';
import { DeleteReviewDialog } from '@/components/reviews/DeleteReviewDialog';
import { UpdateReviewDialog } from '@/components/reviews/UpdateReviewDialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useFetchMultipleMovieDetails } from '@/hooks/useFetchMovies';
import { useReviews } from '@/hooks/useReviews';
import { updateUsernameSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

export const Profile = () => {
	const { user, updateUsername } = useAuth();
	const { useUserReviewsQuery } = useReviews();
	const { data: userReviews = [], isLoading, error } = useUserReviewsQuery();

	const form = useForm<z.infer<typeof updateUsernameSchema>>({
		resolver: zodResolver(updateUsernameSchema),
		defaultValues: {
			username: user?.username || '',
		},
	});

	const externalIds = userReviews ? userReviews.map(review => review.movie?.external_id).filter((id): id is number => typeof id === 'number') : [];

	const { data: movieDetails = [], isLoading: isMoviesLoading } = useFetchMultipleMovieDetails(externalIds, {
		enabled: !!userReviews && externalIds.length > 0,
	});

	if (isLoading) return <Loader />;
	if (error) {
		toast.error('Failed to load reviews');
	}

	const moviesWithReviews = userReviews.map(review => ({
		...review,
		movie: movieDetails.find(movie => movie.id === review.movie?.external_id) || null,
	}));

	const onChangeUsername = async (data: z.infer<typeof updateUsernameSchema>) => {
		updateUsername(data.username);
	};

	return (
		<section className='profile'>
			<div className='container-sm'>
				<div className='profile__top'>
					<div>
						<img src='https://placehold.co/256x256?text=Image not found' alt={user?.username} />
						<div className='profile__top-info'>
							<div>
								<h1>{user?.username}</h1>
								<span>{user?.role}</span>
							</div>
							<div>
								<button>0 Followers</button>
								<button>0 Following</button>
							</div>
							<div>
								<small>Joined on {user?.created_at ? format(new Date(user.created_at), 'MMMM d, yyyy') : 'Unknown'}</small>
							</div>
						</div>
					</div>
					<div>
						<h2>My Profile</h2>
						<p>Manage your account settings below:</p>

						<div>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onChangeUsername)}>
									<div>
										<FormLabel className='mb-4'>Change Username</FormLabel>
										<FormField
											control={form.control}
											name='username'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input {...field} name='username' placeholder='Update your username' />
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<Button type='submit' className='mt-5 cursor-pointer'>
										Change Username
									</Button>
								</form>
							</Form>
						</div>
					</div>
				</div>
				<div className='profile__bottom'>
					<div>
						<h3>Your Reviews</h3>
						<p>See the reviews that you have submitted:</p>
					</div>
					{isMoviesLoading ? (
						<div>Loading reviews...</div>
					) : (
						<div>
							{userReviews.length === 0 ? (
								<p>You haven't submitted any reviews yet.</p>
							) : (
								<ul>
									{moviesWithReviews.map((review, idx) => (
										<li key={review.id}>
											<article>
												<img
													src={review.movie?.poster_path ? `https://image.tmdb.org/t/p/w200${review.movie.poster_path}` : 'https://placehold.co/80x136?text=Image+not+found'}
													alt={review.movie?.title}
												/>
												<div>
													<div>
														<strong>{review.movie?.title}</strong>
														<time>{format(new Date(review.created_at), 'MMMM d, yyyy')}</time>
													</div>
													<div>
														<span>You have rated this {review.rating}/10</span>
														<p>{review.content}</p>
													</div>
													<div>
														<UpdateReviewDialog review={userReviews[idx]} />
														<DeleteReviewDialog reviewId={review.id} />
													</div>
												</div>
											</article>
										</li>
									))}
								</ul>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

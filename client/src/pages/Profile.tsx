import { Loader } from '@/components/Loader';
import { ChangeProfilePicForm } from '@/components/profile/ChangeProfilePicForm';
import { ChangeUsernameForm } from '@/components/profile/ChangeUsernameForm';
import { DeleteReviewDialog } from '@/components/reviews/DeleteReviewDialog';
import { UpdateReviewDialog } from '@/components/reviews/UpdateReviewDialog';
import { useAuth } from '@/context/AuthContext';
import { useFetchMultipleMovieDetails } from '@/hooks/useFetchMovies';
import { useReviews } from '@/hooks/useReviews';
import { format } from 'date-fns';
import { Link } from 'react-router';
import { toast } from 'sonner';

export const Profile = () => {
	const { user } = useAuth();
	const { useUserReviewsQuery } = useReviews();
	const { data: userReviews = [], isLoading, error } = useUserReviewsQuery();

	scrollTo(0, 0);

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

	// Get user badge color
	let badgeColor;

	switch (user?.role) {
		case 'ADMIN':
			badgeColor = 'bg-red-600';
			break;
		case 'MODERATOR':
			badgeColor = 'bg-green-600';
			break;
		default:
			badgeColor = 'bg-blue-light';
			break;
	}

	return (
		<section className='profile'>
			<div className='container-sm'>
				<div className='profile__top'>
					<div>
						<img src={user?.profile_picture_url || '/assets/userFallback.png'} alt={user?.username} />
						<div className='profile__top-info'>
							<div>
								<h1>{user?.username}</h1>
								<span className={badgeColor}>{user?.role}</span>
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
							<ChangeUsernameForm user={user} />
							<div className='grid w-full max-w-sm items-center gap-3'>
								<ChangeProfilePicForm />
							</div>
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
														<Link to={`/movies/${review.movie?.id}`}>
															<strong>{review.movie?.title}</strong>
														</Link>
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

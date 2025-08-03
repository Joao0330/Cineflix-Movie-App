import { useAuth } from '@/context/AuthContext';
import { useReviews } from '@/hooks/useReviews';
import { format } from 'date-fns';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';

export const MovieReviews = ({ movie }: { movie: Movie }) => {
	const { user } = useAuth();
	const { useMovieReviewsQuery, deleteReviewMutation } = useReviews();
	const { data: movieReviews = [], isLoading } = useMovieReviewsQuery(movie.id);

	console.log('Movie reviews:', movieReviews);

	return (
		<section className='movieInfo__details__reviews'>
			<div className='movieInfo__details__reviews-top'>
				<h4>Reviews:</h4>
				<p>See what CineFlix users think of this show...</p>
			</div>

			{isLoading ? (
				<div>Loading reviews...</div>
			) : (
				<div className='movieInfo__details__reviews-list'>
					{movieReviews.length > 0 ? (
						<ul>
							{movieReviews.map((review: Review) => (
								<li key={review.id}>
									<div>
										<div>
											<img src={review.user.profile_picture_url ? review.user.profile_picture_url : '/assets/userFallback.png'} alt={review.user.username} />
											<Link to={`/user/${review.user.id}`}>
												<strong>{review.user.username}</strong>
											</Link>
										</div>
										<span>Published at {format(new Date(review.created_at), 'MMMM d, yyyy')}</span>
									</div>
									<div>
										<span>Rated this show {review.rating}/10</span>
									</div>
									<p>{review.content}</p>
									{(user?.role === 'ADMIN' || user?.role === 'MODERATOR') && (
										<Button variant='destructive' className='cursor-pointer' onClick={() => deleteReviewMutation.mutate(review.id)}>
											<Trash />
											<span>Delete Review</span>
										</Button>
									)}
								</li>
							))}
						</ul>
					) : (
						<p>No reviews available for this movie.</p>
					)}
				</div>
			)}
		</section>
	);
};

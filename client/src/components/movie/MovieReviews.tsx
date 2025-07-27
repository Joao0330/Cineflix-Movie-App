import { useReviews } from '@/hooks/useReviews';
import { format } from 'date-fns';

export const MovieReviews = ({ movie }: { movie: Movie }) => {
	const { useMovieReviewsQuery } = useReviews();
	const { data: movieReviews = [], isLoading } = useMovieReviewsQuery(movie.id);

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
										<strong>{review.user.username}</strong>
										<span>Published at {format(new Date(review.created_at), 'MMMM d, yyyy')}</span>
									</div>
									<div>
										<span>Rated this show {review.rating}/10</span>
									</div>
									<p>{review.content}</p>
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

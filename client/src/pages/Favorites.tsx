import { Loader } from '@/components/Loader';
import { useFavorites } from '@/hooks/useFavorites';
import { useFetchMultipleMovieDetails } from '@/hooks/useFetchMovies';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Link } from 'react-router';

interface useFavoritesReturn {
	favorites: Favorite[];
	isLoading: boolean;
	error: Error | null;
	deleteFavoriteMutation: {
		mutate: (externalId: number) => void;
	};
}

export const Favorites = () => {
	const { favorites, isLoading, error, deleteFavoriteMutation } = useFavorites() as useFavoritesReturn;

	const externalIds = favorites ? favorites.map(fav => fav.external_id) : [];

	const { data: movieDetails = [], isLoading: isMoviesLoading } = useFetchMultipleMovieDetails(externalIds, {
		enabled: !!favorites && externalIds.length > 0,
	});

	if (isLoading) return <Loader />;
	if (error) {
		toast.error('Failed to load favorites');
		return <div>Failed to load favorites</div>;
	}

	const moviesWithFavorites: FavoriteMovies[] = favorites.map(fav => ({
		movie: movieDetails.find(movie => movie.id === fav.external_id) || null,
		created_at: fav.created_at,
	}));

	console.log(moviesWithFavorites);

	return (
		<section className='favorites'>
			<div className='container-sm'>
				<div className='favorites__top'>
					<h2>Favorites</h2>
					<p className='text-gray-400'>Browse through all your favorite shows on CineFlix.</p>
				</div>

				<div className='favorites__content'>
					{isMoviesLoading ? (
						<div>Loading...</div>
					) : moviesWithFavorites.length > 0 ? (
						<ul>
							{moviesWithFavorites.map(favMovie => (
								<li key={favMovie.movie?.id ?? favMovie.created_at}>
									{favMovie.movie?.poster_path && <img src={`https://image.tmdb.org/t/p/w300${favMovie.movie.poster_path}`} alt={favMovie.movie.title} className='h-48 object-cover' />}
									<div className='favorites__content-info'>
										<Link to={`/movies/${favMovie.movie?.id}`} className='text-blue-500 hover:underline'>
											<h3 className='text-lg font-semibold'>{favMovie.movie?.title ?? 'Unknown Title'}</h3>
										</Link>
										<div>
											<small>Added at {format(new Date(favMovie.created_at), 'MMMM d, yyyy')}</small>
											<button
												onClick={() => {
													if (favMovie.movie?.id !== undefined) {
														deleteFavoriteMutation.mutate(favMovie.movie.id);
													}
												}}
											>
												Remove from favorites
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p>No favorite movies yet.</p>
					)}
				</div>
			</div>
		</section>
	);
};

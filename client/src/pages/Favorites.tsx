import { Loader } from '@/components/Loader';
import { useFavorites } from '@/hooks/useFavorites';
import { useFetchMultipleMovieDetails } from '@/hooks/useFetchMovies';
import { toast } from 'sonner';

export const Favorites = () => {
	const { favorites, isLoading, error } = useFavorites() as { favorites: Favorite[]; isLoading: boolean; error: Error | null };

	const externalIds = favorites && Array.isArray(favorites) ? favorites.map(fav => fav.external_id) : [];

	const { data: movieDetails = [], isLoading: isMoviesLoading } = useFetchMultipleMovieDetails(externalIds, {
		enabled: !!favorites && Array.isArray(favorites) && externalIds.length > 0,
	});

	if (isLoading) return <Loader />;
	if (error) {
		toast.error('Failed to load favorites');
		return <div>Failed to load favorites</div>;
	}

	return (
		<section className='favorites'>
			<div className='container-sm'>
				<div className='favorites__top'>
					<h1>Favorites</h1>
					<p className='text-gray-400'>Browse through all your favorite shows on CineFlix.</p>
				</div>

				<div className='favorites__content'>
					{isMoviesLoading ? (
						<div>Loading...</div>
					) : movieDetails.length > 0 ? (
						<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
							{movieDetails.map(movie => (
								<li key={movie.id} className='border p-4 rounded'>
									{movie.poster_path && <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className='w-full h-48 object-cover mb-2' />}
									<h3 className='text-lg font-semibold'>{movie.title}</h3>
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

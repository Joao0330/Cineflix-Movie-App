import { useFetchMultipleMovieDetails } from '@/hooks/useFetchMovies';

export const FavoritesContent = ({ favorites }: { favorites: Favorite[] }) => {
	const { data: movieDetails } = useFetchMultipleMovieDetails(favorites.map(fav => fav.external_id));

	console.log(movieDetails);
	return (
		<div className='favorites__content'>
			<h1>content</h1>
		</div>
	);
};

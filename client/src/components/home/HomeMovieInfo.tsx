import { useFetchMovieGenres } from '@/hooks/useFetchMovies';
import { createGenreLookup } from '@/lib/utils';
import { Loader } from '../Loader';
import { Link } from 'react-router';
import { Info } from 'lucide-react';
import { MobileToggleButton } from '../sidebar/MobileToggleButton';

export const HomeMovieInfo = ({ mainMovie }: { mainMovie: Movie }) => {
	const { data: genres, isLoading, error } = useFetchMovieGenres();

	if (isLoading) return <Loader />;
	if (error) return <div>Error loading movies: {error.message}</div>;

	const genreLookup = createGenreLookup(genres || []);

	return (
		<>
			<div className='home__movieInfo'>
				<MobileToggleButton />
				<h1>{mainMovie.title}</h1>
				<div>
					<span>{new Date(mainMovie.release_date).getFullYear()}</span>
					<div>
						{mainMovie.genre_ids.map(genreId => (
							<span key={genreId}>{genreLookup[genreId]}</span>
						))}
					</div>
				</div>
				<p>{mainMovie.overview}</p>

				<Link to={`/movies/${mainMovie.id}`}>
					<Info />
					<span>More Info</span>
				</Link>
			</div>
		</>
	);
};

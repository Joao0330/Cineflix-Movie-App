import { useFetchPopularMovies } from '@/hooks/useFetchMovies';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Link } from 'react-router';

export const HomePopularMovies = () => {
	const { data: movies } = useFetchPopularMovies();

	const popularMovies = movies.slice(1);

	return (
		<section className='home__popular text-white'>
			<h2>Popular Movies on CineFlix</h2>

			<ScrollArea className='py-10'>
				<div>
					{popularMovies.map((movie: Movie) => (
						<Link to={`/movies/${movie.id}`} key={movie.id}>
							<figure>
								<img key={movie.id} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
								<figcaption>{movie.title}</figcaption>
							</figure>
						</Link>
					))}
				</div>
				<ScrollBar orientation='horizontal' className='' />
			</ScrollArea>
		</section>
	);
};

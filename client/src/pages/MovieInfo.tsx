import { Loader } from '@/components/Loader';
import { MovieCredits } from '@/components/movie/MovieCredits';
import { MovieInfoTop } from '@/components/movie/MovieInfoTop';
import { MobileToggleButton } from '@/components/sidebar/MobileToggleButton';
import { useFetchMovieDetails } from '@/hooks/useFetchMovies';
import { ChevronDown } from 'lucide-react';
import { useParams } from 'react-router';

export const MovieInfo = () => {
	const { movieId } = useParams();
	const { data: movie, isLoading, error } = useFetchMovieDetails(movieId!);

	scrollTo(0, 0);

	if (isLoading) return <Loader />;
	if (error) return <div>Error loading movie details: {error.message}</div>;

	console.log(movie);

	return (
		<>
			<section
				className='movieInfo'
				style={{
					backgroundImage: movie.backdrop_path ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : 'none',
					backgroundPosition: '',
				}}
			>
				<div className='movieInfo__hero'>
					<div>
						<MobileToggleButton />
						<h1>{movie.title}</h1>
					</div>

					<div>
						<span>View details bellow</span>
						<button
							onClick={() => {
								scrollTo({
									top: (document.querySelector('.movieInfo__details') as HTMLElement | null)?.offsetTop || 0,
									behavior: 'smooth',
								});
							}}
						>
							<ChevronDown className='w-15 h-15 animate-bounce [animation-duration:1.5s]' />
						</button>
					</div>
				</div>
			</section>

			<section className='movieInfo__details'>
				<MovieInfoTop movie={movie} />
				<MovieCredits movie={movie} />
			</section>
		</>
	);
};

import { HomeMovieInfo } from '@/components/home/HomeMovieInfo';
import { HomePopularMovies } from '@/components/home/HomePopularMovies';
import { useFetchPopularMovies } from '@/hooks/useFetchMovies';
import { Loader } from '@/components/Loader';

export const Home = () => {
	const { data: movies, isLoading, error } = useFetchPopularMovies();

	if (isLoading) return <Loader />;
	if (error) return <div>Error loading movies: {error.message}</div>;

	const mainMovie = movies[0];

	return (
		<section
			className='home'
			style={{
				backgroundImage: mainMovie.backdrop_path ? `url(https://image.tmdb.org/t/p/original${mainMovie.backdrop_path})` : 'none',
				backgroundPosition: '',
			}}
		>
			<HomeMovieInfo mainMovie={mainMovie} />
			<HomePopularMovies />
		</section>
	);
};

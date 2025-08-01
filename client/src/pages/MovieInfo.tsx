import { ListsDialog } from '@/components/lists/ListsDialog';
import { Loader } from '@/components/Loader';
import { MovieCredits } from '@/components/movie/MovieCredits';
import { MovieInfoTop } from '@/components/movie/MovieInfoTop';
import { MovieReviews } from '@/components/movie/MovieReviews';
import { MovieVideos } from '@/components/movie/MovieVideos';
import { useFavorites } from '@/hooks/useFavorites';
import { useFetchMovieDetail } from '@/hooks/useFetchMovies';
import { ChevronDown, Heart } from 'lucide-react';
import { useParams } from 'react-router';

export const MovieInfo = () => {
	const { movieId } = useParams();
	const { data: movie, isLoading, error } = useFetchMovieDetail(movieId || '');
	const { addFavoriteMutation } = useFavorites();

	scrollTo(0, 0);
	console.log('Movie data:', movie);

	if (isLoading) return <Loader />;
	if (error) return <div>Error loading movie details: {error.message}</div>;

	return (
		<>
			{movie ? (
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
								<h1>{movie.title}</h1>
							</div>

							<div>
								<button onClick={() => addFavoriteMutation.mutate(movie.id)}>
									<Heart className='w-7 h-7' />
									<span>Add to Favorites</span>
								</button>
								<ListsDialog movieId={movie.id} action='addMovieToList' />
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
						<MovieVideos movie={movie} />
						<MovieReviews movie={movie} />
					</section>
				</>
			) : (
				<div className='container-sm'>
					<h1 className='text-center'>Movie not found</h1>
					<p className='text-center text-gray-500'>The movie you are looking for does not exist or has been removed.</p>
				</div>
			)}
		</>
	);
};

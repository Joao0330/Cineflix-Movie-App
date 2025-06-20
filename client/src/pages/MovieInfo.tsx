import { Loader } from '@/components/Loader';
import { MobileToggleButton } from '@/components/sidebar/MobileToggleButton';
import { useFetchMovieDetails } from '@/hooks/useFetchMovies';
import { ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router';

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
						<button>
							<ChevronDown className='w-15 h-15 animate-bounce [animation-duration:1.5s]' />
						</button>
					</div>
				</div>
			</section>

			<section className='movieInfo__details'>
				<div className='movieInfo__details__top'>
					<h2>{movie.title}</h2>
					<p>{movie.overview}</p>

					<div className='movieInfo__details__top-info'>
						<div>
							<strong>Release Date:</strong>
							<span>{new Date(movie.release_date).toLocaleDateString()}</span>
						</div>

						<div>
							<strong>Genres:</strong>
							{movie.genres.map((genre: MovieGenre) => (
								<span key={genre.id}>
									<Link to={`/genres/${genre.id}`}>{genre.name}</Link>
								</span>
							))}
						</div>
						<div>
							<strong>Status:</strong>
							<span>{movie.status}</span>
						</div>

						<div>
							<strong>Runtime:</strong>
							<span>{movie.runtime} minutes</span>
						</div>

						<div>
							<strong>Production companies:</strong>

							{movie.production_companies.map(company => (
								<span key={company.id}>{company.name},</span>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

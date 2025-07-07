import { Link } from 'react-router';

export const MovieInfoTop = ({ movie }: { movie: Movie }) => {
	return (
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
					{movie.genres?.map((genre: MovieGenre) => (
						<span key={genre.id}>
							<Link to={`/browse/${genre.id}`}>{genre.name}</Link>
						</span>
					))}
				</div>
				<div>
					<strong>Status:</strong>
					<span>{movie.status}</span>
				</div>

				<div>
					<strong>Duration:</strong>
					<span>{movie.runtime} minutes</span>
				</div>

				<div>
					<strong>Production companies:</strong>

					{movie.production_companies.map((company: MovieCompany) => (
						<span key={company.id}>{company.name},</span>
					))}
				</div>
			</div>
		</div>
	);
};

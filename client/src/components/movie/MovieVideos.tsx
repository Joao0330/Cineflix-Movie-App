export const MovieVideos = ({ movie }: { movie: Movie }) => {
	const movieTrailers = movie.videos?.results.filter(video => video.type === 'Trailer');

	return (
		<section className='movieInfo__details__videos'>
			<h4>Videos:</h4>
			{movieTrailers.length ? (
				<div className='movieInfo__details__videos-list'>
					{movieTrailers.slice(0, 3).map(video => (
						<div key={video.id}>
							<iframe
								src={`https://www.youtube.com/embed/${video.key}`}
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
								title={video.name || 'Movie Video'}
								onError={() => (
									<p>
										Unable to load video. Please disable ad blockers or try another browser.
										<a href={`https://www.youtube.com/watch?v=${video.key}`} target='_blank' rel='noopener noreferrer'>
											Watch on YouTube
										</a>
									</p>
								)}
							></iframe>
						</div>
					))}
				</div>
			) : (
				<p>No videos available for this movie.</p>
			)}
		</section>
	);
};

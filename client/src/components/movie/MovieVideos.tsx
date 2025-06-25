export const MovieVideos = ({ movie }: { movie: Movie }) => {
	return (
		<section className='movieInfo__details__videos'>
			<h4>Videos:</h4>
			{movie.videos?.results.length ? (
				<div className='movieInfo__details__videos-list'>
					{movie.videos.results
						.map(video => (
							<div key={video.id}>
								<iframe src={`https://www.youtube.com/embed/${video.key}`} allowFullScreen></iframe>
							</div>
						))
						.slice(0, 3)}{' '}
				</div>
			) : (
				<p>No videos available for this movie.</p>
			)}
		</section>
	);
};

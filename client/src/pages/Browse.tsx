import { Loader } from '@/components/Loader';
import { SearchBrowse } from '@/components/search/SearchBrowse';
import { SearchBrowsePagination } from '@/components/search/SearchBrowsePagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useFetchMovieGenres, useFetchMoviesBrowse } from '@/hooks/useFetchMovies';
import { movieBrowseSchema } from '@/schemas/movie.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router';
import type { z } from 'zod';

export const Browse = () => {
	const [searchParams, setSearchParams] = useState<z.infer<typeof movieBrowseSchema> | null>(null);
	const [page, setPage] = useState(1);
	const { genreId } = useParams<{ genreId?: string }>();

	const form = useForm<z.infer<typeof movieBrowseSchema>>({
		resolver: zodResolver(movieBrowseSchema),
		defaultValues: {
			search: '',
			genres: genreId ? [genreId] : [],
			year: '',
			sortBy: 'popularity',
			order: 'desc',
		},
	});

	const { data: movies, isLoading } = useFetchMoviesBrowse({
		search: searchParams?.search || '',
		genres: searchParams?.genres || [],
		year: searchParams?.year || '',
		sortBy: searchParams?.sortBy || 'popularity',
		order: searchParams?.order || 'desc',
		page,
		enabled: !!searchParams,
	});

	const { data: genres, isLoading: genresIsLoading } = useFetchMovieGenres();

	const onSubmit = (browseData: z.infer<typeof movieBrowseSchema>) => {
		console.log('Search data:', browseData);
		setSearchParams(browseData);
	};

	useEffect(() => {
		if (genreId && genres && !searchParams) {
			const isValidGenre = genres.some((genre: MovieGenre) => genre.id.toString() === genreId);
			if (isValidGenre) {
				form.handleSubmit(onSubmit)();
			}
		}
	}, [genreId, genres, searchParams, form]);

	if (genresIsLoading) {
		return <Loader />;
	}

	return (
		<div className='browse'>
			<div className='container-sm'>
				<h1>Browse on Cineflix</h1>
				<p>Explore our deep collection of shows bellow</p>

				<SearchBrowse form={form} genres={genres} onSubmit={onSubmit} />
			</div>
			<Separator className='my-10' />
			<div className='container-sm'>
				{isLoading && <div>Loading movies...</div>}

				{movies?.results?.length === 0 && !isLoading && <p className='text-center text-gray-400'>No movies found for your search criteria.</p>}

				{movies?.results?.length > 0 && (
					<>
						<section className='browse__content'>
							{movies.results.map((movie: Movie) => (
								<article key={movie.id}>
									<Link to={`/movies/${movie.id}`}>
										<Card className='bg-gray-800 hover:bg-gray-700 transition-colors'>
											<CardHeader>
												<img
													src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://placehold.co/200x290?text=Movie not found'}
													alt={movie.title}
													className='w-full h-auto rounded-md'
													loading='lazy'
												/>
											</CardHeader>
											<CardContent>
												<CardTitle className='text-lg overflow-hidden h-[90px]'>{movie.title}</CardTitle>
												<p className='text-sm text-gray-400'>{movie.release_date?.split('-')[0]}</p>
												<p className='text-sm text-yellow-400'>★ {movie.vote_average.toFixed(1)}</p>
											</CardContent>
										</Card>
									</Link>
								</article>
							))}
						</section>

						<SearchBrowsePagination page={page} setPage={setPage} movies={movies} />
					</>
				)}
			</div>
		</div>
	);
};

import { SearchBrowse } from '@/components/search/SearchBrowse';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useFetchMovieGenres, useFetchMoviesBrowse } from '@/hooks/useFetchMovies';
import { movieBrowseSchema } from '@/schemas/movie.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import type { z } from 'zod';

export const Browse = () => {
	const [searchParams, setSearchParams] = useState<z.infer<typeof movieBrowseSchema> | null>(null);

	const form = useForm<z.infer<typeof movieBrowseSchema>>({
		resolver: zodResolver(movieBrowseSchema),
		defaultValues: {
			search: '',
			genre: '',
			year: '',
			sortBy: 'popularity',
			order: 'desc',
		},
	});

	const { data: movies, isLoading } = useFetchMoviesBrowse({
		search: searchParams?.search || '',
		genre: searchParams?.genre || '',
		year: searchParams?.year || '',
		sortBy: searchParams?.sortBy || 'popularity',
		order: searchParams?.order || 'desc',
	});

	const { data: genres } = useFetchMovieGenres();

	const onSubmit = (browseData: z.infer<typeof movieBrowseSchema>) => {
		console.log('Search data:', browseData);
		setSearchParams(browseData);
	};

	return (
		<div className='px-[3rem] md:pl-[3rem] md:pr-[5rem] min-h-screen bg-gray-900 text-white py-25'>
			<div className='container-sm'>
				<h1 className='text-4xl mb-7'>Browse on Cineflix</h1>
				<p>Explore our deep colection of shows bellow</p>

				<SearchBrowse form={form} genres={genres} onSubmit={onSubmit} />
			</div>
			<Separator className='my-10' />
			<div className='container-sm'>
				{isLoading && <div>Loading movies...</div>}

				{movies?.results?.length === 0 && !isLoading && <p className='text-center text-gray-400'>No movies found for your search criteria.</p>}

				{movies?.results?.length > 0 && (
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
						{movies.results.map((movie: Movie) => (
							<Link to={`/movies/${movie.id}`} key={movie.id}>
								<Card className='bg-gray-800 hover:bg-gray-700 transition-colors'>
									<CardHeader>
										<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='w-full h-auto rounded-md' />
									</CardHeader>
									<CardContent>
										<CardTitle className='text-lg overflow-hidden h-[90px]'>{movie.title}</CardTitle>
										<p className='text-sm text-gray-400'>{movie.release_date?.split('-')[0]}</p>
										<p className='text-sm text-yellow-400'>★ {movie.vote_average.toFixed(1)}</p>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				)}

				{/* TODO: Change the genre filter to include multiple filters */}
				{/* TODO: Make so when on the movieInfo page of a movie and when clicked on the genre of the movie, it goes to the browse page with the genre selected */}
			</div>
		</div>
	);
};

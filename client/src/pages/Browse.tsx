import { Loader } from '@/components/Loader';
import { SearchBrowse } from '@/components/search/SearchBrowse';
import { Separator } from '@/components/ui/separator';
import { useFetchMovieGenres, useFetchMoviesBrowse } from '@/hooks/useFetchMovies';
import { movieBrowseSchema } from '@/schemas/movie.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export const Browse = () => {
	const [searchParams, setSearchParams] = useState<z.infer<typeof schema> | null>(null);

	const schema = movieBrowseSchema;
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			search: '',
			genre: '',
			year: '',
			sortBy: 'title',
			order: 'asc',
		},
	});

	const { data: movies, isLoading } = useFetchMoviesBrowse({
		search: searchParams?.search || '',
		genre: searchParams?.genre || '',
		year: searchParams?.year || '',
		sortBy: searchParams?.sortBy || 'title',
		order: searchParams?.order || 'asc',
	});

	const { data: genres } = useFetchMovieGenres();

	const onSubmit = (browseData: z.infer<typeof schema>) => {
		console.log('Search data:', browseData);
		setSearchParams(browseData);
	};

	/* TODO: Move all the movie browse related logic, and maybe all the movie data into a separate context */
	/* TODO: Refactor the display of the browsed movies, include the possibility to search for an empty movie and display all movies */

	return (
		<div className='px-[3rem] md:pl-[3rem] md:pr-[5rem] min-h-screen bg-gray-900 text-white py-25'>
			<div className='container-sm'>
				<h1 className='text-4xl mb-7'>Browse on Cineflix</h1>
				<p>Explore our deep colection of shows bellow</p>

				<SearchBrowse form={form} genres={genres} onSubmit={onSubmit} />
			</div>
			<Separator className='my-10' />
			<div className='container-sm'>
				{isLoading && <Loader />}

				{movies?.results?.length === 0 && !isLoading && <p className='text-center text-gray-400'>No movies found for your search criteria.</p>}

				{movies?.results?.length > 0 && (
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
						{movies.results.map((movie: Movie) => (
							<div key={movie.id} className='bg-gray-800 p-4 rounded-lg'>
								<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='w-full h-auto rounded-md mb-2' />
								<h3 className='text-lg font-semibold'>{movie.title}</h3>
								<p className='text-sm text-gray-400'>{movie.release_date}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

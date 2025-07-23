import { Loader } from '@/components/Loader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useFetchMultipleMovieDetails } from '@/hooks/useFetchMovies';
import { useLists } from '@/hooks/useLists';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface useListsReturn {
	lists: MovieList[];
	isLoading: boolean;
	error: Error | null;
}

export const Lists = () => {
	const { lists, isLoading, error } = useLists() as useListsReturn;

	const externalIds = lists ? lists.flatMap(list => list.movies.map(movie => movie.external_id)) : [];

	const {
		data: movieDetails = [],
		isLoading: isMoviesLoading,
		error: moviesError,
	} = useFetchMultipleMovieDetails(externalIds, {
		enabled: !!lists && externalIds.length > 0,
	});

	if (isLoading) return <Loader />;
	if (error) {
		toast.error('Failed to load lists');
		return <div>Failed to load lists</div>;
	}
	if (moviesError) {
		toast.error('Failed to load movie details');
		return <div>Failed to load movie details</div>;
	}

	const moviesWithLists: MovieWithList[] = lists.map(list => ({
		list,
		movies: list.movies.map(movie => movieDetails.find(item => item.id === movie.external_id) || null),
	}));

	console.log(movieDetails);

	return (
		<section className='lists'>
			<div className='container-sm'>
				<div className='lists__top'>
					<h2>Lists</h2>
					<p className='text-gray-400'>Manage your custom lists of movies and shows.</p>
				</div>

				<div className='lists__content'>
					{moviesWithLists.length > 0 ? (
						<Accordion type='single' collapsible>
							{moviesWithLists.map(({ list, movies }) => (
								<AccordionItem className='overflow-hidden' key={list.id} value={`list-${list.id}`}>
									<AccordionTrigger className='cursor-pointer flex justify-between'>
										<h3 className='text-lg font-semibold'>{list.title}</h3>
										<small>Created at {format(new Date(list.created_at), 'MMMM d, yyyy')}</small>
									</AccordionTrigger>
									<AccordionContent>
										{isMoviesLoading ? (
											<div>Loading movies...</div>
										) : movies.length > 0 ? (
											<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
												{movies.map((movie, index) => {
													const movieStatus = list.movies[index]?.status || 'Unknown';
													return (
														<li key={`${movie?.id || index}-${list.id}`} className='flex items-center gap-4 py-2'>
															{movie ? (
																<div className='flex items-center gap-2'>
																	<img
																		src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://placehold.co/130x200?text=Image+not+found'}
																		alt={movie.title}
																		className='w-16 h-24 object-cover'
																	/>
																	<div>
																		<span className='font-semibold'>{movie.title}</span>
																		<p className='text-sm text-gray-500'>Status: {movieStatus}</p>
																	</div>
																</div>
															) : (
																<span>Unknown Movie</span>
															)}
														</li>
													);
												})}
											</ul>
										) : (
											<p>No movies found in this list.</p>
											/* TODO: Remake the layout of the lists */
										)}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					) : (
						<div>No lists found. Create your first list!</div>
					)}
				</div>
			</div>
		</section>
	);
};

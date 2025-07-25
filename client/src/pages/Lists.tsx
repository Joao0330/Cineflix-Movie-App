import { MovieListDialog } from '@/components/lists/MovieListDialog';
import { ListsDialog } from '@/components/lists/ListsDialog';
import { Loader } from '@/components/Loader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useFetchMultipleMovieDetails } from '@/hooks/useFetchMovies';
import { useLists } from '@/hooks/useLists';
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface useListsReturn {
	lists: MovieList[];
	isLoading: boolean;
	error: Error | null;
	deleteListMutation: {
		mutate: (listId: number) => void;
	};
}

export const Lists = () => {
	const { lists, isLoading, error, deleteListMutation } = useLists() as useListsReturn;
	const [selectedMovie, setSelectedMovie] = useState<{
		movie: Movie | null;
		movieStatus: string;
		listId: number;
	} | null>(null);

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

	return (
		<section className='lists'>
			<div className='container-sm'>
				<div className='lists__top'>
					<h2>Lists</h2>
					<p className='text-gray-400'>Manage your custom lists of movies and shows.</p>
				</div>

				<div className='mt-10 flex flex-col gap-5 justify-between sm:flex-row sm:items-center'>
					{lists.length > 0 ? (
						<p>
							You currently have {lists.length} {lists.length === 1 ? 'list' : 'lists'}.
						</p>
					) : (
						<p>You have no lists yet. Create your first list!</p>
					)}

					<ListsDialog action='createList' />
				</div>

				<div className='mt-10'>
					{moviesWithLists.length > 0 ? (
						<>
							<Accordion type='single' collapsible className='flex flex-col gap-10'>
								{moviesWithLists.map(({ list, movies }) => (
									<AccordionItem className='overflow-hidden border-1 p-5 rounded-2xl' key={list.id} value={`list-${list.id}`}>
										<AccordionTrigger className='cursor-pointer flex justify-between items-center'>
											<div>
												<h3 className='text-lg font-semibold'>{list.title}</h3>
												<small className='text-gray-400 font-normal '>Created at {format(new Date(list.created_at), 'MMMM d, yyyy')}</small>
											</div>
										</AccordionTrigger>
										<button
											className='ml-auto flex items-center cursor-pointer gap-2 py-2 px-5 rounded-full transition-colors hover:bg-red-500 hover:text-white'
											onClick={() => deleteListMutation.mutate(list.id)}
										>
											<Trash />
											<span className=' text-sm'>Delete List</span>
										</button>
										<AccordionContent>
											{isMoviesLoading ? (
												<div>Loading movies...</div>
											) : movies.length > 0 ? (
												<ul className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
													{movies.map((movie, index) => {
														const movieStatus = list.movies[index]?.status || 'Unknown';
														return (
															<li key={`${movie?.id || index}-${list.id}`} className='flex items-center gap-4 hover:bg-gray-transparent rounded'>
																{movie ? (
																	<button
																		className='flex gap-5 p-2 w-full cursor-pointer'
																		onClick={() =>
																			setSelectedMovie({
																				movie,
																				movieStatus,
																				listId: list.id,
																			})
																		}
																	>
																		<img
																			src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://placehold.co/130x200?text=Image+not+found'}
																			alt={movie.title}
																			className='w-16 h-24 object-cover'
																		/>
																		<div className='text-left'>
																			<span className='font-semibold'>{movie.title}</span>
																			<p className='text-sm text-gray-500'>Status: {movieStatus.replace('_', ' ')}</p>
																		</div>
																	</button>
																) : (
																	<span>Unknown Movie</span>
																)}
															</li>
														);
													})}
												</ul>
											) : (
												<p>No titles found in this list.</p>
											)}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
							{selectedMovie && <MovieListDialog movie={selectedMovie.movie} movieStatus={selectedMovie.movieStatus} listId={selectedMovie.listId} onClose={() => setSelectedMovie(null)} />}
						</>
					) : (
						<div>No lists found. Create your first list!</div>
					)}
				</div>
			</div>
		</section>
	);
};

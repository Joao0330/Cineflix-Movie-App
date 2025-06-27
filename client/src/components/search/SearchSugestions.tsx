import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useFetchMovieSearch } from '@/hooks/useFetchMovies';
import { Link } from 'react-router';
import { ScrollArea } from '../ui/scroll-area';
import { useSidebar } from '../ui/sidebar';

export const SearchSugestions = ({ setIsSearchOpen }: { setIsSearchOpen: () => void }) => {
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');
	const { setOpenMobile } = useSidebar();

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 500);

		return () => clearTimeout(timer);
	}, [query]);

	const { data: movies, isLoading } = useFetchMovieSearch(debouncedQuery);

	return (
		<div className='search__sugestions'>
			<Input type='search' placeholder='Search for movies...' className='w-full' value={query} onChange={e => setQuery(e.target.value)} />

			{isLoading && <div className='mt-2 text-sm'>Loading...</div>}

			{movies?.results?.length > 0 && (
				<ul>
					<ScrollArea className='border h-76'>
						{movies.results.slice(0, 5).map((movie: Movie) => (
							<li
								key={movie.id}
								onClick={() => {
									setIsSearchOpen();
									setOpenMobile(false);
								}}
							>
								<Link to={`/movies/${movie.id}`}>
									<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='w-12 h-18 mr-2 rounded' />
									<strong>{movie.title}</strong>
								</Link>
							</li>
						))}
					</ScrollArea>
				</ul>
			)}
		</div>
	);
};

import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useFetchMovieSearch } from '@/hooks/useFetchMovies';
import { Link } from 'react-router';

export const SearchSugestions = ({ setIsSearchOpen }: { setIsSearchOpen: () => void }) => {
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 500);

		return () => clearTimeout(timer);
	}, [query]);

	const { data: movies, isLoading } = useFetchMovieSearch(debouncedQuery);

	return (
		<div className='py-4 relative'>
			<Input type='search' placeholder='Search for movies...' className='w-full' value={query} onChange={e => setQuery(e.target.value)} />

			{isLoading && <div className='mt-2 text-sm'>Loading...</div>}

			{movies?.results?.length > 0 && (
				<ul className='absolute z-10 bg-white dark:bg-gray-900 w-full mt-2 rounded border shadow-lg max-h-64 overflow-auto'>
					{movies.results.slice(0, 5).map((movie: Movie) => (
						<li
							key={movie.id}
							className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
							onClick={() => {
								setIsSearchOpen();
							}}
						>
							<Link to={`/movies/${movie.id}`} className='flex items-center justify-between'>
								<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='w-12 h-18 mr-2 rounded' />
								<strong>{movie.title}</strong>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

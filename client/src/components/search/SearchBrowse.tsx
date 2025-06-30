import { movieBrowseSchema } from '@/schemas/movie.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Form } from '../ui/form';
import { SearchBrowseItems } from './SearchBrowseItems';
import { useFetchMovieGenres } from '@/hooks/useFetchMovies';

export const SearchBrowse = () => {
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

	const { data: genres } = useFetchMovieGenres();

	const onSubmit = (data: z.infer<typeof schema>) => {
		console.log('Search data:', data);
		// Handle search logic here, e.g., API call to fetch movies based on the search criteria
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-10 mt-5'>
					{/* Browse search bar */}
					<SearchBrowseItems type='search' form={form} />

					<div className='flex flex-col justify-center items-center gap-8 sm:flex-row sm:gap-4'>
						{/* Browse sort options */}
						<SearchBrowseItems type='sort' form={form} genres={genres} />
					</div>

					<button type='submit' className='px-4 py-2 bg-blue-light rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer'>
						Search
					</button>
				</div>

				<p className='mt-4 text-sm text-gray-400 text-center'>You can search by title, genre, and year.</p>
			</form>
		</Form>
	);
};

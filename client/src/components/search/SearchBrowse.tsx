import type { UseFormReturn } from 'react-hook-form';
import { Form } from '../ui/form';
import { SearchBrowseItems } from './SearchBrowseItems';
import type { z } from 'zod';
import type { movieBrowseSchema } from '@/schemas/movie.schema';

interface SearchBrowseProps {
	form: UseFormReturn<z.infer<typeof movieBrowseSchema>>;
	genres: MovieGenre[];
	onSubmit: (data: z.infer<typeof movieBrowseSchema>) => void;
}

export const SearchBrowse = ({ form, genres, onSubmit }: SearchBrowseProps) => {
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='browse__search'>
					{/* Browse search bar */}
					<SearchBrowseItems type='search' form={form} />

					<div className='browse__search-sort'>
						{/* Browse sort options */}
						<SearchBrowseItems type='sort' form={form} genres={genres} />
					</div>

					<button type='submit'>Search</button>
				</div>

				<p className='mt-4 text-sm text-gray-400 text-center'>You can search by title, genre, and year.</p>
			</form>
		</Form>
	);
};

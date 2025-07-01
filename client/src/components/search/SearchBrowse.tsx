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

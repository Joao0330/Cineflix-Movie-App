import type { movieBrowseSchema } from '@/schemas/movie.schema';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import type { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { searchBrowseItemsData } from '@/data/searchBrowseItemsData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SearchBrowseItemsProps {
	type: 'search' | 'sort';
	form: ReturnType<typeof useForm<z.infer<typeof movieBrowseSchema>>>;
	genres?: MovieGenre[];
}

export const SearchBrowseItems = ({ type, form, genres }: SearchBrowseItemsProps) => {
	return (
		<>
			{type === 'search' && (
				<FormField
					control={form.control}
					name='search'
					render={({ field }) => (
						<FormItem className='w-full mb-5'>
							<FormControl>
								<Input {...field} type='text' name='search' placeholder='Search for a movie or show...' className='w-full p-3 rounded-md bg-gray-800 text-white' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			{type === 'sort' &&
				searchBrowseItemsData.map(item => (
					<FormField
						key={item.name}
						control={form.control}
						name={item.name as 'genre' | 'year' | 'sortBy' | 'order' | 'search'}
						render={({ field }) => (
							<FormItem className='w-[240px]'>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl className='w-full cursor-pointer'>
										<SelectTrigger>
											<SelectValue placeholder={item.placeholder} />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='bg-gray-800 text-white'>
										{item.name === 'genre' &&
											genres?.map(genre => (
												<SelectItem key={genre.id} value={genre.name}>
													{genre.name}
												</SelectItem>
											))}
										{item.options?.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormDescription className='text-center'>{item.description}</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
		</>
	);
};

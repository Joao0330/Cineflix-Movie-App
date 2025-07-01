import type { movieBrowseSchema } from '@/schemas/movie.schema';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Controller, type useForm } from 'react-hook-form';
import type { z } from 'zod';
import { searchBrowseItemsData } from '@/data/searchBrowseItemsData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

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
					<FormItem key={item.name} className='w-[240px]'>
						{item.name === 'genres' ? (
							<>
								<Controller
									control={form.control}
									name='genres'
									render={({ field }) => (
										<>
											<Select
												onValueChange={value => {
													if (!field.value?.includes(value)) {
														field.onChange([...(field.value || []), value]);
													}
												}}
											>
												<FormControl className='w-full cursor-pointer'>
													<SelectTrigger>
														<SelectValue placeholder={item.placeholder} />
													</SelectTrigger>
												</FormControl>
												<SelectContent className='bg-gray-800 text-white'>
													{genres?.map(genre => (
														<SelectItem key={genre.id} value={genre.id.toString()} disabled={field.value?.includes(genre.id.toString())}>
															{genre.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<div className='flex flex-wrap gap-2 mt-2'>
												{field.value?.map((genreId: string) => {
													const genre = genres?.find(g => g.id.toString() === genreId);
													return (
														<Badge
															key={genreId}
															variant='secondary'
															className='cursor-pointer hover:bg-gray-700'
															onClick={() => {
																field.onChange(field.value?.filter(id => id !== genreId));
															}}
														>
															{genre?.name} ✕
														</Badge>
													);
												})}
											</div>
										</>
									)}
								/>
								<FormDescription className='text-center'>{item.description}</FormDescription>
								<FormMessage />
							</>
						) : (
							<FormField
								control={form.control}
								name={item.name as 'year' | 'sortBy' | 'order'}
								render={({ field }) => (
									<FormItem className='w-[240px]'>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl className='w-full cursor-pointer'>
												<SelectTrigger>
													<SelectValue placeholder={item.placeholder} />
												</SelectTrigger>
											</FormControl>
											<SelectContent className='bg-gray-800 text-white'>
												{item.name === 'genre' && (
													<>
														{genres?.map(genre => (
															<SelectItem key={genre.id} value={genre.id.toString()}>
																{genre.name}
															</SelectItem>
														))}
													</>
												)}
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
						)}
					</FormItem>
				))}
		</>
	);
};

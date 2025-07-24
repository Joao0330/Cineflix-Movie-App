import type { movieBrowseSchema } from '@/schemas/movie.schema';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Controller, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { searchBrowseItemsData } from '@/data/searchBrowseItemsData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';

interface MovieGenre {
	id: number;
	name: string;
}

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
							<FormControl className='relative'>
								<Input {...field} type='text' name='search' placeholder='Search for a movie or show...' className='w-full p-3 rounded-md bg-gray-800 text-white' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
			{type === 'sort' &&
				searchBrowseItemsData.map(item => (
					<FormItem key={item.name}>
						{item.name === 'genres' ? (
							<>
								<Controller
									control={form.control}
									name='genres'
									render={({ field }) => (
										<>
											<ScrollArea className='h-[200px] w-full rounded-md border border-border bg-primary-foreground p-4 '>
												<div className='h-[150px] flex flex-wrap gap-5 justify-center'>
													{genres?.map(genre => (
														<div key={genre.id} className='flex items-center space-x-2'>
															<Checkbox
																className='cursor-pointer'
																id={`genre-${genre.id}`}
																checked={field.value?.includes(genre.id.toString())}
																onCheckedChange={checked => {
																	if (checked) {
																		field.onChange([...(field.value || []), genre.id.toString()]);
																	} else {
																		field.onChange(field.value?.filter(id => id !== genre.id.toString()));
																	}
																}}
															/>
															<Label htmlFor={`genre-${genre.id}`} className='text-white cursor-pointer'>
																{genre.name}
															</Label>
														</div>
													))}
												</div>
											</ScrollArea>
											<FormDescription className='text-center mt-2'>{item.description}</FormDescription>
											<FormMessage />
										</>
									)}
								/>
							</>
						) : item.name === 'year' ? (
							<>
								<FormField
									control={form.control}
									name='year'
									render={({ field }) => (
										<>
											<FormControl>
												<Input
													{...field}
													type='number'
													placeholder={item.placeholder}
													className='w-[350px] sm:w-[240px] rounded-md bg-gray-800 text-white'
													min='1900'
													max={new Date().getFullYear()}
													onChange={e => field.onChange(e.target.value)}
													onWheel={e => e.currentTarget.blur()}
												/>
											</FormControl>
											<FormDescription className='text-center'>{item.description}</FormDescription>
											<FormMessage />
										</>
									)}
								/>
							</>
						) : (
							<FormField
								control={form.control}
								name={item.name as 'sortBy' | 'order'}
								render={({ field }) => (
									<>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl className='w-[350px] sm:w-[240px] cursor-pointer'>
												<SelectTrigger>
													<SelectValue placeholder={item.placeholder} />
												</SelectTrigger>
											</FormControl>
											<SelectContent className='bg-gray-800 text-white'>
												{item.options?.map(option => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormDescription className='text-center'>{item.description}</FormDescription>
										<FormMessage />
									</>
								)}
							/>
						)}
					</FormItem>
				))}
		</>
	);
};

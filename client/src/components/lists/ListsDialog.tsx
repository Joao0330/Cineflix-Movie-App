import { List, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { createListSchema } from '@/schemas/lists.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useLists } from '@/hooks/useLists';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { ScrollArea } from '../ui/scroll-area';

export const ListsDialog = ({ movieId }: { movieId: number }) => {
	const [createListOpen, setCreateListOpen] = useState(false);
	const { addListMutation, addMovieToListMutation, lists, isLoading, error } = useLists();

	const form = useForm<z.infer<typeof createListSchema>>({
		resolver: zodResolver(createListSchema),
		defaultValues: {
			title: '',
		},
	});

	const onSubmit = (listName: z.infer<typeof createListSchema>) => {
		console.log(listName.title);
		addListMutation.mutate(listName.title);

		if (addListMutation.isSuccess) {
			setCreateListOpen(false);
			form.reset();
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) {
		toast.error('Failed to load favorites');
		return <div>Failed to load favorites</div>;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button>
					<List className='w-7 h-7' />
					<span>Add to List</span>
				</button>
			</DialogTrigger>

			<DialogContent className='dark mt-30'>
				<DialogHeader>
					<DialogTitle>Lists</DialogTitle>
				</DialogHeader>
				<div className='mt-5'>
					<h3>See your current lists bellow</h3>
				</div>
				<Separator />

				<div className='mt-5'>
					{lists.length > 0 ? (
						<ScrollArea className='border h-[200px] px-5'>
							<ul>
								{lists.map((list: MovieList) => (
									<li key={list.id} className='flex items-center justify-between py-2'>
										<div className='flex gap-2'>
											<strong>{list.title}</strong>
											<span className='text-gray-500'>{list.movies.length} movies</span>
										</div>
										<Tooltip>
											<TooltipTrigger asChild>
												<button
													className='border p-2 rounded-full cursor-pointer transition hover:bg-gray-dark'
													onClick={() => addMovieToListMutation.mutate({ listId: list.id, externalId: movieId })}
												>
													<Plus className='w-5 h-5' />
												</button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Add movie to this list</p>
											</TooltipContent>
										</Tooltip>
									</li>
								))}
							</ul>
						</ScrollArea>
					) : (
						<p>No lists available. Create a new one!</p>
					)}
				</div>

				<div className='mt-5'>
					<button className='flex gap-2 items-center cursor-pointer py-3 px-5 rounded-3xl hover:bg-gray-transparent' onClick={() => setCreateListOpen(true)}>
						<Plus className='w-5 h-5' />
						<span>Create New List</span>
					</button>
					{createListOpen && (
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<div className='mt-4'>
									<FormField
										control={form.control}
										name='title'
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input {...field} type='text' name='title' placeholder='Enter list title' className='border p-2 rounded w-full' />
												</FormControl>
											</FormItem>
										)}
									/>
									<button type='submit' className='mt-2 bg-blue-light text-white px-4 py-2 rounded cursor-pointer'>
										Create List
									</button>
									<button type='button' onClick={() => setCreateListOpen(false)} className='ml-2 bg-gray-300 text-black px-4 py-2 rounded cursor-pointer'>
										Cancel
									</button>
								</div>
							</form>
						</Form>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

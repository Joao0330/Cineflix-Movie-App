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

export const ListsDialog = () => {
	const [createListOpen, setCreateListOpen] = useState(false);
	const { addListMutation } = useLists();

	const form = useForm<z.infer<typeof createListSchema>>({
		resolver: zodResolver(createListSchema),
		defaultValues: {
			title: '',
		},
	});

	const onSubmit = (listName: z.infer<typeof createListSchema>) => {
		addListMutation.mutate(listName.title);

		if (addListMutation.isSuccess) {
			setCreateListOpen(false);
			form.reset();
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button>
					<List className='w-7 h-7' />
					<span>Add to List</span>
				</button>
			</DialogTrigger>

			<DialogContent className='dark'>
				<DialogHeader>
					<DialogTitle>Lists</DialogTitle>
				</DialogHeader>
				<div className='mt-5'>
					<h3>See your current lists bellow</h3>
				</div>
				<Separator />
				<div>
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
									<button type='submit' className='mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>
										Create List
									</button>
								</div>
							</form>
						</Form>
					)}
					{/* TODO: Change the input to one that uses the formField from shadCn to fix a problem of not doing anything when submiting. See the SearchBrowseItems.tsx for reference */}
					{/* TODO: Change the watching to the Movie model on the prisma scheme instead of staying in the lists table */}
				</div>
			</DialogContent>
		</Dialog>
	);
};

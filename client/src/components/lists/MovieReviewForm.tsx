import { useReviews } from '@/hooks/useReviews';
import { reviewSchema } from '@/schemas/review.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';

export const MovieReviewForm = ({ movie }: { movie: Movie | null }) => {
	const { addReviewMutation } = useReviews();

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			content: '',
			rating: 0,
		},
	});

	if (!movie) return null;

	const onSubmit = (review: z.infer<typeof reviewSchema>) => {
		console.log(review.content);
		addReviewMutation.mutate({
			movieId: movie.id,
			content: review.content,
			rating: review.rating,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div>
					<h3 className='mb-5'>Leave a review for this show</h3>
					<FormField
						control={form.control}
						name='content'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea {...field} name='content' placeholder='Write your review here...' />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='rating'
						render={({ field }) => (
							<Select onValueChange={val => field.onChange(Number(val))} value={field.value ? String(field.value) : ''}>
								<FormControl className='w-[180px] mt-2'>
									<SelectTrigger>
										<SelectValue placeholder='Select rating' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='dark bg-primary-foreground'>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
										<SelectItem key={value} value={String(value)}>
											{value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					/>

					<Button type='submit' className='mt-5 cursor-pointer'>
						Submit Review
					</Button>
				</div>
			</form>
		</Form>
	);
};

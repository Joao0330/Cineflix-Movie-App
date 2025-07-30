import { useReviews } from '@/hooks/useReviews';
import { reviewSchema } from '@/schemas/review.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';

interface MovieReviewFormProps {
	movie?: Movie | null;
	onClose: () => void;
	type: 'edit' | 'add';
	review?: Review | null;
}

const RATING_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export const MovieReviewForm = ({ movie, onClose, type, review }: MovieReviewFormProps) => {
	const { addReviewMutation, updateReviewMutation } = useReviews();

	const form = useForm<z.infer<typeof reviewSchema> & { id?: number }>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			id: type === 'edit' && review ? review.id : undefined,
			content: type === 'edit' && review ? review.content : '',
			rating: type === 'edit' && review ? review.rating : 0,
		},
	});

	console.log(review);

	if (type === 'add' && !movie) return null;

	const onSubmit = ({ id, content, rating }: z.infer<typeof reviewSchema> & { id?: number }) => {
		if (type === 'edit' && id) {
			console.log('logged');
			updateReviewMutation.mutate(
				{
					reviewId: id,
					content,
					rating,
				},
				{
					onSuccess: () => {
						onClose();
					},
				},
			);
		} else if (type === 'add' && movie) {
			addReviewMutation.mutate(
				{
					movieId: movie?.id ?? null,
					content,
					rating,
				},
				{
					onSuccess: () => {
						onClose();
						form.reset();
					},
				},
			);
		}
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
									{RATING_OPTIONS.map(value => (
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

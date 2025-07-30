import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useReviews } from '@/hooks/useReviews';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export const DeleteReviewDialog = ({ reviewId }: { reviewId: number }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { deleteReviewMutation } = useReviews();

	const handleDelete = (reviewId: number) => {
		deleteReviewMutation.mutate(reviewId);
		setIsDialogOpen(false);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<button>
					<Trash2 />
					<span>Delete</span>
				</button>
			</DialogTrigger>
			<DialogContent className='dark mt-30 w-[400px] sm:w-[100%] flex flex-col gap-7'>
				<DialogHeader>
					<DialogTitle>Delete Review?</DialogTitle>
				</DialogHeader>
				<p className='text-center leading-8'>Are you sure you want to delete this review? This action cannot be undone.</p>
				<DialogFooter className='gap-6 sm:justify-between'>
					<DialogClose asChild>
						<Button className='cursor-pointer' type='button'>
							Cancel
						</Button>
					</DialogClose>
					<Button variant='destructive' className='cursor-pointer' type='button' onClick={() => handleDelete(reviewId)}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

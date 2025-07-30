import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Edit } from 'lucide-react';
import { MovieReviewForm } from '../lists/MovieReviewForm';

export const UpdateReviewDialog = ({ review }: { review: Review }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<button>
					<Edit />
					<span>Edit</span>
				</button>
			</DialogTrigger>
			<DialogContent className='dark mt-30 w-[400px] sm:w-[100%] flex flex-col gap-7'>
				<DialogHeader>
					<DialogTitle>Update Review</DialogTitle>
				</DialogHeader>
				<MovieReviewForm type='edit' onClose={() => setIsDialogOpen(false)} review={review} />
			</DialogContent>
		</Dialog>
	);
};

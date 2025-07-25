import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { DialogHeader } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

interface MovieListDialogProps {
	movie: Movie | null;
	movieStatus: string;
	listId: number;
	onClose: () => void;
	deleteMovieFromListMutation: {
		mutate: (params: { listId: number; externalId: number }, options?: { onSuccess?: () => void }) => void;
	};
	updateMovieFromListMutation: {
		mutate: (params: { listId: number; externalId: number; status: 'WATCHING' | 'COMPLETED' | 'ON_HOLD' | 'DROPPED' | 'PLANNING' }, options?: { onSuccess?: () => void }) => void;
	};
	updateSelectedMovieStatus: (newStatus: string) => void;
}

export const MovieListDialog = ({ movie, movieStatus, listId, onClose, deleteMovieFromListMutation, updateMovieFromListMutation, updateSelectedMovieStatus }: MovieListDialogProps) => {
	if (!movie) return null;

	return (
		<Dialog open={!!movie} onOpenChange={onClose}>
			<DialogContent className='dark '>
				<DialogHeader>
					<DialogTitle className='text-lg font-semibold'>{movie.title}</DialogTitle>
				</DialogHeader>
				<div className='mt-5 flex gap-5'>
					<img
						src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://placehold.co/130x200?text=Image+not+found'}
						alt={movie.title}
						className='w-16 h-24 object-cover'
					/>
					<div>
						<p className='text-gray-500'>Edit the status of this title in your list.</p>
						<Select
							defaultValue={movieStatus}
							onValueChange={value =>
								updateMovieFromListMutation.mutate(
									{
										listId,
										externalId: movie.id,
										status: value as 'WATCHING' | 'COMPLETED' | 'ON_HOLD' | 'DROPPED' | 'PLANNING',
									},
									{
										onSuccess: () => {
											updateSelectedMovieStatus(value);
										},
									},
								)
							}
						>
							<SelectTrigger className='mt-2 w-[180px]'>
								<SelectValue placeholder='Select status' />
							</SelectTrigger>
							<SelectContent className='dark bg-primary-foreground'>
								<SelectItem value='WATCHING'>Watching</SelectItem>
								<SelectItem value='COMPLETED'>Completed</SelectItem>
								<SelectItem value='ON_HOLD'>On Hold</SelectItem>
								<SelectItem value='DROPPED'>Dropped</SelectItem>
								<SelectItem value='PLANNING'>Plan to watch</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant='destructive'
							className='mt-4 cursor-pointer'
							onClick={() => {
								deleteMovieFromListMutation.mutate(
									{ listId, externalId: movie.id },
									{
										onSuccess: onClose,
									},
								);
							}}
						>
							<Trash2 className='w-5 h-5 mr-2' /> Remove from List
						</Button>
					</div>
				</div>
				<Separator className='my-5' />
				{movieStatus === 'COMPLETED' || movieStatus === 'DROPPED' ? (
					<div>
						<h3 className='mb-5'>Leave a review for this show</h3>
						<Textarea placeholder='Write your review here...' />
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
};

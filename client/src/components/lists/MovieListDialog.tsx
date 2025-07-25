import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { DialogHeader } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { useLists } from '@/hooks/useLists';

interface MovieListDialogProps {
	movie: Movie | null;
	movieStatus: string;
	listId: number;
	onClose: () => void;
}

export const MovieListDialog = ({ movie, movieStatus, listId, onClose }: MovieListDialogProps) => {
	const { deleteMovieFromListMutation } = useLists();
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
							/* onValueChange={value =>
								updateMovieStatusMutation.mutate({
									listId,
									externalId: movie.id,
									status: value as 'WATCHING' | 'COMPLETED' | 'PLAN_TO_WATCH',
								})
							} */
							/* disabled={updateMovieStatusMutation.isLoading} */
						>
							<SelectTrigger className='mt-2 w-[180px]'>
								<SelectValue placeholder='Select status' />
							</SelectTrigger>
							<SelectContent className='dark bg-primary-foreground'>
								<SelectItem value='WATCHING'>Watching</SelectItem>
								<SelectItem value='COMPLETED'>Completed</SelectItem>
								<SelectItem value='PLAN_TO_WATCH'>Plan to Watch</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant='destructive'
							className='mt-4 cursor-pointer'
							onClick={() => {
								deleteMovieFromListMutation.mutate({ listId, externalId: movie.id });
								onClose();
							}}
						>
							<Trash2 className='w-5 h-5 mr-2' /> Remove from List
						</Button>
					</div>
				</div>
				<Separator className='my-5' />
			</DialogContent>
		</Dialog>
	);
};

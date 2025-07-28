import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { DialogHeader } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLists } from '@/hooks/useLists';
import { MovieReviewForm } from './MovieReviewForm';
import { Link } from 'react-router';
import { ScrollArea } from '../ui/scroll-area';

interface MovieListDialogProps {
	movie: Movie | null;
	movieStatus: string;
	listId: number;
	onClose: () => void;
	updateSelectedMovieStatus: (newStatus: string) => void;
}

export const MovieListDialog = ({ movie, movieStatus, listId, onClose, updateSelectedMovieStatus }: MovieListDialogProps) => {
	const { updateMovieFromListMutation, deleteMovieFromListMutation } = useLists();

	if (!movie) return null;

	return (
		<Dialog open={!!movie} onOpenChange={onClose}>
			<DialogContent className='dark mt-30 w-[400px] sm:w-[100%]'>
				<ScrollArea className='max-h-[400px]'>
					<DialogHeader className='flex items-center sm:flex-row sm:gap-5'>
						<DialogTitle className='text-lg font-semibold'>{movie.title}</DialogTitle>
						<Link to={`/movies/${movie.id}`} className='text-xs text-gray-500 hover:underline'>
							View movie page
						</Link>
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
					{movieStatus === 'COMPLETED' || movieStatus === 'DROPPED' ? (
						<>
							<Separator className='my-5' />
							<MovieReviewForm movie={movie} onClose={onClose} />
							<Separator className='my-5' />
							<Link to='/profile/reviews' className='hover:underline text-gray-500'>
								View and edit your reviews by clicking here.
							</Link>
						</>
					) : null}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

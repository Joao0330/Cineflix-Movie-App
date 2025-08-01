import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { EditUserForm } from './EditUserForm';

interface EditUserDialogProps {
	user: User | null;
}

export const EditUserDialog = ({ user }: EditUserDialogProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button className='cursor-pointer'>
					<Edit />
					<span>Edit user</span>
				</Button>
			</DialogTrigger>
			<DialogContent className='dark mt-30 w-[400px] sm:w-[100%] flex flex-col gap-7'>
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
				</DialogHeader>
				<EditUserForm user={user} onClose={() => setIsDialogOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

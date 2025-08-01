import { useProfiles } from '@/hooks/useProfiles';
import type { changeUserRole } from '@/schemas/auth.schema';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface EditUserDialogProps {
	user: User | null;
	onClose: () => void;
}

export const EditUserForm = ({ user, onClose }: EditUserDialogProps) => {
	const { changeUserRoleMutation } = useProfiles();

	const form = useForm<z.infer<typeof changeUserRole>>({
		defaultValues: {
			role: user?.role,
		},
	});

	const onSubmit = (data: z.infer<typeof changeUserRole>) => {
		changeUserRoleMutation.mutate(
			{ userId: user?.id ?? 0, newRole: data.role },
			{
				onSuccess: () => {
					onClose();
					form.reset();
				},
			},
		);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Change Role:</FormLabel>
							<Select onValueChange={field.onChange} value={field.value} disabled={user?.role === 'ADMIN'}>
								<FormControl>
									<SelectTrigger className='cursor-pointer'>
										<SelectValue placeholder='Select role' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='dark bg-primary-foreground'>
									<SelectItem value='USER'>User</SelectItem>
									<SelectItem value='MODERATOR'>Moderator</SelectItem>
									<SelectItem value='ADMIN'>Admin</SelectItem>
								</SelectContent>
								<FormDescription>Select the new role for the user</FormDescription>
							</Select>
						</FormItem>
					)}
				/>
				<Button type='submit' className='mt-4'>
					Change Role
				</Button>
			</form>
		</Form>
	);
};

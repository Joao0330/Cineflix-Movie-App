import { updateUsernameSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useProfileUser } from '@/hooks/useProfileUser';

export const ChangeUsernameForm = ({ user }: { user: User | null }) => {
	const { updateUsernameMutation } = useProfileUser();

	const form = useForm<z.infer<typeof updateUsernameSchema>>({
		resolver: zodResolver(updateUsernameSchema),
		defaultValues: {
			username: user?.username || '',
		},
	});

	const onChangeUsername = async (data: z.infer<typeof updateUsernameSchema>) => {
		try {
			updateUsernameMutation.mutate(data.username);
		} catch (error) {
			console.error('Failed to update username:', error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onChangeUsername)}>
				<div>
					<FormLabel className='mb-4'>Change Username</FormLabel>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input {...field} name='username' placeholder='Update your username' />
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<Button type='submit' className='mt-5 cursor-pointer'>
					Change Username
				</Button>
			</form>
		</Form>
	);
};

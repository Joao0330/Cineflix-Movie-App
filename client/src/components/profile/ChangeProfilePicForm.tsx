import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { uploadProfilePicSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileUser } from '@/hooks/useProfileUser';

export const ChangeProfilePicForm = () => {
	const { uploadProfilePictureMutation } = useProfileUser();

	const form = useForm<z.infer<typeof uploadProfilePicSchema>>({
		resolver: zodResolver(uploadProfilePicSchema),
		defaultValues: {
			profile_picture: undefined,
		},
	});

	const onChangeProfilePic = async (data: z.infer<typeof uploadProfilePicSchema>) => {
		uploadProfilePictureMutation.mutate(data.profile_picture);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onChangeProfilePic)}>
				<FormField
					control={form.control}
					name='profile_picture'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Change profile picture</FormLabel>
							<FormControl className='cursor-pointer'>
								<Input type='file' accept='image/*' name={field.name} ref={field.ref} onChange={e => field.onChange(e.target.files?.[0])} onBlur={field.onBlur} />
							</FormControl>
							<FormMessage className='text-red-500' />
						</FormItem>
					)}
				/>

				<Button type='submit' className='cursor-pointer' disabled={uploadProfilePictureMutation.isPending}>
					{uploadProfilePictureMutation.isPending ? 'Uploading...' : 'Save changes'}
				</Button>
			</form>
		</Form>
	);
};

import { useAuth } from '@/context/AuthContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfiles = () => {
	const { updateUsername, uploadProfilePicture, getAllUsers } = useAuth();

	const useProfileGetUsersQuery = () =>
		useQuery<User[]>({
			queryKey: ['profileUsers'],
			queryFn: getAllUsers,
			refetchOnWindowFocus: false,
			retry: false,
		});

	const updateUsernameMutation = useMutation({
		mutationFn: (username: string) => updateUsername(username),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileUser'] });
		},
	});

	const uploadProfilePictureMutation = useMutation({
		mutationFn: (file: File) => uploadProfilePicture(file),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileUser'] });
		},
	});

	return {
		useProfileGetUsersQuery,
		updateUsernameMutation,
		uploadProfilePictureMutation,
	};
};

import { useAuth } from '@/context/AuthContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfiles = () => {
	const { updateUsername, uploadProfilePicture, getAllUsers, changeUserRole } = useAuth();

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

	const changeUserRoleMutation = useMutation({
		mutationFn: ({ userId, newRole }: { userId: number; newRole: 'USER' | 'MODERATOR' | 'ADMIN' }) => changeUserRole(userId, newRole),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileUsers'] });
		},
	});

	return {
		useProfileGetUsersQuery,
		updateUsernameMutation,
		uploadProfilePictureMutation,
		changeUserRoleMutation,
	};
};

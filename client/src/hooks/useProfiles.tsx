import { useAuth } from '@/context/AuthContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfiles = () => {
	const { updateUsername, uploadProfilePicture, getAllUsers, changeUserRole, banUser, searchUser } = useAuth();

	const useProfileGetUsersQuery = () =>
		useQuery<User[]>({
			queryKey: ['profileUsers'],
			queryFn: getAllUsers,
			refetchOnWindowFocus: false,
			retry: false,
		});

	const useSearchUserQuery = (userId: number, options?: object) =>
		useQuery<User | null>({
			queryKey: ['profileUser', userId],
			queryFn: () => searchUser(Number(userId)),
			refetchOnWindowFocus: false,
			retry: false,
			...options,
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

	const banUserMutation = useMutation({
		mutationFn: ({ userId, is_banned }: { userId: number; is_banned: boolean }) => banUser(userId, is_banned),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profileUsers'] });
		},
	});

	return {
		useProfileGetUsersQuery,
		useSearchUserQuery,
		updateUsernameMutation,
		uploadProfilePictureMutation,
		changeUserRoleMutation,
		banUserMutation,
	};
};

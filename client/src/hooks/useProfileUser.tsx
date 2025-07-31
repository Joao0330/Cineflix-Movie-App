import { useAuth } from '@/context/AuthContext';
import { queryClient } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useProfileUser = () => {
	const { checkAuth, updateUsername, uploadProfilePicture } = useAuth();

	const useProfileUserQuery = () => {
		useQuery({
			queryKey: ['profileUser'],
			queryFn: checkAuth,
			refetchOnWindowFocus: false,
			retry: false,
		});
	};

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
		useProfileUserQuery,
		updateUsernameMutation,
		uploadProfilePictureMutation,
	};
};

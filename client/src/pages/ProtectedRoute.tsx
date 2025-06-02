import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
	const { user, isLoading, checkAuth } = useAuth();

	// Double check if user is null and not loading, then call checkAuth
	useEffect(() => {
		if (user === null && !isLoading) {
			checkAuth();
		}
	}, [user, isLoading, checkAuth]);

	return user ? <Outlet /> : <Navigate to='/login' replace />;
};

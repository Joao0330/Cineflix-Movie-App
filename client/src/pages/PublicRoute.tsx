import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';

export const PublicRoute = () => {
	const { user } = useAuth();

	return user ? <Navigate to='/home' replace /> : <Outlet />;
};

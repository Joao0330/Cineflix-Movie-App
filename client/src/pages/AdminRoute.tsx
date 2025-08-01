import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';

export const AdminRoute = () => {
	const { user } = useAuth();

	return user && user.role === 'ADMIN' ? <Outlet /> : <Navigate to='/home' replace />;
};

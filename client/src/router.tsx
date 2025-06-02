import { createBrowserRouter } from 'react-router';
import { AppLayout } from './pages/_layout/AppLayout';
import { AuthLayout } from './pages/_layout/AuthLayout';
import { Home } from './pages/Home';
import { Welcome } from './pages/Welcome';
import { Auth } from './pages/Auth';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { PublicRoute } from './pages/PublicRoute';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <PublicRoute />,
		children: [
			{
				path: '/',
				element: <AuthLayout />,
				children: [
					{ path: '/', element: <Welcome /> },
					{ path: '/login', element: <Auth type='login' /> },
					{ path: '/register', element: <Auth type='register' /> },
				],
			},
		],
	},
	{
		path: '/home',
		element: <ProtectedRoute />,
		children: [
			{
				path: '/home',
				element: <AppLayout />,
				children: [{ path: '', element: <Home /> }],
			},
		],
	},
]);

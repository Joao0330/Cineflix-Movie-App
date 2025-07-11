import { createBrowserRouter } from 'react-router';
import { AppLayout } from './pages/_layout/AppLayout';
import { AuthLayout } from './pages/_layout/AuthLayout';
import { Home } from './pages/Home';
import { Welcome } from './pages/Welcome';
import { Auth } from './pages/Auth';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { PublicRoute } from './pages/PublicRoute';
import { MovieInfo } from './pages/MovieInfo';
import { Browse } from './pages/Browse';
import { Favorites } from './pages/Favorites';

export const router = createBrowserRouter([
	{
		element: <PublicRoute />,
		children: [
			{
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
		element: <ProtectedRoute />,
		children: [
			{
				element: <AppLayout />,
				children: [
					{ path: '/home', element: <Home /> }, // or path: ''
					{ path: '/movies/:movieId', element: <MovieInfo /> }, // Placeholder for MovieInfo component
					{ path: '/browse', element: <Browse /> },
					{ path: '/browse/:genreId', element: <Browse /> },
					{ path: '/favorites', element: <Favorites /> },
				],
			},
		],
	},
]);

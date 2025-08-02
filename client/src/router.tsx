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
import { Lists } from './pages/Lists';
import { Profile } from './pages/Profile';
import { AdminRoute } from './pages/AdminRoute';
import { AdminPanel } from './pages/AdminPanel';
import { Faq } from './pages/Faq';
import { NotFoundPage } from './pages/NotFoundPage';

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
					{ path: '/home', element: <Home /> },
					{ path: '/movies/:movieId', element: <MovieInfo /> },
					{ path: '/browse', element: <Browse /> },
					{ path: '/browse/:genreId', element: <Browse /> },
					{ path: '/favorites', element: <Favorites /> },
					{ path: '/lists', element: <Lists /> },
					{ path: '/profile', element: <Profile type='ownProfile' /> },
					{ path: '/user/:userId', element: <Profile type='publicProfile' /> },
					{ path: '/faq', element: <Faq /> },
				],
			},
		],
	},
	{
		element: <AdminRoute />,
		children: [
			{
				element: <AppLayout />,
				children: [{ path: '/admin', element: <AdminPanel /> }],
			},
		],
	},
	{ path: '*', element: <NotFoundPage /> },
]);

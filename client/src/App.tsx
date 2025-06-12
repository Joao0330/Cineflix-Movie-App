import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useFetchGoogleClientId } from './hooks/useFetchGoogleClientId';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader } from './components/Loader';

function App() {
	const { clientId, isLoading, error } = useFetchGoogleClientId();
	const queryClient = new QueryClient();

	if (isLoading) return <Loader />;

	if (error || !clientId) return <div>Error: {error || 'Google authentication unavailable'}</div>;

	return (
		<QueryClientProvider client={queryClient}>
			<GoogleOAuthProvider clientId={clientId}>
				<AuthProvider>
					<RouterProvider router={router} />
					<Toaster />
				</AuthProvider>
			</GoogleOAuthProvider>
		</QueryClientProvider>
	);
}

export default App;

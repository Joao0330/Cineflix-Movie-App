import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useFetchGoogleClientId } from './hooks/useFetchGoogleClientId';
import { QueryClientProvider } from '@tanstack/react-query';
import { Loader } from './components/Loader';
import { ActionsProvider } from './context/ActionsContext';
import { queryClient } from './lib/utils';

function App() {
	const { clientId, isLoading, error } = useFetchGoogleClientId();

	if (isLoading) return <Loader />;

	if (error || !clientId) return <div>Error: {error || 'Google authentication unavailable'}</div>;

	return (
		<QueryClientProvider client={queryClient}>
			<GoogleOAuthProvider clientId={clientId}>
				<AuthProvider>
					<ActionsProvider>
						<RouterProvider router={router} />
						<Toaster />
					</ActionsProvider>
				</AuthProvider>
			</GoogleOAuthProvider>
		</QueryClientProvider>
	);
}

export default App;

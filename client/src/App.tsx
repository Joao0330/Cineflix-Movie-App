import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useFetchGoogleClientId } from './hooks/useFetchGoogleClientId';

function App() {
	const { clientId, isLoading, error } = useFetchGoogleClientId();

	if (isLoading) return <div>Loading...</div>;

	if (error || !clientId) return <div>Error: {error || 'Google authentication unavailable'}</div>;

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<AuthProvider>
				<RouterProvider router={router} />
				<Toaster />
			</AuthProvider>
		</GoogleOAuthProvider>
	);
}

export default App;

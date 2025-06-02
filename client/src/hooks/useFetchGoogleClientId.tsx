import { api } from '@/lib/axios';
import { useState, useEffect } from 'react';

interface GoogleClientIdState {
	clientId: string | null;
	isLoading: boolean;
	error: string | null;
}

export function useFetchGoogleClientId() {
	const [state, setState] = useState<GoogleClientIdState>({
		clientId: null,
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		const fetchGoogleClientId = async () => {
			try {
				const response = await api.get('/auth/google/config');
				setState({
					clientId: response.data.googleClientId,
					isLoading: false,
					error: null,
				});
			} catch (error) {
				console.error('Failed to fetch Google client ID:', error);
				setState({
					clientId: null,
					isLoading: false,
					error: 'Failed to fetch Google client ID',
				});
			}
		};

		fetchGoogleClientId();
	}, []);

	return state;
}

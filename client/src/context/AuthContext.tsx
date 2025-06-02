/* eslint-disable react-refresh/only-export-components */
import { googleLogout } from '@react-oauth/google';
import { api } from '@/lib/axios';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AuthContextData {
	isLoading: boolean;
	user: User | null;
	setUser: (user: User | null) => void;
	login: (email: string, password: string) => Promise<boolean>;
	loginWithGoogle: (accessToken: string) => void;
	register: (username: string, email: string, password: string, confirmPassword: string) => Promise<boolean>;
	logout: () => Promise<{ success: boolean }>;
	accessToken: string | null;
	checkAuth: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const login = async (email: string, password: string) => {
		try {
			const { data } = await api.post('/login', { email, password }, { withCredentials: true });

			if (data) {
				setAccessToken(data.accessToken);

				const userResponse = await api.get('/profile', { withCredentials: true });
				setUser(userResponse.data);
				toast.success('Login successful!');
				return true;
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error);
		}
		return false;
	};

	const loginWithGoogle = (accessToken: string) => {
		setAccessToken(accessToken);
		toast.success('Login successful!');
	};

	const register = async (username: string, email: string, password: string, confirmPassword: string) => {
		try {
			const { data } = await api.post('/register', { username, email, password, confirmPassword }, { withCredentials: true });

			if (data) {
				toast.success('Registration successful! Please log in.');
				return true;
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error);
		}
		return false;
	};

	const logout = async () => {
		try {
			await api.post('/logout', {}, { withCredentials: true });
			setUser(null);
			setAccessToken(null);
			googleLogout();

			return { success: true };
		} catch (error) {
			console.error('Logout failed:', error);
			return { success: false };
		}
	};

	const checkAuth = async () => {
		try {
			const response = await api.get('/profile', { withCredentials: true });
			if (response.data) {
				setUser(response.data);
			}
		} catch (err) {
			console.error('Auth check failed:', err);
			setUser(null);
			setAccessToken(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, login, register, logout, accessToken, checkAuth, isLoading, loginWithGoogle }}>{isLoading ? <div>Loading...</div> : children}</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

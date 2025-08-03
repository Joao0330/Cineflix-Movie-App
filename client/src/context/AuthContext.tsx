/* eslint-disable react-refresh/only-export-components */
import { googleLogout } from '@react-oauth/google';
import { api } from '@/lib/axios';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { Loader } from '@/components/Loader';
import { normalizeImage } from '@/lib/normalizeImage';

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
	updateUsername: (username: string) => Promise<void>;
	uploadProfilePicture: (file: File) => Promise<void>;
	getAllUsers: () => Promise<User[]>;
	changeUserRole: (userId: number, newRole: 'USER' | 'MODERATOR' | 'ADMIN') => Promise<void>;
	banUser: (userId: number, is_banned: boolean) => Promise<void>;
	searchUser: (userId: number) => Promise<User | null>;
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
			const response = await api.post('/login', { email, password }, { withCredentials: true });
			const { data } = response;
			if (response.status === 200 && data.success) {
				await checkAuth();
				toast.success('Login successful!');
				return true;
			}
			toast.error(data.error || 'Login failed');
			return false;
		} catch (err) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error || 'Login failed');
			return false;
		}
	};

	const loginWithGoogle = async (token: string) => {
		try {
			const response = await api.post('/auth/google', { token }, { withCredentials: true });
			const { data } = response;
			if (response.status === 200 && data.success) {
				await checkAuth();
				toast.success('Google login successful!');
			}
		} catch (err) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error || 'Google login failed');
		}
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
			toast.error('Logout failed');
			return { success: false };
		}
	};

	const updateUsername = async (username: string) => {
		try {
			const { data } = await api.put('/update-username', { username }, { withCredentials: true });
			if (data) {
				await checkAuth();
				toast.success('Username updated successfully!');
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error);
		}
	};

	const uploadProfilePicture = async (file: File) => {
		try {
			// Validate file type and size
			const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/heif'];
			const maxFileSize = 5 * 1024 * 1024; // 5MB

			if (!allowedTypes.includes(file.type)) {
				throw new Error('Invalid file type. Only JPEG, PNG, GIF, or HEIC allowed.');
			}

			if (file.size > maxFileSize) {
				throw new Error('File size exceeds 5MB limit.');
			}

			// Normalize image
			const normalizedFile = await normalizeImage(file);
			console.log('Normalized file:', { name: normalizedFile.name, size: normalizedFile.size, type: normalizedFile.type });

			const formData = new FormData();
			formData.append('profile_picture', normalizedFile);

			const { data } = await api.post('/profile/picture', formData, {
				withCredentials: true,
			});

			console.log('Upload response:', data);

			if (data) {
				await checkAuth();
				toast.success('Profile picture updated!');
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Upload error:', error);
			toast.error(error.message || error.response?.data?.error || 'Failed to upload profile picture');
		}
	};

	const getAllUsers = async () => {
		try {
			const { data } = await api.get('/users', { withCredentials: true });
			return data;
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error('Error fetching users:', error);
			toast.error(error.response?.data?.error);
			throw error;
		}
	};

	const changeUserRole = async (userId: number, newRole: 'USER' | 'MODERATOR' | 'ADMIN') => {
		try {
			const { data } = await api.put(`/users/${userId}/role`, { newRole }, { withCredentials: true });
			if (data) {
				await checkAuth();
				toast.success('User role updated successfully!');
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error);
			throw error;
		}
	};

	const banUser = async (userId: number, is_banned: boolean) => {
		try {
			const { data } = await api.patch(`/users/${userId}/ban`, { is_banned }, { withCredentials: true });
			if (data) {
				await checkAuth();
				toast.success(`User has been ${is_banned ? 'banned' : 'unbanned'} successfully!`);
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error);
			throw error;
		}
	};

	const searchUser = async (userId: number) => {
		try {
			const { data } = await api.get(`/users/${userId}`, { withCredentials: true });
			if (data) {
				return data;
			}
		} catch (err: unknown) {
			const error = err as axiosErrorResponse;
			console.error(error);
			toast.error(error.response?.data?.error);
			throw error;
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
		<AuthContext.Provider
			value={{ user, setUser, login, register, logout, accessToken, checkAuth, isLoading, loginWithGoogle, updateUsername, uploadProfilePicture, getAllUsers, changeUserRole, banUser, searchUser }}
		>
			{isLoading ? <Loader /> : children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

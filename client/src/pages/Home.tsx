import { useAuth } from '@/context/AuthContext';

export const Home = () => {
	const { user, logout } = useAuth();

	return (
		<div className='min-h-screen bg-gray-500'>
			<h1>CineFlix</h1>
			<p>welcome {user?.username}</p>

			<button
				onClick={async () => {
					await logout();
				}}
			>
				logout
			</button>
		</div>
	);
};

import Footer from '@/components/Footer';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

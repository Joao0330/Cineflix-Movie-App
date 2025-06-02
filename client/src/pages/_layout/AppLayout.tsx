import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { Outlet } from 'react-router';

export const AppLayout = () => {
	return (
		<>
			<Header />

			<main>
				<Outlet />
			</main>

			<Footer />
		</>
	);
};

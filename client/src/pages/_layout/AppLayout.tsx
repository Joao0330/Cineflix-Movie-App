import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

export const AppLayout = () => {
	return (
		<>
			<Header />
			<main>
				<SidebarProvider className='dark'>
					<AppSidebar />
					<div className='flex flex-col w-full'>
						<Outlet />
					</div>
				</SidebarProvider>
			</main>
			<Footer />
		</>
	);
};

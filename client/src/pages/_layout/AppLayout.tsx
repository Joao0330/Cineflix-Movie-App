import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

export const AppLayout = () => {
	return (
		<>
			<SidebarProvider>
				<Header />
				<main className='dark flex'>
					<AppSidebar />
					<div className='flex flex-col w-full'>
						<Outlet />
					</div>
				</main>
				<Footer />
			</SidebarProvider>
		</>
	);
};

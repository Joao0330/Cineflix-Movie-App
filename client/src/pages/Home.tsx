import { useAuth } from '@/context/AuthContext';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export const Home = () => {
	const { user } = useAuth();

	return (
		<section className='relative min-h-screen bg-[url(/assets/skyrim.jpg)] bg-cover homeOverlay'>
			<div className='relative z-5 container-md pt-25 text-white'>
				<h1>CineFlix</h1>
				<p>welcome {user?.username}</p>
			</div>

			<SidebarProvider className='dark'>
				<AppSidebar />
			</SidebarProvider>
		</section>
	);
};

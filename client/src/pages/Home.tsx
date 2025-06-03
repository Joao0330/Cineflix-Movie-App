import { useAuth } from '@/context/AuthContext';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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

			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
						<div className='flex items-center gap-2 px-4'>
							<SidebarTrigger className='-ml-1' />
						</div>
					</header>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
};

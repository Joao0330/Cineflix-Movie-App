import { NavMain } from '@/components/sidebar/NavMain';
import { NavUser } from '@/components/sidebar/NavUser';
import { NavTitle } from '@/components/sidebar/NavTitle';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuth();

	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<NavTitle />
			</SidebarHeader>
			<SidebarContent>
				<NavMain />
			</SidebarContent>
			<SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

import { HomeIcon } from 'lucide-react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function NavMain() {
	return (
		<SidebarMenu>
			<SidebarGroup>
				<SidebarMenuItem>
					<SidebarMenuButton tooltip='Home'>
						<HomeIcon className='size-4' />
						<span>Home</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarGroup>
		</SidebarMenu>
	);
}

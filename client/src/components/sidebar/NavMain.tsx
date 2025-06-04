import { HomeIcon } from 'lucide-react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

export function NavMain() {
	return (
		<SidebarMenu className='mt-8'>
			<SidebarGroup>
				<SidebarMenuItem>
					<SidebarMenuButton tooltip='Home' className='cursor-pointer'>
						<HomeIcon className='size-4' />
						<span>Home</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarGroup>
		</SidebarMenu>
	);
}

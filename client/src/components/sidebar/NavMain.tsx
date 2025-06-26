import { HomeIcon } from 'lucide-react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';
import { SearchDialog } from '../search/SearchDialog';

export function NavMain() {
	const navigate = useNavigate();

	return (
		<SidebarMenu className='mt-10'>
			<SidebarGroup>
				<SidebarMenuItem>
					<SidebarMenuButton
						tooltip='Home'
						className='cursor-pointer'
						onClick={() => {
							navigate('/home');
							scrollTo(0, 0);
						}}
					>
						<HomeIcon className='size-4' />
						<span>Home</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SearchDialog />
				</SidebarMenuItem>
			</SidebarGroup>
		</SidebarMenu>
	);
}

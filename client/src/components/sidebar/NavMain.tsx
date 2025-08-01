import { Heart, HomeIcon, List } from 'lucide-react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';
import { SearchDialog } from '../search/SearchDialog';

export function NavMain() {
	const navigate = useNavigate();
	const { setOpenMobile } = useSidebar();

	return (
		<SidebarMenu className='mt-10'>
			<SidebarGroup className=''>
				<SidebarMenuItem>
					<SidebarMenuButton
						tooltip='Home'
						className='cursor-pointer'
						onClick={() => {
							setOpenMobile(false);
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

			<SidebarGroup className=' mt-5'>
				<SidebarMenuItem>
					<SidebarMenuButton
						tooltip='Favorites'
						className='cursor-pointer'
						onClick={() => {
							setOpenMobile(false);
							navigate('/favorites');
							scrollTo(0, 0);
						}}
					>
						<Heart className='size-4' />
						<span>Favorites</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton
						tooltip='Lists'
						className='cursor-pointer'
						onClick={() => {
							setOpenMobile(false);
							navigate('/lists');
							scrollTo(0, 0);
						}}
					>
						<List className='size-4' />
						<span>Lists</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarGroup>
		</SidebarMenu>
	);
}

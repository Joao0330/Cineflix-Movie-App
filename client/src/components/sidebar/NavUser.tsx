import { ChevronsUpDown, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router';

export function NavUser({ user }: { user: User }) {
	const { isMobile, setOpenMobile } = useSidebar();
	const { logout } = useAuth();
	const navigate = useNavigate();

	return (
		<SidebarMenu>
			<SidebarMenuItem className='mb-5 self-end'>
				<SidebarMenuButton className='flex items-center justify-center w-10' tooltip='Toggle menu'>
					<SidebarTrigger className='cursor-pointer' />
				</SidebarMenuButton>
			</SidebarMenuItem>

			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarImage src={user.profile_picture_url} alt={user.username} className='object-cover' />
								<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>{user.username}</span>
								<span className='truncate text-xs'>{user.email}</span>
							</div>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg dark' side={isMobile ? 'bottom' : 'right'} align='end' sideOffset={4}>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarImage src={user.profile_picture_url} alt={user.username} className='object-cover' />
									<AvatarFallback className='rounded-lg'>CN</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>{user.username}</span>
									<span className='truncate text-xs'>{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className='cursor-pointer'
							onClick={() => {
								setOpenMobile(false);
								navigate('/profile');
							}}
						>
							<User />
							Profile
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={async () => {
								await logout();
							}}
							className='cursor-pointer'
						>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

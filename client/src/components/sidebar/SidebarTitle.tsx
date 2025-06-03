import { GalleryVerticalEnd } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

export function SidebarTitle() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className='flex gap-2'>
					<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
						<GalleryVerticalEnd className='size-4 shrink-0' />
					</div>
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium font-bebas-neue text-4xl'>CineFlix</span>
					</div>
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

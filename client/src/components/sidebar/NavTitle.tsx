import { GalleryVerticalEnd } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

export function NavTitle() {
	return (
		<SidebarMenu className='mt-3'>
			<SidebarMenuItem>
				<div className='flex items-center gap-3'>
					<div className=' bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-lg'>
						<GalleryVerticalEnd className='size-4 shrink-0' />
					</div>
					<div className='grid pt-[4.5px]'>
						<span className='truncate font-medium font-bebas-neue text-4xl'>CineFlix</span>
					</div>
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

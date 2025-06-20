import { MenuIcon } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';

export const MobileToggleButton = () => {
	const { setOpenMobile } = useSidebar();

	return (
		<button
			onClick={() => {
				setOpenMobile(true);
			}}
			aria-label='Toggle Sidebar'
			className='MobileSidebarToggle'
		>
			<MenuIcon className='h-4 w-4' />
		</button>
	);
};

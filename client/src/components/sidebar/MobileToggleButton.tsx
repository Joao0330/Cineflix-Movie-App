import { MenuIcon } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';

export const MobileToggleButton = () => {
	const { openMobile, setOpenMobile } = useSidebar();
	console.log('openMobile state:', openMobile);
	return (
		<button
			onClick={() => {
				console.log('Opening sidebar');
				setOpenMobile(true);
			}}
			aria-label='Toggle Sidebar'
			className='md:hidden mb-5 p-3 border rounded-full cursor-pointer bg-transparent text-white hover:bg-gray-transparent transition-colors duration-200'
		>
			<MenuIcon className='h-4 w-4' />
		</button>
	);
};

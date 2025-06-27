import { useState } from 'react';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Search } from 'lucide-react';
import { SidebarMenuButton } from '../ui/sidebar';
import { SearchSugestions } from './SearchSugestions';

export const SearchDialog = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
			<DialogTrigger asChild>
				<SidebarMenuButton tooltip='Search' className='cursor-pointer'>
					<Search className='size-4' />
					<span>Search</span>
				</SidebarMenuButton>
			</DialogTrigger>
			<DialogContent className='dark'>
				<DialogHeader>
					<DialogTitle>Search Movies:</DialogTitle>
				</DialogHeader>
				<SearchSugestions setIsSearchOpen={() => setIsSearchOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

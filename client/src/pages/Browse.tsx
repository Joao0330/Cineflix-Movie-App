import { SearchBrowse } from '@/components/search/SearchBrowse';
import { Separator } from '@/components/ui/separator';

export const Browse = () => {
	return (
		<div className='px-[3rem] md:pl-[3rem] md:pr-[5rem] min-h-screen bg-gray-900 text-white py-25'>
			<div className='container-sm'>
				<h1 className='text-4xl mb-7'>Browse on Cineflix</h1>
				<p>Explore our deep colection of shows bellow</p>

				<SearchBrowse />
			</div>
			<Separator className='my-10' />
		</div>
	);
};

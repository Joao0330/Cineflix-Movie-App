import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const Browse = () => {
	return (
		<div className='px-[3rem] min-h-screen bg-gray-900 text-white py-25'>
			<div className='container-sm '>
				<h1 className='text-4xl mb-7'>Browse on Cineflix</h1>
				<p>Explore our deep colection of shows bellow</p>

				<form>
					<div className='flex items-center gap-4 mt-5'>
						<Input type='text' placeholder='Search for a movie or show...' className='w-full p-3 rounded-md bg-gray-800 text-white' />
						<button type='submit' className='px-4 py-2 bg-blue-light rounded-md hover:bg-blue-600 transition-colors duration-300 cursor-pointer'>
							Search
						</button>
					</div>

					<p className='mt-4 text-sm text-gray-400'>You can search by title, genre, or actor.</p>
				</form>
			</div>
			<Separator className='my-10' />
			{/*TODO: Make the search filters, see the latest grok chat for info */}
			{/* TODO: Change the grok prompt to include react hook form */}
		</div>
	);
};

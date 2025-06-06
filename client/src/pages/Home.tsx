import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import HomeMovieInfo from '@/components/home/HomeMovieInfo';
import { HomePopularMovies } from '@/components/home/HomePopularMovies';

export const Home = () => {
	return (
		<section className='home bg-[url(/assets/skyrim.jpg)]'>
			<HomeMovieInfo />
			<HomePopularMovies />

			<SidebarProvider className='dark'>
				<AppSidebar />
			</SidebarProvider>
		</section>
	);
};

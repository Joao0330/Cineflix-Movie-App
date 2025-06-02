import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router';

export const Welcome = () => {
	const { user } = useAuth();

	return (
		<>
			<section className='welcome overlay'>
				<div className='welcome__content'>
					<div>
						<h1>CineFlix</h1>
						<p>Welcome to CineFlix! Create an account below and start browsing through your favorite movies and series!</p>
						<Button className='px-10 py-6 bg-blue-700 hover:bg-blue-800 cursor-pointer' asChild>
							<Link to={user ? '/home' : '/login'}>Get Started</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

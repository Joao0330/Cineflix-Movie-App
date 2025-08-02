import { Link } from 'react-router';

export const NotFoundPage = () => {
	return (
		<div className='notFoundPage'>
			<div>
				<h1>404 - Page not found</h1>
				<p>The page you were looking for does not exist. Check for typos in the URL or return to the home page.</p>
				<Link to='/home'>Go Back</Link>
			</div>
		</div>
	);
};

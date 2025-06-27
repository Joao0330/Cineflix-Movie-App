import { Link } from 'react-router';

export const Header = () => {
	return (
		<header>
			<div className='container-md relative'>
				<div className='header'>
					<nav>
						<ul>
							<li>
								<Link to='/home'>Home</Link>
							</li>
							<li>
								<Link to='/browse'>Browse</Link>
							</li>
							<li>
								<a href='/register'>FAQ</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

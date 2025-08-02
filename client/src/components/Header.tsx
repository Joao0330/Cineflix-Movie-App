import { Link } from 'react-router';
import { MobileToggleButton } from './sidebar/MobileToggleButton';

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
								<Link to='/faq'>FAQ</Link>
							</li>
						</ul>
					</nav>
					<MobileToggleButton />
				</div>
			</div>
		</header>
	);
};

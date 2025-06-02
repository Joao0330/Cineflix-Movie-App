import { AuthForm } from '@/components/AuthForm';
import { Link } from 'react-router';

export const Auth = ({ type }: AuthProps) => {
	return (
		<>
			<section className='loginTop'>
				<div className='loginTop__content'>
					{type === 'login' ? (
						<div>
							<h2>Welcome Back</h2>
							<p>Please sign in to your account</p>
						</div>
					) : (
						<div>
							<h2>Create an Account</h2>
							<p>Please sign up to create an account</p>
						</div>
					)}

					<AuthForm type={type} />
				</div>
			</section>
			<section className='loginBottom'>
				{type === 'login' ? (
					<p>
						Don't have an account? <Link to='/register'>Sign Up</Link>
					</p>
				) : (
					<p>
						Already have an account? <Link to='/login'>Sign In</Link>
					</p>
				)}
			</section>
		</>
	);
};

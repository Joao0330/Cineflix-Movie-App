import { loginSchema, registerSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { formFieldData } from '@/data/formFieldData';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';
import { api } from '@/lib/axios';

export const AuthForm = ({ type }: AuthProps) => {
	const { login, register, loginWithGoogle, setUser } = useAuth();
	const navigate = useNavigate();

	window.scrollTo(0, 0);

	const schema = type === 'login' ? loginSchema : registerSchema;
	const form = useForm<LoginFormData | RegisterFormData>({
		resolver: zodResolver(schema),
		defaultValues: type === 'login' ? { email: '', password: '' } : { email: '', password: '', username: '', confirmPassword: '' },
	});

	const onSubmit = async (values: LoginFormData | RegisterFormData) => {
		if (type === 'login') {
			try {
				await login(values.email, values.password);
			} catch (error) {
				console.error('Login failed', error);
			}
		} else {
			try {
				if (await register(values.username, values.email, values.password, values.confirmPassword)) {
					navigate('/login');
				}
			} catch (error) {
				console.error('Registration failed', error);
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='loginTop__form'>
				{formFieldData[type].map(item => (
					<FormField
						key={item.name}
						control={form.control}
						name={item.name}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input {...item} {...field} className='bg-gray-normal border-2 border-gray-dark py-6 px-5' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}

				<div className='loginTop__buttons'>
					<Button className='w-full cursor-pointer p-7 rounded-2xl' type='submit'>
						{type === 'login' ? 'Sign in' : 'Sign up'}
					</Button>
					{type === 'login' && (
						<GoogleLogin
							text='signin_with'
							shape='pill'
							theme='filled_blue'
							onSuccess={async credentialResponse => {
								try {
									const res = await api.post('/auth/google', { token: credentialResponse.credential }, { withCredentials: true });
									loginWithGoogle(res.data.accessToken);
									const userResponse = await api.get('/profile', { withCredentials: true });
									setUser(userResponse.data);
								} catch (error) {
									console.error('Google login failed', error);
								}
							}}
							onError={() => {
								console.error('Google login failed');
							}}
						/>
					)}
				</div>
			</form>
		</Form>
	);
};

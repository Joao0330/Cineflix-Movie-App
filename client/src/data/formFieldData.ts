export const formFieldData: {
	login: FormFieldData<LoginFormData>[];
	register: FormFieldData<RegisterFormData>[];
} = {
	login: [
		{ name: 'email', placeholder: 'Enter your email', type: 'email' },
		{ name: 'password', placeholder: 'Enter your password', type: 'password' },
	],
	register: [
		{ name: 'username', placeholder: 'Enter your username', type: 'text' },
		{ name: 'email', placeholder: 'Enter your email', type: 'email' },
		{ name: 'password', placeholder: 'Enter your password', type: 'password' },
		{
			name: 'confirmPassword',
			placeholder: 'Confirm password',
			type: 'password',
		},
	],
};

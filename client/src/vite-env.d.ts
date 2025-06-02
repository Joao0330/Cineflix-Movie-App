/// <reference types="vite/client" />
type AuthProps = {
	type: 'login' | 'register';
};

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

// Form Field Data Type
type FormFieldData<T extends LoginFormData | RegisterFormData> = {
	name: Extract<keyof T, string>;
	placeholder: string;
	type: 'text' | 'email' | 'password';
};

// User type
type User = {
	id: number;
	email: string;
	username: string;
	role: 'USER' | 'MODERATOR' | 'ADMIN';
};

type axiosErrorResponse = {
	response?: {
		data?: {
			error?: string;
		};
	};
};

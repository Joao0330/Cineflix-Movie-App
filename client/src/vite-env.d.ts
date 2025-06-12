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

//? Movies types

type Movie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

//? Movie response
type MovieResponse = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
};

//? Movie genres types
type MovieGenre = {
	id: number;
	name: string;
};

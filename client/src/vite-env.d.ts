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
	genres?: MovieGenre[]; // Optional for movie details
	status: string;
	runtime: number;
	credits?: {
		cast: MovieCast[];
		crew: MovieCrew[];
	};
	production_companies: MovieCompany[];
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
	videos: {
		results: {
			id: string;
			key: string;
			name: string;
			type: string;
		}[];
	};
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

type MovieCompany = {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
};

type MovieCast = {
	id: number;
	credit_id: string;
	name: string;
	profile_path: string | null;
	character: string;
	order: number;
};

type MovieCrew = {
	id: number;
	credit_id: string;
	name: string;
	profile_path: string | null;
	job: string;
};

//? Favorites types
type Favorite = {
	external_id: number;
	created_at: string;
};

type FavoriteMovies = {
	movie: Movie | null;
	created_at: string;
};

//? Lists types

type MovieInList = {
	id: number;
	external_id: number;
	movieListId: number | null;
	status: 'WATCHING' | 'COMPLETED' | 'ON_HOLD' | 'DROPPED' | 'PLANNING';
};

type MovieList = {
	id: number;
	userId: number;
	title: string;
	created_at: string;
	movies: MovieInList[];
};

type MovieWithList = {
	list: MovieList;
	movies: (Movie | null)[];
};

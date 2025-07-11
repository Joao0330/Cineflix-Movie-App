import { QueryClient } from '@tanstack/react-query';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const createGenreLookup = (genres: MovieGenre[]) => {
	return genres.reduce((lookup, genre) => {
		lookup[genre.id] = genre.name;
		return lookup;
	}, {} as Record<number, string>);
};

export const queryClient = new QueryClient();

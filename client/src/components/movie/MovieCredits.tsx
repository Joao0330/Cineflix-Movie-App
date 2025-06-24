import { Accordion } from '../ui/accordion';
import { CreditsSection } from './CreditsSection';

export const MovieCredits = ({ movie }: { movie: Movie }) => {
	return (
		<Accordion type='single' collapsible className='movieInfo__details__credits'>
			{(movie.credits?.cast?.length ?? 0) > 0 && <CreditsSection title='Movie cast' items={movie.credits?.cast ?? []} value='movie-cast' />}

			{(movie.credits?.crew?.length ?? 0) > 0 && <CreditsSection title='Movie crew' items={movie.credits?.crew ?? []} value='movie-crew' />}
		</Accordion>
	);
};

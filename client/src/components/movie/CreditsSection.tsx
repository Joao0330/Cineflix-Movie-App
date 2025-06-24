import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

type MovieProps = MovieCast | MovieCrew;

export const CreditsSection = ({ title, items, value }: { title: string; items: MovieProps[]; value: string }) => {
	return (
		<AccordionItem value={value} className='movieInfo__details__credits-content'>
			<AccordionTrigger className='cursor-pointer'>
				<h4>{title}:</h4>
			</AccordionTrigger>
			<AccordionContent className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-25'>
				{items.map(person => (
					<figure key={person.credit_id}>
						<img src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : 'https://placehold.co/130x200?text=Image not found'} alt={person.name} />
						<figcaption>
							<strong>{person.name}</strong>
							<span>{'character' in person ? person.character : 'job' in person ? person.job : ''}</span>
						</figcaption>
					</figure>
				))}
			</AccordionContent>
		</AccordionItem>
	);
};

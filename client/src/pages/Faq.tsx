import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems } from '@/data/faqItems';

export const Faq = () => {
	return (
		<section className='faq'>
			<div className='container-sm'>
				<h1>Frequently Asked Questions</h1>
				<p>Here are some common questions and answers about our service.</p>

				<div className='faq__content'>
					<Accordion type='single' collapsible className='w-full flex flex-col gap-5'>
						{faqItems.map(item => (
							<AccordionItem className='border-1 px-5 py-2 rounded-2xl overflow-hidden' value={item.value} key={item.value}>
								<AccordionTrigger className='cursor-pointer'>
									<h2>{item.question}</h2>
								</AccordionTrigger>
								<AccordionContent>
									<p>{item.answer}</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
};

const years = Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => (i + 1900).toString()).sort((a, b) => parseInt(b) - parseInt(a));

export const searchBrowseItemsData = [
	{
		name: 'genre',
		placeholder: 'Select a genre',
		description: 'Select a genre to filter',
	},
	{
		name: 'year',
		placeholder: 'Enter a year',
		options: years.map(year => ({ value: year, label: year })),
		description: 'Choose a year for your results.',
	},
	{
		name: 'sortBy',
		placeholder: 'Sort by',
		options: [
			{ value: 'title', label: 'Title' },
			{ value: 'year', label: 'Year' },
			{ value: 'rating', label: 'Rating' },
		],
		description: 'Choose how to sort your results.',
	},
	{
		name: 'order',
		placeholder: 'Order',
		options: [
			{ value: 'asc', label: 'Ascending' },
			{ value: 'desc', label: 'Descending' },
		],
		description: 'Select the order of the results.',
	},
];

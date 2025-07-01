export const searchBrowseItemsData = [
	{
		name: 'genres',
		placeholder: 'Select a genre',
		description: 'Select a genre to filter',
	},
	{
		name: 'year',
		placeholder: 'Enter a year',
		options: Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
			value: (new Date().getFullYear() - i).toString(),
			label: (new Date().getFullYear() - i).toString(),
		})),
		description: 'Choose a year for your results.',
	},
	{
		name: 'sortBy',
		placeholder: 'Sort by',
		options: [
			{ value: 'popularity', label: 'Popularity' },
			{ value: 'release_date', label: 'Release Date' },
			{ value: 'vote_average', label: 'TMDB Rating' },
			{ value: 'original_title', label: 'Title' },
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

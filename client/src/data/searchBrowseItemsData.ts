export const searchBrowseItemsData = [
	{
		name: 'genres',
		placeholder: 'Select a genre',
		description: 'Select a genre to filter',
	},
	{
		name: 'year',
		placeholder: 'Enter a year',
		description: 'Select a year (1900 - current year)',
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
